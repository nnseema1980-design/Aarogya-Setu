// Firebase Configuration for Aarogya Setu
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, push, remove, update, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZVgcBWOp0CdT7_aQv51zw7h1Q6PxXL8k",
  authDomain: "aarogya-setu-ba85c.firebaseapp.com",
  databaseURL: "https://aarogya-setu-ba85c-default-rtdb.firebaseio.com",
  projectId: "aarogya-setu-ba85c",
  storageBucket: "aarogya-setu-ba85c.firebasestorage.app",
  messagingSenderId: "232715076279",
  appId: "1:232715076279:web:1d8a50148de33ec2b5c332",
  measurementId: "G-JPGT3Z0MV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Firebase Database Class for Aarogya Setu
class FirebaseAarogyaDB {
  constructor() {
    this.db = database;
    this.auth = auth;
    this.storage = storage;
    this.currentUser = null;
    
    // Listen for auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      console.log('Auth state changed:', user ? user.uid : 'No user');
    });
  }

  // Authentication Methods
  async registerUser(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      // Save additional user data to database
      await set(ref(this.db, `users/${user.uid}`), {
        ...userData,
        uid: user.uid,
        email: email,
        createdAt: new Date().toISOString()
      });
      
      return { success: true, user: user, data: userData };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  }

  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      // Get user data from database
      const userData = await this.getUserData(user.uid);
      
      return { success: true, user: user, data: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }

  async logoutUser() {
    try {
      await signOut(this.auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }

  async getUserData(uid) {
    try {
      const snapshot = await get(ref(this.db, `users/${uid}`));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Get user data error:', error);
      return null;
    }
  }

  // Database CRUD Operations
  async create(table, data) {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      const newRef = push(ref(this.db, `${table}/${this.currentUser.uid}`));
      const dataWithId = {
        ...data,
        id: newRef.key,
        userId: this.currentUser.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await set(newRef, dataWithId);
      return { success: true, data: dataWithId, id: newRef.key };
    } catch (error) {
      console.error('Create error:', error);
      return { success: false, error: error.message };
    }
  }

  async getAll(table) {
    try {
      if (!this.currentUser) {
        return [];
      }

      const snapshot = await get(ref(this.db, `${table}/${this.currentUser.uid}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data);
      }
      return [];
    } catch (error) {
      console.error('Get all error:', error);
      return [];
    }
  }

  async getById(table, id) {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      const snapshot = await get(ref(this.db, `${table}/${this.currentUser.uid}/${id}`));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Get by ID error:', error);
      return null;
    }
  }

  async update(table, id, data) {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      const updateData = {
        ...data,
        updatedAt: new Date().toISOString()
      };

      await update(ref(this.db, `${table}/${this.currentUser.uid}/${id}`), updateData);
      return { success: true, data: updateData };
    } catch (error) {
      console.error('Update error:', error);
      return { success: false, error: error.message };
    }
  }

  async delete(table, id) {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      await remove(ref(this.db, `${table}/${this.currentUser.uid}/${id}`));
      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }
  }

  // Search functionality
  async search(table, query) {
    try {
      const allData = await this.getAll(table);
      const searchResults = allData.filter(item => {
        const searchString = JSON.stringify(item).toLowerCase();
        return searchString.includes(query.toLowerCase());
      });
      return searchResults;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  // File upload to Firebase Storage
  async uploadFile(file, path) {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      const fileRef = storageRef(this.storage, `${this.currentUser.uid}/${path}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { success: true, url: downloadURL, path: snapshot.ref.fullPath };
    } catch (error) {
      console.error('File upload error:', error);
      return { success: false, error: error.message };
    }
  }

  // Real-time listeners
  onDataChange(table, callback) {
    if (!this.currentUser) {
      console.warn('User not authenticated for real-time listener');
      return () => {};
    }

    const dataRef = ref(this.db, `${table}/${this.currentUser.uid}`);
    return onValue(dataRef, (snapshot) => {
      const data = snapshot.exists() ? Object.values(snapshot.val()) : [];
      callback(data);
    });
  }

  // Backup and restore
  async exportUserData() {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      const tables = ['appointments', 'medicines', 'labReports', 'healthData', 'consultations'];
      const exportData = {};

      for (const table of tables) {
        exportData[table] = await this.getAll(table);
      }

      return { success: true, data: exportData };
    } catch (error) {
      console.error('Export error:', error);
      return { success: false, error: error.message };
    }
  }

  async importUserData(data) {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      for (const [table, records] of Object.entries(data)) {
        if (Array.isArray(records)) {
          for (const record of records) {
            await this.create(table, record);
          }
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Import error:', error);
      return { success: false, error: error.message };
    }
  }
}

// Initialize Firebase Database
const FirebaseDB = new FirebaseAarogyaDB();

// Export for use in other files
window.FirebaseDB = FirebaseDB;
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDatabase = database;
window.firebaseStorage = storage;

export { FirebaseDB, app, auth, database, storage, analytics };
