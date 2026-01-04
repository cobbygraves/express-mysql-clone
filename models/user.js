const pool = require('../utils/dBConnections')

const createUser = async (email, password) => {
  const query = 'INSERT INTO users(email, password)VALUES(?, ?)'
  try {
    // .execute() returns [rows, fields], we destructure to get just the result info
    const [result] = await pool.execute(query, [email, password])
    return result
  } catch (error) {
    console.error('Error in createUser model:', error)
    throw error
  }
}

const getUsers = async () => {
  const query = 'SELECT * FROM users'
  try {
    // .execute() returns [rows, fields], we destructure to get just the rows
    const [rows] = await pool.execute(query)
    return rows
  } catch (error) {
    console.error('Error in getUsers model:', error)
    throw error
  }
}

module.exports = { createUser, getUsers }
