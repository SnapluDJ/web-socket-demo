const ws = new WebSocket('ws://localhost:3000/webSocket');

const message = document.getElementById('messages');
const input = document.getElementById('message');
const button = document.getElementById('send');
const body = document.querySelector('body');

button.disabled = true;

const sendMessage = () => {
  ws.send(input.value);
};

const generateNewMessage = (data) => {
  const newMessage = document.createElement('div');
  newMessage.innerText = `server echo: ${data}`;

  message.appendChild(newMessage);
};

button.addEventListener('click', sendMessage, false);
body.addEventListener(
  'keydown',
  (e) => {
    if (e.code === 'Enter') {
      sendMessage();
    }
  },
  false
);

ws.onopen = (e) => {
  button.disabled = false;
  if (input.value) {
    sendMessage();
  }
};

ws.onmessage = ({ data }) => {
  generateNewMessage(data);
};
