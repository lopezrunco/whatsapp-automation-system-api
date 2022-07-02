require('dotenv').config()

const bcrypt = require('bcrypt')
const faker = require('faker')
const mongoose = require('mongoose')
const getDbConnectionString = require('../utils/get-db-connection-string')
const { userModel } = require('../models/user')

const users = []
const userPassword = bcrypt.hashSync('supermegasecret', 2)

for (let userIndex = 0; userIndex < 10; userIndex++) {
    const lists = []
    for (let listIndex = 0; listIndex < faker.datatype.number(5); listIndex++) {
        lists.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            numbers: [08000800, 09000900, 06000600]
        })
    }
    users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: userPassword,
        role: userIndex === 0 ? 'ADMIN' : 'BASIC', // First user is ADMIN, the others are BASIC
        lists: lists
    })
}

console.log('Running seeder -----------------------------')
console.log(`${users.length} users will be inserted`)

// Connection to database
mongoose
    .connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        Promise.all([
            userModel.insertMany(users)
        ]).then(() => {
            console.log('Done!')
            mongoose.connection.close()
        })
    }).catch(error => {
        console.error('Could not connect to database', error)
    })