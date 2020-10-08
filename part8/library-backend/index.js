const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const pubsub = new PubSub()

const JWT_SECRET = 'THISISASERET'
const MONGODB_URL = 'mongodb+srv://admin:minheinkhant@cluster0.4jl6f.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to MongoDB...')
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.error('failed to connect ' + err.message))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
    `

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let filter = {}
      if (args.author) {
        // TODO: need to know parameter author of graphql schema
        filter = {...filter, author: args.author}
      }
      if (args.genre)
        filter = {...filter, genres: { $in: [args.genre] }}
      return Book.find(filter).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, { currentUser }) => currentUser
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      // Authorization
      if (!currentUser) throw new AuthenticationError('not authenticated')

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 })
        try {
          await author.save()
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      }
      const newBook = new Book({
        ...args,
        author: author._id
      })
      try {
        await newBook.save()
        await newBook.populate('author').execPopulate()
        author.bookCount = author.bookCount + 1
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      // Authorization
      if (!currentUser) throw new AuthenticationError('not authenticated')

      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({...args})
      try {
        await user.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret')
        throw new UserInputError('Wrong credentials')

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
