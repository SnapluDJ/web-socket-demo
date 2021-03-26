const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();
app.use('/', express.static(path.resolve(__dirname, '../client')));
const server = app.listen(3000);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.onmessage = ({ data }) => {
    wss.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(data);
      }
    });
  };
});
