document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-btn');
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const messageBox = document.getElementById('message-box');
  const sendBtn = document.querySelector('.send-btn');
  const messagesContainer = document.getElementById('messages');

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('expanded');
  });

  modeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      modeToggle.textContent = '☀️';
    } else {
      modeToggle.textContent = '🌙';
    }
  });

  sendBtn.addEventListener('click', function () {
    const message = messageBox.value.trim();
    if (message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.classList.add('message');
      messagesContainer.appendChild(messageElement);
      messageBox.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
    }
  });
});
