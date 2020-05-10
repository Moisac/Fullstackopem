const blogRoutes = require('express').Router()
const Blog = require('../models/blogs')
const mongoose = require('mongoose')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

  
  blogRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

    response.json(blogs.map(blog => blog.toJSON()))
  })

  const getTokenFrom = req => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      return authorization.substring(7);
    }
    return null;
  };
  
  
  blogRoutes.post('/', async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)


    if(!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
  

    if(!(body.url || body.title)) {
      return response
        .status(400)
        .json({error: "Title is required"})
        .end()
    }

    if(!body.likes) {
      blog.likes = 0;
    }
    
    const article = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
    const savedBlog = await article.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

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
    

    const decodedToken = jwt.verify(request.token, process.env.SECRET)


    const blog = await Blog.findById(request.params.id)
    const blogId = blog.user.toString()
    const userId = decodedToken.id

    if (blogId === userId) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
  })

  module.exports = blogRoutes