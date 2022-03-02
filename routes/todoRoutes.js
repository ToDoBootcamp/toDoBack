const router = require("express").Router();

const todo = require("../models/todo");
/* endpoints */

router.get("/", (req, response) => {
    response.send('<h1>Todo List "Flores El Tambo"</h1>');
});
/*endpoint to show all the todos */
router.get("/api/todo", async (req, response) => {
    const resp = await todo.find();
    response.json(resp);
});
/* create a document with the information of the request */
router.post("/new", (req, response) => {
  try {
    console.log(req.body);
    todo.create(req.body);
    response.status(201);
  } catch (err){ 
    response.status(500);
    
  }
  
})

module.exports = router;
