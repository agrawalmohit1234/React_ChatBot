const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(router);

io.on('connectION', (socket) => {
    console.log('we have aa new connection !!!');
    socket.on('disconnect', () => {
        console.log('User had left !!!');
    })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));