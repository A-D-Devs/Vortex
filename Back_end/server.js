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

// Map to store connected usernames
const users = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle setting username
  socket.on('set username', (username) => {
    users.set(socket.id, username);
    console.log(`User ${socket.id} set username to ${username}`);
  });

  // Handle chat message
  socket.on('chat message', (msg) => {
    const username = users.get(socket.id) || 'Anonymous';
    io.emit('chat message', {
      username,
      message: msg
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    users.delete(socket.id);
  });
});

server.listen(25565, '0.0.0.0', () => {
  console.log('Server running on http://localhost:25565');
});
