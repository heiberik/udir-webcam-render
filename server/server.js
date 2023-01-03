import express from 'express'
import cors from 'cors'
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename)
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, { maxHttpBufferSize: 199e6, cors: { origin: '*' } })

app.use(cors())
app.use(express.json())

if (process.env.PORT) {
    app.use(express.static(path.join(__dirname, '/../client/build')))
    app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/../client/build/index.html')))
}

const rooms = {}

io.on("connection", (socket) => {

    let room = null
    let device = null

    socket.on('joinRoom', function(data) {

        room = data.room
        device = data.device
        socket.join(room);
        io.to(room).emit("deviceConnected", { device, parts: rooms[room] })
        joinRoom(device, room)
    })

    socket.on('sendData', function(data) {
        io.to(data.room).emit("sendImageToPCI", { image: data.image })
    })

    socket.on("disconnect", () => {
        io.to(room).emit("deviceDisconnected", { device, parts: rooms[room] })
        leaveRoom(device, room)
    })
})

const joinRoom = (device, room) => {

    if (!device || !room) return
    if (!rooms[room]) rooms[room] = []
    rooms[room].push(device)

    console.log(device, " JOINED ROOM: ", room);
}

const leaveRoom = (device, room) => {

    if (!device || !room) return
    rooms[room] = rooms[room].filter(d => d !== device)

    console.log(device, " LEFT ROOM: ", room);
}


const port = process.env.PORT || 3002
httpServer.listen(port, () => console.log(`Server started, listening on port ${port}`))