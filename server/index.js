const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();
app.use('/', express.static(path.resolve(__dirname, '../client')));
const server = app.listen(3000);

const noop = () => {};
function heartbeat() {
  this.isAlive = true;
  // console.log('get ping in server');
}

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);

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

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;

    ws.ping(noop);
  });
}, 1000);

wss.on('close', () => clearInterval(interval));
