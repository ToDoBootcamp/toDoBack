const express = require('express')
const app = express()
const todoRoutes = require("./routes/todoRoutes")
const mongoose = require("mongoose")
app.use(express.json())
// Endpoints

app.use("/", todoRoutes)
app.use("/api/todo", todoRoutes)
app.use("/new", todoRoutes)

mongoose.connect("mongodb+srv://floresDelTambo:floresDelTambo123@florestambo.4eyff.mongodb.net/todoList?retryWrites=true&w=majority")
  .then(() => console.log("Connected successfully")).catch((err) => console.error(err))


const PORT = 3001 // port where the server runs
app.listen(PORT, () => { // server started asynchronously
  console.log(`Server running on http:/localhost:${PORT}`)
})