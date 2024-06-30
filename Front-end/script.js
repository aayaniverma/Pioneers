document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-btn');
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const messageBox = document.getElementById('message-box');
  const sendBtn = document.querySelector('.send-btn');
  const messagesContainer = document.getElementById('messages');
  const startButton = document.getElementById('voice-btn');
  const imageInput = document.getElementById('image-input');
  const imagePreview = document.getElementById('image-preview');
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

  sendBtn.addEventListener('click', function () {
    const message = messageBox.value.trim();
    const imageFile = imageInput.files[0];

    if (message || imageFile) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');

      if (message) {
        const textElement = document.createElement('p');
        textElement.textContent = message;
        messageElement.appendChild(textElement);
      }

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          imgElement.style.maxWidth = '200px';
          imgElement.style.maxHeight = '200px';
          messageElement.appendChild(imgElement);
        };
        reader.readAsDataURL(imageFile);
      }

      messagesContainer.appendChild(messageElement);
      messageBox.value = '';
      imageInput.value = ''; // Clear the image input
      imagePreview.innerHTML = ''; // Clear the image preview
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
    }
  });

  imageInput.addEventListener('change', function () {
    const imageFile = imageInput.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.innerHTML = `
          <img src="${e.target.result}" alt="Image Preview">
          <button class="remove-image">✖</button>
        `;
        document.querySelector('.remove-image').addEventListener('click', function () {
          imagePreview.innerHTML = '';
          imageInput.value = '';
        });
      };
      reader.readAsDataURL(imageFile);
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
      startButton.innerText = '🎤';
    };

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      messageBox.value = transcript;
    };

    recognition.onerror = function (event) {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function () {
      startButton.innerText = '🎤';
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
