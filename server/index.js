// const express = require('express');

// const app = express();

// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`server is listening port ${PORT}`);
// });

const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 3000,
});

wss.on('open', () => wss.send('connection is open'));

// wss.on('connection', (ws) => {});
