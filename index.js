const express = require('express')
const app = express()
const todoRoutes = require("./routes/todoRoutes")
const mongoose = require("mongoose")
const cors = require('cors')

app.use(cors())
app.use(express.json())

// Endpoints
app.use("/", todoRoutes) // Index
app.use("/api/todo", todoRoutes) // get all
app.use("/new", todoRoutes) // create one
app.use("api/todo/:id", todoRoutes) // update | delete

mongoose.connect("mongodb+srv://jairo:Jairo.228@cluster0.ul8oe.mongodb.net/todoList?retryWrites=true&w=majority") // Change this MONGO URI IN PRODUCTION
  .then(() => console.log("Connected successfully")).catch((err) => console.error(err))

// Error 404
app.use((req, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})

const PORT = process.env.PORT || 3001 // port where the server runs
const server = app.listen(PORT, () => { // server started asynchronously
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = {app, server}