// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCepN1r_bYYwR-s0jdv2A4gH5hJbWojTes",
authDomain: "hci-final-e2c95.firebaseapp.com",
projectId: "hci-final-e2c95",
storageBucket: "hci-final-e2c95.firebasestorage.app",
messagingSenderId: "260974227471",
appId: "1:260974227471:web:f07db35c7e81234455b37a",
measurementId: "G-SQY9PH3PWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

//register button
const getin = document.getElementById('getin');
getin.addEventListener("click",function(event){
    event.preventDefault()
    //inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("Logging in...")
      window.location.href="dashboard.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})