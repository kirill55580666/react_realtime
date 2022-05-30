const ws = require('ws')

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`WS Server started on 5000 port`))

wss.on('connection', function connection(ws) {
    //ws.id = Date.now() // реализация приватных комнат, нужна проверка в broadcastMessage
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case "connection":
                broadcastMessage(message)
                break
        }
    })
})

// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '21.01.2021',
//     username: 'user-agent_1',
//     message: "Привет всем, я подключился"
// }

function broadcastMessage (message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}