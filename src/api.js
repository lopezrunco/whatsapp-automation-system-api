require('dotenv').config()
const mongoose = require('mongoose')
const mongooseToJson = require('@meanie/mongoose-to-json') // Cleans the requests on _id and __v fields
const express = require('express')
const cors = require('cors')
const getDbConnectionString = require('./utils/get-db-connection-string')

// Configuration of database plugins ------------------------------------------------------------- //

mongoose.plugin(mongooseToJson)

// Create app express ---------------------------------------------------------------------------- //

const app = express()

// Middlewares ---------------------------------------------------------------------------------- //

const checkUserCredentials = require('./middlewares/check-user-credentials')
const checkUserRole = require('./middlewares/check-user-role')

// Cors returns middleware function that opens the API in security terms, to connect the front-end (Allow conections between the same IP)
app.use(cors())

// Understand the JSON sended to the API
app.use(express.json())

// Controllers ---------------------------------------------------------------------------------- //

// Security
const refresh = require('./controllers/auth/refresh')

// Users
const login = require('./controllers/user/login')
const register = require('./controllers/user/register')
const getAllUsers = require('./controllers/user/get-all')
const getUserById = require('./controllers/user/get-by-id')

// Lists
const getAllLists = require('./controllers/list/get-all')
const getListById = require('./controllers/list/get-by-id')
const createList = require('./controllers/list/create')
const deleteList = require('./controllers/list/delete')
const updateList = require('./controllers/list/update')

// Routes ------------------------------------------------------------------------------------- //

// Users
// app.post('/login', login)
// app.post('/register', register)
// app.get('/admin/users', getAllUsers)
// app.get('/admin/users/:id', getUserById)

// Lists
// app.get('/lists', getAllLists)
// app.get('/lists/:id', getListById)
// app.post('/lists', createList)
// app.delete('/lists/:id', deleteList)
// app.put('/lists/:id', updateList)

// Connect to database
mongoose
    .connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT)
        console.log('Connected to DB')
    })
    .catch(error => {
        console.error('Could not connect to DB', error)
    })