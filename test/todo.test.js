const mongoose = require('mongoose')
const supertest = require('supertest')
const todo = require("../models/todo")
const { app, server } = require('../index')

const api = supertest(app)

const initialTodo = [
  {
    title:"Restructurando el backend 1",
    description:"Restructuracion del backend para lograr mejor rendimiento",
    date:"3/3/2022",
    completed:false,
    deleted:false
  },{
    title:"Restructurando el backend 2",
    description:"Restructuracion del backend para lograr mejor rendimiento",
    date:"3/3/2022",
    completed:false,
    deleted:false
  },{
    title:"Restructurando el backend 3",
    description:"Restructuracion del backend para lograr mejor rendimiento",
    date:"3/3/2022",
    completed:false,
    deleted:false
  }
]


// Create in database 3 this todos for test
beforeEach(async () => {
  await todo.deleteMany({}) // delete all todos

  // Create trhee todos for initialTodo
  const todo1 = new todo(initialTodo[0])
  await todo1.save()

  const todo2 = new todo(initialTodo[1])
  await todo2.save()

  const todo3 = new todo(initialTodo[2])
  await todo3.save()
})

// Test to root path
describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    await api
      .get('/')
      .expect(200)
  })
})

// Test to GET method
describe("Test GET methods to server", () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/todo')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three note', async () => {
    const response = await api.get('/api/todo')
      expect(response.body).toHaveLength(initialTodo.length)
  })
})

// Test in wrong url
test('there are notting', async () => {
  await api
    .get('/api/something')
    .expect(404)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})