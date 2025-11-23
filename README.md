# Aarogya Setu - Digital Healthcare Platform

A comprehensive digital healthcare platform connecting patients with doctors through an intuitive web interface.

## 🌟 Features

### For Patients
- **User Registration & Login** - Secure account creation with Aadhaar verification
- **Patient Dashboard** - View appointments, medical records, and health stats
- **Book Appointments** - Search and book consultations with verified doctors
- **Appointment Management** - Track upcoming and completed appointments
- **Profile Management** - Update personal and medical information

### For Doctors
- **Professional Registration** - Register with medical license verification
- **Doctor Dashboard** - Manage appointments and patient records
- **Patient Management** - View patient history and consultation details
- **Appointment Scheduling** - Accept and manage appointment requests
- **Practice Analytics** - Track patient count and consultation stats

### General Features
- **Bilingual Support** - English and Hindi language options (landing page)
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Secure Authentication** - Session-based login system
- **Real-time Updates** - Instant appointment status updates
- **Search & Filter** - Find doctors by specialty, name, or location

## 📁 File Structure

```
Aarogya setu/
├── index.html                  # Landing page with bilingual support
├── style.css                   # Shared stylesheet
├── logo.jpeg                   # Platform logo
│
├── patient.html                # Patient login page
├── patient-register.html       # Patient registration
├── patient-dashboard.html      # Patient dashboard
│
├── doctor.html                 # Doctor login page
├── doctor-register.html        # Doctor registration
├── doctor-dashboard.html       # Doctor dashboard
│
└── book-appointment.html       # Appointment booking system
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser using localStorage

### Installation
1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start using the platform!

## 📖 User Guide

### Patient Workflow

1. **Registration**
   - Navigate to Patient Portal from homepage
   - Click "Register Now"
   - Fill in personal details including:
     - Name, Email, Phone
     - Aadhaar number (12 digits)
     - Date of birth, Gender, Blood group
     - Address details
     - Create password
   - Save your generated Patient ID

2. **Login**
   - Enter your name, Aadhaar number, and Patient ID
   - Access your dashboard

3. **Book Appointment**
   - Click "Book Appointment" from dashboard
   - Search/filter doctors by specialty
   - Select preferred doctor
   - Choose date and time slot
   - Provide reason for consultation
   - Confirm booking

4. **Manage Appointments**
   - View all appointments on dashboard
   - Track appointment status (upcoming/completed)
   - Access appointment history

### Doctor Workflow

1. **Registration**
   - Navigate to Doctor Portal from homepage
   - Click "Register Now"
   - Fill in professional details:
     - Name, Email, Phone
     - Medical License Number
     - Specialization and Experience
     - Qualification (MBBS, MD, etc.)
     - Hospital/Clinic details
     - Consultation fee
     - Professional bio
     - Create password
   - Save your generated Doctor ID

2. **Login**
   - Enter email, Doctor ID, and password
   - Access your dashboard

3. **Manage Appointments**
   - View today's appointments
   - Mark appointments as completed
   - Cancel appointments if needed
   - Track patient statistics

4. **Patient Records**
   - View recent patients
   - Access patient consultation history
   - Track total patient count

## 🔐 Security Features

- **Aadhaar Verification** - 12-digit Aadhaar validation for patients
- **Medical License Verification** - License number required for doctors
- **Password Protection** - Minimum 6-character passwords
- **Session Management** - Secure login sessions using localStorage
- **Data Validation** - Client-side validation for all forms
- **Duplicate Prevention** - Checks for existing email/Aadhaar/license

## 💾 Data Storage

The application uses browser localStorage to simulate a backend database:

- `patients` - Array of registered patient records
- `doctors` - Array of registered doctor records
- `appointments` - Array of all appointments
- `currentPatient` - Current logged-in patient session
- `currentDoctor` - Current logged-in doctor session
- `isPatientLoggedIn` - Patient authentication flag
- `isDoctorLoggedIn` - Doctor authentication flag
- `aasLang` - Language preference (en/hi)

## 🎨 Design Features

- **Modern UI** - Clean, professional interface
- **Gradient Backgrounds** - Eye-catching color schemes
- **Smooth Animations** - Hover effects and transitions
- **Card-based Layout** - Organized information display
- **Responsive Grid** - Adapts to all screen sizes
- **Accessible Forms** - Clear labels and validation messages

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📱 Mobile Support

Fully responsive design with:
- Touch-friendly buttons
- Optimized layouts for small screens
- Readable text sizes
- Easy navigation

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - Client-side logic
- **localStorage API** - Data persistence
- **SVG Icons** - Scalable vector graphics

### Key Features Implementation

**Patient ID Generation**
```javascript
PT + timestamp(8 digits) + random(3 digits)
Example: PT12345678901
```

**Doctor ID Generation**
```javascript
DR + timestamp(8 digits) + random(3 digits)
Example: DR12345678901
```

**Appointment ID Generation**
```javascript
APT + timestamp(13 digits)
Example: APT1699523456789
```

## 🐛 Known Limitations

- Data stored in localStorage (cleared when browser cache is cleared)
- No real backend - all data is client-side
- No email notifications
- No payment gateway integration
- No video consultation feature (UI only)
- No actual medical record storage

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Database storage (MongoDB/PostgreSQL)
- [ ] Email/SMS notifications
- [ ] Payment gateway integration
- [ ] Video consultation feature
- [ ] Medical record upload
- [ ] Prescription generation
- [ ] Report analytics
- [ ] Admin dashboard
- [ ] Multi-language support expansion
- [ ] PWA (Progressive Web App) support
- [ ] Push notifications

## 📞 Support

For issues or questions:
- Helpline: 1800-192-2345
- Email: support@aarogyasetu.in (placeholder)

## 📄 License

This is an educational project. All rights reserved.

## 👥 Credits

Developed as a comprehensive healthcare platform demonstration.

---

**Note:** This is a prototype/demo application. For production use, implement proper backend, database, security measures, and comply with healthcare data regulations (HIPAA, etc.).
