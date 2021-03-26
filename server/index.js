const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 3000,
});

wss.on('connection', (ws) => {
  ws.onmessage = ({ data }) => {
    wss.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(data);
      }
    });
  };
});
