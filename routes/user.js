const express = require('express')
const {
  createUserController,
  getUsersController
} = require('../controllers/user')

const router = express.Router()

router.post('/create', createUserController)
router.get('/', getUsersController)

module.exports = router
