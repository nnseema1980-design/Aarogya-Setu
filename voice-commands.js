// Voice Command Functionality for Aarogya Setu
let recognition;
let isListening = false;

function initVoiceRecognition() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
      isListening = true;
      document.getElementById('voiceBtn').classList.add('listening');
      document.getElementById('voiceStatus').textContent = '🎙️ Listening... Speak now!';
      document.getElementById('voiceTranscript').textContent = '';
    };

    recognition.onresult = function(event) {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      document.getElementById('voiceTranscript').textContent = transcript;
      
      if (event.results[event.results.length - 1].isFinal) {
        processVoiceCommand(transcript.toLowerCase());
      }
    };

    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
      document.getElementById('voiceStatus').textContent = '❌ Error: ' + event.error;
      stopListening();
    };

    recognition.onend = function() {
      stopListening();
    };
  } else {
    alert('Sorry, your browser does not support voice recognition. Please use Chrome or Edge.');
  }
}

function toggleVoiceCommand() {
  if (!recognition) {
    initVoiceRecognition();
  }

  if (isListening) {
    recognition.stop();
  } else {
    recognition.start();
  }
}

function stopListening() {
  isListening = false;
  document.getElementById('voiceBtn').classList.remove('listening');
  document.getElementById('voiceStatus').textContent = 'Click the microphone to start';
}

function processVoiceCommand(command) {
  document.getElementById('voiceStatus').textContent = '✅ Processing command...';
  
  // Book appointment
  if (command.includes('book') && command.includes('appointment')) {
    setTimeout(() => {
      document.getElementById('voiceStatus').textContent = '✅ Redirecting to booking page...';
      setTimeout(() => window.location.href = 'book-appointment.html', 1000);
    }, 500);
  }
  // Doctor portal
  else if (command.includes('doctor') && (command.includes('portal') || command.includes('login'))) {
    setTimeout(() => {
      document.getElementById('voiceStatus').textContent = '✅ Opening doctor portal...';
      setTimeout(() => window.location.href = 'doctor.html', 1000);
    }, 500);
  }
  // Patient portal
  else if (command.includes('patient') && (command.includes('portal') || command.includes('login'))) {
    setTimeout(() => {
      document.getElementById('voiceStatus').textContent = '✅ Opening patient portal...';
      setTimeout(() => window.location.href = 'patient.html', 1000);
    }, 500);
  }
  // AI analysis
  else if (command.includes('ai') || command.includes('health analysis') || command.includes('symptom')) {
    setTimeout(() => {
      document.getElementById('voiceStatus').textContent = '✅ Opening AI health analysis...';
      setTimeout(() => window.location.href = 'ai-health-analysis.html', 1000);
    }, 500);
  }
  // Help
  else if (command.includes('help')) {
    document.getElementById('voiceStatus').textContent = 'Say: "Book appointment", "Doctor portal", "Patient portal", or "AI analysis"';
  }
  // Unknown command
  else {
    document.getElementById('voiceStatus').textContent = '❓ Command not recognized. Try: "Book appointment" or say "Help"';
  }
}
