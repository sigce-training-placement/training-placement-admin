import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyDd58VsmIXzUZG1jQGiCVhvTu5QT6eF14w",
	authDomain: "training-and-placement-sigce.firebaseapp.com",
	projectId: "training-and-placement-sigce",
	storageBucket: "training-and-placement-sigce.appspot.com",
	messagingSenderId: "79588467565",
	appId: "1:79588467565:web:936cdfd1671a876ca9b064"
};

const app = initializeApp(firebaseConfig, 'sigce-training-placement-admin');
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const fetchData = (doc) => {
	return { ...doc.data(), id: doc.id }
}