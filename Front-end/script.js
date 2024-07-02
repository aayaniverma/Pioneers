document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-btn');
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const messageBox = document.getElementById('message-box');
  const sendBtn = document.querySelector('.send-btn');
  const messagesContainer = document.getElementById('messages');
  const startButton = document.getElementById('voice-btn');
  let recognition;

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

  if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support the Web Speech API');
  } else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function () {
      startButton.querySelector('.material-symbols-rounded').innerText = 'mic'; // Update icon to mic on
    };

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      messageBox.value = transcript;
    };

    recognition.onerror = function (event) {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function () {
      startButton.querySelector('.material-symbols-rounded').innerText = 'mic'; // Update icon to mic off
    };

    startButton.onclick = function () {
      if (recognition.recognizing) {
        recognition.stop();
        return;
      }
      messageBox.value = '';
      recognition.start();
    };
  }
});
