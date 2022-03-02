const express = require('express')
const app = express()
const todoRoutes = require("./routes/todoRoutes")
const mongoose = require("mongoose")
const cors = require('cors')

app.use(cors())
app.use(express.json())

// Endpoints

app.use("/", todoRoutes)
app.use("/api/todo", todoRoutes)
app.use("api/todo/:id", todoRoutes)

mongoose.connect("mongodb+srv://floresDelTambo:floresDelTambo123@florestambo.4eyff.mongodb.net/todoList?retryWrites=true&w=majority")
  .then(() => console.log("Connected successfully")).catch((err) => console.error(err));

// Error 404
app.use((req, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})

const PORT = process.env.PORT || 3001 // port where the server runs
app.listen(PORT, () => { // server started asynchronously
  console.log(`Server running on http://localhost:${PORT}`)
})