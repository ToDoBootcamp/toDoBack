const config = require('./config')
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

// Error 404
app.use((req, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})

mongoose.connect(config.NODE_ENV === 'development' ? config.MONGO_ENV_DEV : config.MONGO_ENV_PRODUCTION)
  .then(() => console.log("Connected successfully")).catch((err) => console.error(err))


const PORT = process.env.PORT || config.PORT // port where the server runs
const server = app.listen(PORT, () => { // server started asynchronously
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = {app, server}