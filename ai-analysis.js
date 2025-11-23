// Check if patient is logged in (optional - AI analysis works without login)
const isLoggedIn = localStorage.getItem('isPatientLoggedIn');
// AI analysis is accessible to everyone, no login required

let selectedSymptoms = [];

// Symptom tag selection
document.querySelectorAll('.symptom-tag').forEach(tag => {
  tag.addEventListener('click', function() {
    this.classList.toggle('selected');
    const symptom = this.dataset.symptom;
    if (selectedSymptoms.includes(symptom)) {
      selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    } else {
      selectedSymptoms.push(symptom);
    }
  });
});

// AI Analysis Engine
function analyzeSymptoms(data) {
  const { age, gender, symptoms, duration, severity, selectedSymptoms } = data;
  const results = [];
  const symptomsLower = symptoms.toLowerCase();
  
  // Critical symptoms check
  const hasCritical = symptomsLower.includes('chest pain') || 
                     symptomsLower.includes('shortness of breath') ||
                     selectedSymptoms.includes('chest-pain') || 
                     selectedSymptoms.includes('shortness-breath') ||
                     severity === 'critical';
  
  if (hasCritical) {
    results.push({
      type: 'danger',
      icon: '🚨',
      title: 'Immediate Medical Attention Required',
      content: `<p><strong>Your symptoms suggest you need immediate medical attention.</strong></p>
        <ul>
          <li>Call emergency services (108/102) right now - don't wait</li>
          <li>Get to the nearest hospital emergency room as quickly as possible</li>
          <li>Please don't drive yourself - ask someone else or call an ambulance</li>
          <li>Let a family member or friend know what's happening so they can help you</li>
        </ul>`
    });
  }
  
  // Fever + respiratory symptoms
  if ((selectedSymptoms.includes('fever') || symptomsLower.includes('fever')) &&
      (selectedSymptoms.includes('cough') || symptomsLower.includes('cough'))) {
    results.push({
      type: 'warning',
      icon: '🤒',
      title: 'Possible Respiratory Infection',
      content: `<p>Your symptoms suggest a respiratory infection:</p>
        <ul>
          <li><strong>Common Cold:</strong> Usually resolves in 7-10 days</li>
          <li><strong>Flu:</strong> More severe, may need medication</li>
          <li><strong>COVID-19:</strong> Consider getting tested</li>
        </ul>
        <p><strong>What you should do:</strong></p>
        <ul>
          <li>Get plenty of rest and drink lots of fluids to help your body recover</li>
          <li>Take paracetamol to bring down your fever and feel more comfortable</li>
          <li>Stay away from others to avoid spreading the infection</li>
          <li>Keep checking your temperature throughout the day</li>
          <li>See a doctor if you start feeling worse or symptoms don't improve</li>
        </ul>`
    });
  }
  
  // Headache analysis
  if (selectedSymptoms.includes('headache') || symptomsLower.includes('headache')) {
    const isSerious = severity === 'severe';
    results.push({
      type: isSerious ? 'warning' : 'info',
      icon: '🤕',
      title: isSerious ? 'Severe Headache - Medical Evaluation Needed' : 'Headache Analysis',
      content: `<p>Possible causes:</p>
        <ul>
          <li><strong>Tension Headache:</strong> Caused by stress</li>
          <li><strong>Migraine:</strong> Intense, throbbing pain</li>
          <li><strong>Dehydration:</strong> Drink water</li>
          <li><strong>Eye Strain:</strong> Take screen breaks</li>
        </ul>
        <p><strong>Here's what can help:</strong></p>
        <ul>
          <li>Find a quiet, dark room to rest - this really helps with headache pain</li>
          <li>Drink plenty of water as dehydration often makes headaches worse</li>
          <li>Try placing a cold compress on your forehead for 15-20 minutes</li>
          <li>Consider taking over-the-counter pain medication if the pain is bothering you</li>
          ${isSerious ? '<li><strong>Please see a doctor right away if your headache is severe or getting worse</strong></li>' : ''}
        </ul>`
    });
  }
  
  // Digestive issues
  if (selectedSymptoms.includes('nausea') || selectedSymptoms.includes('stomach-pain') ||
      symptomsLower.includes('stomach') || symptomsLower.includes('nausea')) {
    results.push({
      type: 'info',
      icon: '🤢',
      title: 'Digestive System Issues',
      content: `<p>Possible causes:</p>
        <ul>
          <li><strong>Food Poisoning:</strong> Resolves in 24-48 hours</li>
          <li><strong>Gastroenteritis:</strong> Stomach flu</li>
          <li><strong>Indigestion:</strong> From overeating</li>
          <li><strong>Acid Reflux:</strong> Stomach acid backing up</li>
        </ul>
        <p><strong>What will help you feel better:</strong></p>
        <ul>
          <li>Keep sipping water and oral rehydration solution to prevent dehydration</li>
          <li>Stick to bland foods like bananas, rice, applesauce, and toast (BRAT diet)</li>
          <li>Avoid dairy products and spicy foods as they can make symptoms worse</li>
          <li>Give your stomach a break - eat small amounts when you feel ready</li>
          <li>Contact a healthcare professional if symptoms continue for more than 2 days</li>
        </ul>`
    });
  }
  
  // Fatigue analysis
  if (selectedSymptoms.includes('fatigue') || symptomsLower.includes('tired') || 
      symptomsLower.includes('fatigue')) {
    results.push({
      type: 'info',
      icon: '😴',
      title: 'Fatigue and Low Energy',
      content: `<p>Possible causes:</p>
        <ul>
          <li><strong>Lack of Sleep:</strong> Aim for 7-9 hours</li>
          <li><strong>Anemia:</strong> Low iron levels</li>
          <li><strong>Thyroid Issues:</strong> May need test</li>
          <li><strong>Vitamin Deficiency:</strong> B12, D, or iron</li>
          <li><strong>Stress/Depression:</strong> Mental health</li>
        </ul>
        <p><strong>Ways to boost your energy:</strong></p>
        <ul>
          <li>Focus on getting 7-9 hours of quality sleep each night - good sleep habits make a huge difference</li>
          <li>Eat nutritious, balanced meals throughout the day to fuel your body properly</li>
          <li>Try light exercise like walking - it might seem counterintuitive, but it actually increases energy</li>
          <li>Find healthy ways to manage stress, like meditation or talking to someone you trust</li>
          <li>Consider getting blood tests to check for anemia, thyroid issues, or vitamin deficiencies</li>
        </ul>`
    });
  }
  
  // General wellness if no specific match
  if (results.length === 0) {
    results.push({
      type: 'success',
      icon: '✅',
      title: 'General Health Recommendations',
      content: `<p>Here's some general advice to keep you healthy:</p>
        <ul>
          <li>Keep an eye on how you're feeling and note any changes in your symptoms</li>
          <li>Drink plenty of water throughout the day - aim for about 8 glasses</li>
          <li>Make sure you're getting enough rest and quality sleep each night</li>
          <li>Try to eat a variety of nutritious foods to give your body what it needs</li>
          <li>Wash your hands regularly and maintain good personal hygiene</li>
          <li>Consider scheduling a routine check-up with your doctor to stay on top of your health</li>
        </ul>`
    });
  }
  
  // Add specialist recommendation
  results.push({
    type: 'info',
    icon: '👨‍⚕️',
    title: 'Recommended Specialist',
    content: `<p>You may want to consult:</p>
      <ul>
        ${hasCritical ? '<li><strong>Emergency Medicine</strong> - Immediate care</li>' : ''}
        ${(selectedSymptoms.includes('fever') || selectedSymptoms.includes('cough')) ? '<li><strong>General Physician</strong> - Respiratory infections</li>' : ''}
        ${selectedSymptoms.includes('headache') ? '<li><strong>Neurologist</strong> - Persistent headaches</li>' : ''}
        ${(selectedSymptoms.includes('nausea') || selectedSymptoms.includes('stomach-pain')) ? '<li><strong>Gastroenterologist</strong> - Digestive issues</li>' : ''}
        <li><strong>General Physician</strong> - Initial evaluation</li>
      </ul>
      <p><a href="book-appointment.html" style="color:#17a2b8;font-weight:600;">📅 Book an appointment now</a></p>`
  });
  
  return results;
}

// Form submission
document.getElementById('analysisForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    symptoms: document.getElementById('symptoms').value,
    duration: document.getElementById('duration').value,
    severity: document.getElementById('severity').value,
    selectedSymptoms: selectedSymptoms
  };
  
  // Show loading
  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('analysisResult').classList.remove('show');
  document.getElementById('loading').classList.add('show');
  
  // Simulate AI processing
  setTimeout(() => {
    const results = analyzeSymptoms(formData);
    displayResults(results);
    saveToHistory(formData);
    
    document.getElementById('loading').classList.remove('show');
    document.getElementById('analysisResult').classList.add('show');
  }, 2000);
});

function displayResults(results) {
  const resultDiv = document.getElementById('analysisResult');
  
  let html = results.map(result => `
    <div class="result-card ${result.type}">
      <div class="result-header">
        <div class="result-icon">${result.icon}</div>
        <div class="result-title">${result.title}</div>
      </div>
      <div class="result-content">${result.content}</div>
    </div>
  `).join('');
  
  html += `
    <div class="disclaimer">
      <strong>⚠️ Important Disclaimer:</strong>
      This AI analysis is for informational purposes only and should not be considered as professional medical advice. Always consult with a qualified healthcare provider. In emergency, call 108/102 immediately.
    </div>
  `;
  
  resultDiv.innerHTML = html;
}

function saveToHistory(formData) {
  let history = JSON.parse(localStorage.getItem('healthAnalysisHistory') || '[]');
  
  history.unshift({
    date: new Date().toISOString(),
    symptoms: formData.symptoms,
    severity: formData.severity,
    duration: formData.duration
  });
  
  history = history.slice(0, 10);
  localStorage.setItem('healthAnalysisHistory', JSON.stringify(history));
}
