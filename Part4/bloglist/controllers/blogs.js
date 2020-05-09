const blogRoutes = require('express').Router()
const Blog = require('../models/blogs')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
  
  blogRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs.map(blog => blog.toJSON()))
  })
  
  blogRoutes.post('/', async (request, response) => {
    const body = request.body
    
    const article = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
  
    const savedBlog = await article.save()
    response.json(savedBlog.toJSON())
  })

  blogRoutes.post('/:id', async (request, response) =>{
    const article = await findById(request.params.id)
    if(article) {
      response.json(article.toJSON())
    } else {
      response.status(404).end()
    }
  })

  blogRoutes.put('/:id', async (request, response) => {
    const body = request.body

    const article = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, article, { new: true })
    await updatedBlog.save()
    response.json(updatedBlog.toJSON())

  })
  
  blogRoutes.delete('/:id', async (request, response) => {
   await Blog.findByIdAndRemove(request.params.id)

   response.status(204).end()
  })

  module.exports = blogRoutes