# 🚀 Quick Start Guide - Aarogya Setu

## Test the Platform in 5 Minutes!

### Step 1: Open the Application
1. Open `index.html` in your web browser
2. Explore the landing page features

### Step 2: Register as a Doctor (Optional but Recommended)

1. Click **"Doctor Space"** portal
2. Click **"Register Now"**
3. Fill in the form with sample data:
   ```
   First Name: Rajesh
   Last Name: Kumar
   Email: dr.rajesh@example.com
   Phone: 9876543210
   License Number: MH12345
   Specialization: Cardiologist
   Experience: 15
   Qualification: MBBS, MD
   Hospital: City Hospital
   Address: 123 Main Street
   City: Mumbai
   Pincode: 400001
   Consultation Fee: 500
   Password: doctor123
   ```
4. **Save your Doctor ID** (e.g., DR12345678901)

### Step 3: Register as a Patient

1. Go back to homepage (click logo or back button)
2. Click **"Patient Space"** portal
3. Click **"Register Now"**
4. Fill in the form with sample data:
   ```
   First Name: Priya
   Last Name: Sharma
   Email: priya.sharma@example.com
   Phone: 9123456789
   Aadhaar: 123456789012
   Date of Birth: 1990-01-15
   Gender: Female
   Blood Group: O+
   Address: 456 Park Avenue
   City: Mumbai
   Pincode: 400002
   Password: patient123
   ```
5. **Save your Patient ID** (e.g., PT12345678901)

### Step 4: Login as Patient

1. Click **"Login Here"** on registration success
2. Enter:
   ```
   Full Name: Priya Sharma
   Aadhaar: 123456789012
   Patient ID: [Your generated ID]
   ```
3. Click **"Login to Patient Portal"**

### Step 5: Book an Appointment

1. From Patient Dashboard, click **"Book Appointment"**
2. You'll see the doctor you registered (if you did Step 2)
3. Click on the doctor card to select
4. Choose a date (today or future)
5. Select a time slot (e.g., 10:00 AM)
6. Enter reason: "Regular checkup"
7. Click **"Book Appointment"**
8. Note your Appointment ID

### Step 6: View Appointment (Patient Side)

1. Return to Patient Dashboard
2. See your appointment in "My Appointments" section
3. View appointment details and status

### Step 7: Login as Doctor (Optional)

1. Logout from patient account
2. Go to Doctor Portal
3. Login with:
   ```
   Email: dr.rajesh@example.com
   Doctor ID: [Your generated ID]
   Password: doctor123
   ```
4. View the appointment in "Today's Appointments"
5. Mark it as "Complete" or "Cancel"

## 🎯 Key Features to Test

### Patient Features
- ✅ Registration with validation
- ✅ Login authentication
- ✅ Dashboard with stats
- ✅ Doctor search and filtering
- ✅ Appointment booking
- ✅ Appointment history
- ✅ Logout functionality

### Doctor Features
- ✅ Professional registration
- ✅ Login authentication
- ✅ Dashboard with analytics
- ✅ Today's appointments view
- ✅ Patient management
- ✅ Appointment status updates
- ✅ Logout functionality

### General Features
- ✅ Responsive design (resize browser)
- ✅ Language toggle (English/Hindi on homepage)
- ✅ Form validations
- ✅ Search functionality
- ✅ Filter by specialty

## 🧪 Sample Test Data

### Multiple Doctors (Register these for better testing)

**Doctor 1 - Cardiologist**
```
Name: Dr. Rajesh Kumar
Email: rajesh@example.com
License: MH12345
Specialty: Cardiologist
Fee: 500
```

**Doctor 2 - Dermatologist**
```
Name: Dr. Sneha Reddy
Email: sneha@example.com
License: MH67890
Specialty: Dermatologist
Fee: 400
```

**Doctor 3 - Pediatrician**
```
Name: Dr. Amit Patel
Email: amit@example.com
License: MH11111
Specialty: Pediatrician
Fee: 350
```

### Multiple Patients

**Patient 1**
```
Name: Priya Sharma
Aadhaar: 123456789012
Email: priya@example.com
```

**Patient 2**
```
Name: Rahul Verma
Aadhaar: 987654321098
Email: rahul@example.com
```

## 🔍 Testing Checklist

- [ ] Register a doctor successfully
- [ ] Register a patient successfully
- [ ] Login as patient
- [ ] Search for doctors
- [ ] Filter doctors by specialty
- [ ] Book an appointment
- [ ] View appointment on patient dashboard
- [ ] Logout from patient account
- [ ] Login as doctor
- [ ] View appointment on doctor dashboard
- [ ] Mark appointment as completed
- [ ] Check updated stats
- [ ] Test responsive design (resize browser)
- [ ] Test language toggle on homepage
- [ ] Test form validations (try invalid data)

## 💡 Tips

1. **Keep IDs Safe**: Save generated Patient/Doctor IDs in a text file
2. **Use Valid Formats**: 
   - Aadhaar: 12 digits
   - Phone: 10 digits
   - Pincode: 6 digits
3. **Browser Storage**: Data persists until you clear browser cache
4. **Multiple Accounts**: You can create multiple doctors and patients
5. **Date Selection**: Can only book future dates
6. **Time Slots**: Pre-defined slots from 9 AM to 5 PM

## 🐛 Troubleshooting

**Problem: Can't login**
- Solution: Check if you're using the correct ID format and credentials

**Problem: No doctors showing in booking**
- Solution: Register at least one doctor first

**Problem: Appointment not showing**
- Solution: Refresh the page or check if you're logged in as the correct user

**Problem: Data disappeared**
- Solution: Browser cache was cleared. Register again.

**Problem: Form validation errors**
- Solution: Ensure all required fields are filled with correct format

## 📱 Mobile Testing

1. Open on mobile browser
2. Test touch interactions
3. Check responsive layouts
4. Verify all features work on small screens

## 🎉 Success!

You've successfully tested the Aarogya Setu platform! 

Explore additional features:
- Try different specialties
- Book multiple appointments
- Test different time slots
- Check the statistics updates
- Explore the bilingual homepage

---

**Need Help?** Refer to the main README.md for detailed documentation.
