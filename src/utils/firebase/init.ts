import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyB6R6h1XvimUjKDPdoohayJNENYJEp6NfI",
    authDomain: "appserver-fbf1f.firebaseapp.com",
    databaseURL: "https://appserver-fbf1f.firebaseio.com",
    projectId: "appserver-fbf1f",
    storageBucket: "appserver-fbf1f.appspot.com",
    messagingSenderId: "576783910721",
    appId: "1:576783910721:web:5d4f1ba05ee77944bb83c0",
    measurementId: "G-8Y4FNE8HMT"
};

const initFirebase = () => {
    firebase.initializeApp(config);
}

export default initFirebase;
