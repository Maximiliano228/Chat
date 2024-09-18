const chatWindow = document.querySelector('.chat__window');
const chatInput = document.querySelector('.chat__input-field');
const sendButton = document.querySelector('.chat__input-btn--send');
const saveButton = document.querySelector('.chat__input-btn--save');
const chatContainer = document.querySelector('.chat');

chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

sendButton.addEventListener('click', sendMessage);

saveButton.addEventListener('click', () => {
  const messages = Array.from(chatWindow.children).map(msg => msg.textContent);
  downloadFile(messages.join('\n'));
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    displayMessage(message);
    chatInput.value = '';
  }
}

function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function downloadFile(content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'chat_history.txt';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
