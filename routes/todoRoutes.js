const router = require("express").Router()
const res = require("express/lib/response");
const todo = require("../models/todo")

router.get("/", (req, response) => {
    response.send('<h1>Todo List "Flores El Tambo"</h1>');
})

router.get("/api/todo", async (req, response) => {
    const resp = await todo.find();
    response.status(200).json(resp);
})

router.put("/api/todo/:id", (req, response) =>{
  const id = Number(req.params.id)
  const body = req.body

  const updateTodo = {
    "id": id,
    "title": body.title,
    "description": body.description,
    "date": new Date().toISOString(),
    "state": body.state,
    "deleted": body.deleted,
  }

  todo.findOneAndUpdate({id: id}, updateTodo, (err, result) => {
    if(err) throw new Error(err)
    res.json(result)
  })

  console.log({ newTodo: updateTodo })
  // response.json(updateTodo)
})

module.exports = router;
