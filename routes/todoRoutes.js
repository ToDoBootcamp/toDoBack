const router = require("express").Router()
const todo = require("../models/todo")

/* endpoints */
router.get("/", (req, response) => {
    response.status(200).send('<h1>Todo List "Flores El Tambo"</h1>')
})

router.get("/api/todo", async (req, response) => {
    const resp = await todo.find()
    response.status(200).json(resp)
})

router.get("/api/todo/:id", async (req, response) => {
  const id = req.params['id']
  const resp = await todo.findOne({_id: id})
  response.status(200).json(resp)
})

router.put("/api/todo/:id", (req, response) =>{
  const id = Number(req.params.id)
  const body = req.body

  const updateTodo = {
    "title": body.title,
    "description": body.description,
    "state": body.state || 'incomplete',
    "deleted": body.deleted || false,
  }

  todo.findOneAndUpdate({id: id}, updateTodo, {new: true}, (err, result) => {
    if(err) throw new Error(err)
    response.status(200).json(result)
  })
})

// Deleted
router.delete("/api/todo/:id", async (req, response) => {
  const id = req.params["id"]
  await todo.findOneAndRemove({ _id: id })
  response.status(204).json({})
})

/* create a document with the information of the request */
router.post("/new", (req, response) => {
  const body = req.body
  
  const newTodo = {
    "title": body.title,
    "description": body.description,
    "date": new Date().toLocaleDateString(),
    "completed": false,
    "deleted": false
  }

  try {
    if(body.description && body.title){
      todo.create(newTodo) // create in db
      response.status(201)
    }else{
      response.status(500).json({
        "error" : "Not content"
      })
    }
  } catch (err){ 
    response.status(500)
  }
})

module.exports = router
