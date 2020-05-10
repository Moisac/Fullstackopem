const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const helper = require('./test_helper')

const api = supertest(app)

const initialBlog = [
    {
        title: 'First blog',
        author: 'Author1',
        url: 'url1',
        likes: 5
    },
    {
        title: 'Second blog',
        author: 'Author2',
        url: 'url2',
        likes: 12
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlog[0])
    await blogObject.save()

    blogObject = new Blog(initialBlog[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

   
})

test('blog unique identifier', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((item) => {
        expect(item.id).toBeDefined()
    })
})

test('a new blog can be added', async () => {
    const Blog = {
        title: 'adding blog for testing',
        author: 'Claudiu',
        url: 'http://test.com',
        likes: 15
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'YOUR_TOKEN')
        .send(Blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlog.length + 1)
    expect(contents).toContain('adding blog for testing')
})

test('can\'t add blog without correct token', async () => {
    const Blog = {
        title: 'blog without correct token',
        author: 'test',
        url: 'http://test.com',
        likes: 15
    }
    await api
        .post('/api/blogs')
        .set('Authorization', 'YOUR_TOKEN')
        .send(Blog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlog.length)
})

test('if likes property missing', async () => {
    const newBlog = {
        title: 'dqsdqdqw',
        author: 'dwqwqwd',
        url: 'dwqwdqdwq'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const response = await api.get("/api/blogs")
    const likes = response.body.likes
    expect(likes).toContain(0)
    
})

test("if title and url are missing", async () => {
    const newBlog = {
      author: "Title and url missing",
      likes: 15
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlog.length);
  });
  describe('deletion of a blog', () => {
      test('succeds with a status of 204 if id is valid', async () => {
          const blogAtStart = await blogsInDb()
          const blogToDelete = blogAtStart[0]

          await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

            const blogAtEnd = await blogsInDb()

            expect(blogAtEnd).toHaveLength(
                initialBlog.length - 1
            )
      })
  })
  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })

    
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })
afterAll(() => {
    mongoose.connection.close()
})