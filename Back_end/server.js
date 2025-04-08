// Backend: server.js (Node.js + Express + Socket.io)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(25565, () => {
    console.log('Server running on http://localhost:25565');
});
