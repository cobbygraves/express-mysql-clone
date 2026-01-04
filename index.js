const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { logger } = require('./utils/functions')
const { NotFoundError } = require('./utils/customErrors')
require('dotenv').config()

const app = express()

app.use(cookieParser())
app.use(express.json({ limit: '200mb', extended: true }))
app.use(express.urlencoded({ limit: '200mb', extended: true }))
app.use(
  cors({
    origin: [
      'https://yourfrontend.com',
      'http://localhost:4200',
      'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'X-CSRF-TOKEN']
  })
)

//testing route
app.get('/', (req, res) => {
  res.send('Server is running')
})

const userRouter = require('./routes/user')
app.use('/users', userRouter)

// 404 Handler
app.use((req, res, next) => next(new NotFoundError('Route not found')))

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  logger.error(`${req.method} ${req.url} - ${message}, { stack: err.stack }`)

  const response =
    process.env.NODE_ENV === 'development'
      ? { error: { message, status, stack: err.stack } }
      : { error: { message, status } }

  res.status(status).json(response)
})

// Process-level error handling
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

const PORT = 5000

app.listen(PORT, (error) => {
  if (error) {
    console.log('Error initializing server...')
    return
  }
  console.log('server listerning @ port 5000...')
})
