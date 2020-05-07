const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')

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
        author: 'Moisa Claudiu',
        url: 'http://test.com',
        likes: 15
    }

    await api
        .post('/api/blogs')
        .send(Blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(3)
    expect(contents).toContain('adding blog for testing')
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
afterAll(() => {
    mongoose.connection.close()
})