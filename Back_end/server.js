const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

// Map to store connected usernames and their chat sessions
const users = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle setting username
  socket.on('set username', (username) => {
    if (!users.has(socket.id)) {
      users.set(socket.id, { username, chatSessions: [] });
      io.emit('new user', socket.id);
    }
  });

  // Handle create new chat request
  socket.on('create new chat', (username) => {
    const userId = Array.from(users.keys()).find((id) => users.get(id).username === username);
    if (userId) {
      const chatId = Date.now().toString();
      users.get(userId).chatSessions.push(chatId);
      io.emit('new chat', chatId);
    }
  });

  // Handle chat message
  socket.on('chat message', ({ chatId, message }) => {
    const userId = Array.from(users.keys()).find((id) => users.get(id)?.chatSessions?.includes(chatId));
    if (userId) {
      const username = users.get(userId).username;
      io.emit('chat message', { chatId, username, message });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    users.delete(socket.id);
    io.emit('user disconnected', socket.id);
  });
});

server.listen(25565, '0.0.0.0', () => {
  console.log('Server running on http://localhost:25565');
});
