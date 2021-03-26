const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 3000,
});

wss.on('connection', (ws) => {
  ws.onmessage = ({ data }) => {
    console.log(data);
    ws.send(data);
  };
});
