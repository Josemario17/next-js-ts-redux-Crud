import firebase from "firebase/compat/app";
import 'firebase/compat/database'; 

const firebaseConfig = {
    apiKey: "AIzaSyBXsGjqHkBIOwlmg-GUnOyS4xpiiQkW4Co",
    authDomain: "thirdheart-b1751.firebaseapp.com",
    projectId: "thirdheart-b1751",
    storageBucket: "thirdheart-b1751.appspot.com",
    messagingSenderId: "844060854183",
    appId: "1:844060854183:web:665a1961aaf657c1399882",
    measurementId: "G-2QWXPV6VXM"
};


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
else{
    firebase.app()
}

const database = firebase.database()

export { database, firebase }