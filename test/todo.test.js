const mongoose = require('mongoose')
const supertest = require('supertest')
const todo = require("../models/todo")
const { app, server } = require('../index')

const api = supertest(app)

const initialTodo = [
  {
    _id:'6220372d93bd49646ab6b476',
    id:3,
    title:"hablar con el proveedor",
    description:"hablar con el proveedor",
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

test('notes are returned as json', async () => {
  await api
    .get('/api/todo')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('tere are three note', async () => {
  const response = await api.get('/api/todo')
    expect(response.body).toHaveLength(3)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})