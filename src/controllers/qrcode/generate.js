const { Client } = require("whatsapp-web.js")
const client = new Client()

module.exports = (request, response) => {
    client.on('qr', (qr) => {
        console.log('QR received', qr)
        response.status(201).json({
            QR: qr
        })
    })
    client.initialize()
}

// const { Client } = require("whatsapp-web.js")
// const client = new Client()

// client.on('qr', (qr) => {
//     console.log('QR received', qr)
// })

// client.on('ready', () => {
//     console.log('Client ready!')
// })

// client.initialize()