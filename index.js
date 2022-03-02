const express = require('express')
const app = express()

let todo = [
  {
    "id": 1,
    "title": 'Test ToDo',
    "description": 'First Test',
    "date": new Date(),
    "state": 'completed',
    "deleted": false
  },{
    "id": 2,
    "title": 'Test ToDo 2',
    "description": 'Second Test',
    "date": new Date(),
    "state": 'incompleted',
    "deleted": false
  }
]

// Endpoints
app.get('/', (request, response) => {
  response.send('<h1>Todo List "Flores El Tambo"</h1>')
})

app.get('/api/todo', (request, response) => {
  response.json(todo)
})

const PORT = 3001 // port where the server runs
app.listen(PORT, () => { // server started asynchronously
  console.log(`Server running on port ${PORT}`)
})