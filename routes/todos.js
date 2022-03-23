var express = require('express')
var router = express.Router()

const todos = [
  {
    id: 1,
    name: 'do something',
    completed: false,
  },
]
/* GET todo listing. */
router.get('/', function (req, res, next) {
  return res.status(200).json(todos)
})

/* GET todo by id */
router.get('/:id', function (req, res, next) {
  todo = todos.find(todo=> todo.id === Number(req.params.id));
  if (!todo) {
    return res.status(404).json('not found')
  }
  return res.status(200).json(todo)
})

router.post('/:id', function (req, res, next) {
  todo = todos.find(todo=> todo.id === Number(req.params.id));
  if (!todo) {
    res.status(404)
  }
  res.json(todo)
})
module.exports = router
