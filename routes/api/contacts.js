const express = require('express')

const {ctrlWrapper} = require("../../middlewares")
const {contacts: ctrl} = require('../../controllers')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll))

// router.get('/tasks/:id', ctrlTask.getById)

// router.post('/tasks', ctrlTask.create)

// router.put('/tasks/:id', ctrlTask.update)

// router.patch('/tasks/:id/status', ctrlTask.updateStatus)

// router.delete('/tasks/:id', ctrlTask.remove)

module.exports = router