const express = require('express')
const cors = require('cors')
const Emitter  = require('events')
const PORT = 5000;

const emitter = new Emitter()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/get-messages', ((req, res) => {
    // res.writeHead(200, {
    //     'Cache-Control': 'no-cache, no-transform'
    // });
    emitter.on('newMessage', (message) => {
        res.json(message)
    })
}))

app.post('/new-message', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    emitter.removeAllListeners('newMessage')
    res.status(200).end()
}))


app.listen(PORT, () => console.log(`сервер запустился на порту ${PORT}`))