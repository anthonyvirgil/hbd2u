import firebase from 'firebase/app';
import 'firebase/storage'; // storage bucket

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyBCF4AcjNVxR54pWuIQYJPE3UpTsXAgbU4',
	authDomain: 'hbd2u-e831b.firebaseapp.com',
	projectId: 'hbd2u-e831b',
	storageBucket: 'hbd2u-e831b.appspot.com',
	messagingSenderId: '1036640984893',
	appId: '1:1036640984893:web:c1ece1895b57d5b31d6f54',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage(); // start up storage service
export { projectStorage };
