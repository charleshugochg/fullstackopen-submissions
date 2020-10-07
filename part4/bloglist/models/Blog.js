const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  author: {
    type: String,
    minlength: 3,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  url: String,
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      type: String
    }
  ]
})

blogSchema.set('toJSON' ,{
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
