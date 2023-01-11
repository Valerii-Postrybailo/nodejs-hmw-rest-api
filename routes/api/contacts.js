const express = require('express')

const {ctrlWrapper} = require("../../middlewares")
const {contacts: ctrl} = require('../../controllers')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll))

// router.get('/tasks/:id', ctrlTask.getById)

// router.post('/tasks', ctrlTask.create)

// router.put('/tasks/:id', ctrlTask.update)

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router