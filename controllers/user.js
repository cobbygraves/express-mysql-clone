const UserModel = require('../models/user')

const createUserController = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const userData = await UserModel.createUser(email, password)
    res.json(userData)
  } catch (error) {
    next(error)
  }
}

const getUsersController = async (req, res, next) => {
  try {
    const userData = await UserModel.getUsers()
    res.json(userData)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUserController,
  getUsersController
}
