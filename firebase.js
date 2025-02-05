
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';


const firebaseConfig = {
  apiKey: "AIzaSyBhTerRpJ-EjvUG-xZhFrbhd70ZuE-A1IU",
  authDomain: "studypal-91421.firebaseapp.com",
  projectId: "studypal-91421",
  storageBucket: "studypal-91421.firebasestorage.app",
  messagingSenderId: "778180528902",
  appId: "1:778180528902:android:56e1de1d6e2b57e32eec87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };