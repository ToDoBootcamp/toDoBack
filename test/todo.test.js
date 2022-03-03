const mongoose = require('mongoose')
const supertest = require('supertest')
const todo = require("../models/todo")
const { app, server } = require('../index')

const api = supertest(app)

const initialTodo = [
  {
    id:3,
    title:"hablar con el proveedor 1",
    description:"hablar con el proveedor 1",
    date:"2022-06-17",
    state:"incompeted",
    deleted:false
  },{
    id:2,
    title:"hablar con el proveedor 2",
    description:"hablar con el proveedor 2",
    date:"2022-06-17",
    state:"incompeted",
    deleted:false
  },{
    id:1,
    title:"hablar con el proveedor 3 ",
    description:"hablar con el proveedor 3",
    date:"2022-06-17",
    state:"incompeted",
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

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    await api
      .get('/')
      .expect(200)
  })
})

describe("Test GET methods to server", () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/todo')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three note', async () => {
    const response = await api.get('/api/todo')
      expect(response.body).toHaveLength(2)
  })
})

test('there are notting', async () => {
  await api
    .get('/api/something')
    .expect(404)
})


afterAll(() => {
  mongoose.connection.close()
  server.close()
})