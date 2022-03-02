const router = require("express").Router();
const todo = require("../models/todo");
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

module.exports = router;
