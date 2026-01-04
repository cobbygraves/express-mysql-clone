require('dotenv').config()

const express = require('express')
const userRouter = require('./routes/user')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => res.send('Server is running...'))

app.use('/users', userRouter)

const PORT = 5000

app.listen(PORT, (error) => {
  if (error) {
    console.log('Error initializing server...')
    return
  }
  console.log('server listerning @ port 5000...')
})
