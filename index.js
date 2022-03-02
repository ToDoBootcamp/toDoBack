const express = require('express');
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const mongoose = require("mongoose");

// Endpoints

app.use("/", todoRoutes);
app.use("/api/todo", todoRoutes);

mongoose.connect("mongodb+srv://products:products123@cluster0.demhi.mongodb.net/todoList?retryWrites=true&w=majority")
  .then(() => console.log("Connected successfully")).catch((err) => console.error(err));

/* app.get('/', (request, response) => {
  response.send('<h1>Todo List "Flores El Tambo"</h1>')
}) */

/* app.get('/api/todo', (request, response) => {
  response.json(todo)
}) */

const PORT = 3001 // port where the server runs
app.listen(PORT, () => { // server started asynchronously
  console.log(`Server running on port ${PORT}`)
})