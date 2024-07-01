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
  const cameraInput = document.createElement('input');
  cameraInput.type = 'file';
  cameraInput.accept = 'image/*';
  cameraInput.capture = 'environment';
  const imagePreview = document.getElementById('image-preview');
  const imageBtn = document.getElementById('image-btn');
  const imageOptions = document.getElementById('image-options');
  const uploadDevice = document.getElementById('upload-device');
  const captureCamera = document.getElementById('capture-camera');
  const cameraModal = document.getElementById('camera-modal');
  const video = document.getElementById('video');
  const snap = document.getElementById('snap');
  const closeCamera = document.getElementById('close-camera');
  const canvas = document.getElementById('canvas');
  let recognition;
  let capturedImageDataURL = '';

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
    const imageFile = imageInput.files[0] || cameraInput.files[0];
    if (message || capturedImageDataURL || imageFile) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      if (message) {
        const textElement = document.createElement('p');
        textElement.textContent = message;
        messageElement.appendChild(textElement);
      }
      if (capturedImageDataURL) {
        const imgElement = document.createElement('img');
        imgElement.src = capturedImageDataURL;
        messageElement.appendChild(imgElement);
      } else if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          messageElement.appendChild(imgElement);
        };
        reader.readAsDataURL(imageFile);
      }
      messagesContainer.appendChild(messageElement);
      messageBox.value = '';
      imagePreview.innerHTML = '';
      imageInput.value = '';
      cameraInput.value = '';
      capturedImageDataURL = ''; // Clear the captured image data URL
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
    }
  });

  imageBtn.addEventListener('click', function () {
    imageOptions.classList.toggle('show'); // Toggle visibility of image options dropdown
  });

  uploadDevice.addEventListener('click', function () {
    imageInput.click(); // Trigger click on hidden file input for device upload
    imageOptions.classList.remove('show'); // Hide dropdown after selection
  });

  captureCamera.addEventListener('click', function () {
    imageOptions.classList.remove('show'); // Hide dropdown before opening camera modal
    cameraModal.style.display = 'block';
    startCamera();
  });

  closeCamera.addEventListener('click', function () {
    cameraModal.style.display = 'none';
    stopCamera();
  });

  snap.addEventListener('click', function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    capturedImageDataURL = canvas.toDataURL('image/png');
    imagePreview.innerHTML = `
      <img src="${capturedImageDataURL}" alt="Image Preview">
      <button class="remove-image">✖</button>
    `;
    document.querySelector('.remove-image').addEventListener('click', function () {
      imagePreview.innerHTML = '';
      capturedImageDataURL = ''; // Clear the captured image data URL
    });
    cameraModal.style.display = 'none';
    stopCamera();
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

  function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.srcObject = stream;
        video.play();
      }).catch(function (err) {
        console.error('Error accessing camera: ' + err);
      });
    }
  }

  function stopCamera() {
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    video.srcObject = null;
  }

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
