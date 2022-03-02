const router = require("express").Router();
const todo = require("../models/todo");
const mongoose = require("mongoose");

/* let todo = [
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
] */


router.get("/", (req, response) => {
  response.send('<h1>Todo List "Flores El Tambo"</h1>');
});
router.get("/api/todo", async (req, response) => {
  const resp = await todo.find();
  response.json(resp);
});


/* prueba */
router.delete("/api/todo/:id", async (req, response) => {
  const id = req.params["id"]
  await todo.findOneAndRemove({ id });
  response.status(204).json({})
  console.log(id);
});

module.exports = router;
