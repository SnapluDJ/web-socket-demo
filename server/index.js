const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();
app.use('/', express.static(path.resolve(__dirname, '../client')));
const server = app.listen(3000);

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws, req) => {
  const ipAddress = req.socket.remoteAddress;
  console.log(ipAddress);

  ws.onmessage = ({ data }) => {
    wss.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(data);
      }
    });
  };
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});
