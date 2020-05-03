const blogRoutes = require('express').Router()
const Blog = require('../models/blogs')
  
  blogRoutes.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(article => article.toJSON()))
      })
  })
  
  blogRoutes.post('/', (request, response) => {
    const body = request.body
    
    const article = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
  
    article.save().then(newArticle => {
      response.json(newArticle.toJSON())
    })
  })
  
  blogRoutes.delete('/:id', (request, response) => {
    Blog.findByIdAndRemove(request.params.id)
      .then(person => {
        response.status(204).end()
      })
      .catch(error => error)
  })

  module.exports = blogRoutes