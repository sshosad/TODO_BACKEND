const express = require('express')

const router = express.Router()

const taskController = require('../controller').taskController

router.post('/create', taskController.creteTask)
router.put('/edit', taskController.editTask)
router.post('/list', taskController.fetchTaskList)
router.get('detail/:taskId/:userId', taskController.fetchTaskDetails)
router.put('/delete', taskController.deleteTask)

module.exports = router