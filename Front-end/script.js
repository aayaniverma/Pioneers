document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-btn');
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  const messageBox = document.getElementById('message-box');
  const sendBtn = document.querySelector('.send-btn');
  const messagesContainer = document.getElementById('messages');
  const startButton = document.getElementById('voice-btn');
  const t2 = document.getElementById('t2');
  const t3 = document.getElementById('t3');
  const t4 = document.getElementById('t4');
  let recognition;

  body.classList.add('light-mode');

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('expanded');
  });

  modeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
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
      messageElement.classList.add('message');
      if (message) {
        const textElement = document.createElement('p');
        textElement.textContent = message;
        messageElement.appendChild(textElement);
      }
      messagesContainer.appendChild(messageElement);
      messageBox.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
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

  t2.addEventListener('click', function () {
    t2.style.display = 'none';
    t3.style.display = 'none';
    document.getElementById('direction-car-buttons').style.display = 'block';
  });

  t3.addEventListener('click', function () {
    t2.style.display = 'none';
    t3.style.display = 'none';
    document.getElementById('electric-car-buttons').style.display = 'block';
  });

  t4.addEventListener('click', function () {
    document.getElementById('d').style.display = 'block';
  });

  
  var textWrapper = document.querySelector('.ml14 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml14 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeInOutExpo",
    duration: 900
  }).add({
    targets: '.ml14 .letter',
    opacity: [0,1],
    translateX: [40,0],
    translateZ: 0,
    scaleX: [0.3, 1],
    easing: "easeOutExpo",
    duration: 800,
    offset: '-=600',
    delay: (el, i) => 150 + 25 * i
  }).add({
    targets: '.ml14',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


});
