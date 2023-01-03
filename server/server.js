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

io.on("connection", (socket) => {

    console.log("GOT SOCKET CONNECTION!");

    socket.on('mobileClientConnectionEstablished', function(data) {

        console.log("Server got mobile event from mobile client.");
        io.to(data.room).emit("mobileClientConnected", { connectionName: data.connectionName })
    })

    socket.on('PCImobileAck', function(data) {

        console.log("HEHEE: ", data);
        io.to(data.room).emit("mobileAck", { name: data.name })
    })

    socket.on('joinRoom', function(room) {
        socket.join(room);
    })

    socket.on('sendData', function(data) {
        io.to(data.room).emit("sendImageToPCI", { image: data.image })
    })

    socket.on("disconnect", () => {})
})


const port = process.env.PORT || 3002
httpServer.listen(port, () => console.log(`Server started, listening on port ${port}`))