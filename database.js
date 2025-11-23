/**
 * Aarogya Setu - Simple Database System
 * A lightweight JSON-based database for the healthcare project
 */

class AarogyaDB {
  constructor() {
    this.tables = {
      users: 'aarogya_users',
      doctors: 'aarogya_doctors', 
      patients: 'aarogya_patients',
      appointments: 'aarogya_appointments',
      medicines: 'aarogya_medicines',
      labReports: 'aarogya_lab_reports',
      healthData: 'aarogya_health_data',
      consultations: 'aarogya_consultations'
    };
    
    this.initializeDatabase();
  }

  // Initialize database with sample data
  initializeDatabase() {
    // Initialize empty tables if they don't exist
    Object.values(this.tables).forEach(table => {
      if (!localStorage.getItem(table)) {
        localStorage.setItem(table, JSON.stringify([]));
      }
    });

    // Add sample data if database is empty
    if (this.getAll('doctors').length === 0) {
      this.seedSampleData();
    }
  }

  // Generic CRUD Operations
  
  // CREATE - Add new record
  create(table, data) {
    try {
      const records = this.getAll(table);
      const newRecord = {
        id: this.generateId(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      records.push(newRecord);
      localStorage.setItem(this.tables[table], JSON.stringify(records));
      return { success: true, data: newRecord };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // READ - Get all records
  getAll(table) {
    try {
      const data = localStorage.getItem(this.tables[table]);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading ${table}:`, error);
      return [];
    }
  }

  // READ - Get record by ID
  getById(table, id) {
    const records = this.getAll(table);
    return records.find(record => record.id === id);
  }

  // READ - Find records by criteria
  find(table, criteria) {
    const records = this.getAll(table);
    return records.filter(record => {
      return Object.keys(criteria).every(key => 
        record[key] === criteria[key]
      );
    });
  }

  // UPDATE - Update record by ID
  update(table, id, updateData) {
    try {
      const records = this.getAll(table);
      const index = records.findIndex(record => record.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Record not found' };
      }

      records[index] = {
        ...records[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem(this.tables[table], JSON.stringify(records));
      return { success: true, data: records[index] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // DELETE - Delete record by ID
  delete(table, id) {
    try {
      const records = this.getAll(table);
      const filteredRecords = records.filter(record => record.id !== id);
      
      if (records.length === filteredRecords.length) {
        return { success: false, error: 'Record not found' };
      }

      localStorage.setItem(this.tables[table], JSON.stringify(filteredRecords));
      return { success: true, message: 'Record deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Utility Methods

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Search across multiple fields
  search(table, query) {
    const records = this.getAll(table);
    const searchTerm = query.toLowerCase();
    
    return records.filter(record => {
      return Object.values(record).some(value => 
        String(value).toLowerCase().includes(searchTerm)
      );
    });
  }

  // Get records with pagination
  paginate(table, page = 1, limit = 10) {
    const records = this.getAll(table);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      data: records.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(records.length / limit),
        totalRecords: records.length,
        hasNext: endIndex < records.length,
        hasPrev: page > 1
      }
    };
  }

  // Seed sample data
  seedSampleData() {
    // Sample Doctors
    const sampleDoctors = [
      {
        name: "Dr. Sneha Reddy",
        specialty: "Dermatologist",
        experience: "10+ years",
        rating: 4.7,
        fee: 500,
        phone: "+91 98765 43210",
        email: "sneha.reddy@aarogya.com",
        qualification: "MBBS, MD Dermatology",
        hospital: "Apollo Hospital",
        availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        status: "active"
      },
      {
        name: "Dr. Vikram Singh",
        specialty: "Neurologist", 
        experience: "20+ years",
        rating: 5.0,
        fee: 800,
        phone: "+91 98765 43211",
        email: "vikram.singh@aarogya.com",
        qualification: "MBBS, MD Neurology",
        hospital: "AIIMS Delhi",
        availability: ["10:00", "11:00", "16:00", "17:00"],
        status: "active"
      },
      {
        name: "Dr. Rajesh Kumar",
        specialty: "Cardiologist",
        experience: "15+ years", 
        rating: 4.9,
        fee: 700,
        phone: "+91 98765 43212",
        email: "rajesh.kumar@aarogya.com",
        qualification: "MBBS, MD Cardiology",
        hospital: "Fortis Hospital",
        availability: ["09:00", "12:00", "14:00", "15:00", "16:00"],
        status: "active"
      }
    ];

    // Sample Patients
    const samplePatients = [
      {
        name: "Rahul Sharma",
        age: 28,
        gender: "Male",
        phone: "+91 87654 32109",
        email: "rahul.sharma@email.com",
        address: "123 MG Road, Delhi",
        bloodGroup: "O+",
        emergencyContact: "+91 87654 32108",
        medicalHistory: ["Hypertension"],
        status: "active"
      },
      {
        name: "Priya Patel",
        age: 34,
        gender: "Female", 
        phone: "+91 87654 32110",
        email: "priya.patel@email.com",
        address: "456 Park Street, Mumbai",
        bloodGroup: "A+",
        emergencyContact: "+91 87654 32111",
        medicalHistory: ["Diabetes Type 2"],
        status: "active"
      }
    ];

    // Sample Appointments
    const sampleAppointments = [
      {
        patientId: "patient_001",
        doctorId: "doctor_001", 
        patientName: "Rahul Sharma",
        doctorName: "Dr. Sneha Reddy",
        date: "2025-11-15",
        time: "10:00 AM",
        type: "Consultation",
        status: "Confirmed",
        reason: "Skin allergy consultation",
        fee: 500
      },
      {
        patientId: "patient_002",
        doctorId: "doctor_002",
        patientName: "Priya Patel", 
        doctorName: "Dr. Vikram Singh",
        date: "2025-11-16",
        time: "11:00 AM",
        type: "Follow-up",
        status: "Pending",
        reason: "Migraine follow-up",
        fee: 800
      }
    ];

    // Add sample data to database
    sampleDoctors.forEach(doctor => this.create('doctors', doctor));
    samplePatients.forEach(patient => this.create('patients', patient));
    sampleAppointments.forEach(appointment => this.create('appointments', appointment));

    console.log('✅ Sample data loaded successfully!');
  }

  // Export database (for backup)
  exportData() {
    const exportData = {};
    Object.keys(this.tables).forEach(table => {
      exportData[table] = this.getAll(table);
    });
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `aarogya_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }

  // Import database (restore from backup)
  importData(jsonData) {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      
      Object.keys(data).forEach(table => {
        if (this.tables[table]) {
          localStorage.setItem(this.tables[table], JSON.stringify(data[table]));
        }
      });
      
      return { success: true, message: 'Data imported successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Clear all data (use with caution)
  clearAll() {
    Object.values(this.tables).forEach(table => {
      localStorage.removeItem(table);
    });
    this.initializeDatabase();
    console.log('🗑️ Database cleared and reinitialized');
  }

  // Get database statistics
  getStats() {
    const stats = {};
    Object.keys(this.tables).forEach(table => {
      stats[table] = this.getAll(table).length;
    });
    return stats;
  }
}

// Initialize global database instance
window.AarogyaDB = new AarogyaDB();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AarogyaDB;
}

console.log('🏥 Aarogya Setu Database initialized successfully!');
console.log('📊 Database Stats:', window.AarogyaDB.getStats());
