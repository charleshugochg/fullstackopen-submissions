Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {...blog},
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username,
      password
    }).then(res => {
      localStorage.setItem('loggedUser', JSON.stringify(res.body))
    })
})

describe('Bloglist', function () {
  const users = [
    {
      name: 'Cypress',
      username: 'cypress',
      password: 'test'
    },
    {
      name: 'Microsoft',
      username: 'microsoft',
      password: 'test'
    }
  ]

  const blogs = [
    {
      title: 'Cypress',
      author: 'anonymous',
      url: 'www.cypress.com',
      likes: 0
    },
    {
      title: 'Microsoft',
      author: 'anonymous',
      url: 'www.microsoft.com',
      likes: 3
    },
    {
      title: 'Apple',
      author: 'Steve job',
      url: 'www.apple.com',
      likes: 4
    },
    {
      title: 'Google',
      author: 'anonymous',
      url: 'www.google.com',
      likes: 2
    }
  ]

  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:3001/api/testing/database')
    cy.request('POST', 'http://localhost:3001/api/users', users[0])
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.get('form')
      .should('contain', 'login')
      .should('contain', 'username')
      .should('contain', 'password')
  })

  describe('login', function () {
    it('successed with correct credentials', function () {
      cy.get('input.username').type(users[0].username)
      cy.get('input.password').type(users[0].password)
      cy.contains('login').click()
      cy.contains(`${users[0].username} logged in`)
    })

    it('failed with wrong credentials', function () {
      cy.get('input.username').type(users[0].username)
      cy.get('input.password').type('wrong')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(users[0])
      cy.visit('http://localhost:3000')
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input.title').type(blogs[0].title)
      cy.get('input.author').type(blogs[0].author)
      cy.get('input.url').type(blogs[0].url)
      cy.contains('Submit').click()

      cy.get('.message')
        .should('contain', blogs[0].title)
        .should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.bloglist').should('contain', blogs[0].title)
    })

    describe('When created a blog', function () {
      beforeEach(function () {
        cy.createBlog(blogs[0])
        cy.visit('http://localhost:3000')
      })

      it('user can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('likes').should('contain', '1')
      })

      it('blog can be deleted by owner', function () {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.bloglist').should('not.contain', blogs[0].title)
      })

      it('blog can not be deleted by other users', function () {
        cy.request('POST', 'http://localhost:3001/api/users', users[1])
        cy.login(users[1])
        cy.visit('http://localhost:3000')

        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.error').should('contain', 'invalid')
        cy.get('.bloglist').should('contain', blogs[0].title)
      })
    })

    describe('When created many blogs', function () {
      beforeEach(function () {
        blogs.map(blog => cy.createBlog(blog))
        cy.visit('http://localhost:3000')
      })

      it('blogs are sorted by number of likes', function () {
        cy.get('button.expand').click({multiple: true})
        cy.get('span.likes')
          .invoke('text')
          .then(likes => {
            cy.wrap(likes).should('equal', blogs.sort((a, b) => b.likes - a.likes).map(i => i.likes).join(''))
          })
      })
    })
  })
})
