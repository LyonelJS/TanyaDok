// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9lP6HWENT1eoaPubNdc2BJKAZP6uEtgs",
    authDomain: "login-93b7c.firebaseapp.com",
    databaseURL: "https://login-93b7c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "login-93b7c",
    storageBucket: "login-93b7c.firebasestorage.app",
    messagingSenderId: "1071407429197",
    appId: "1:1071407429197:web:6c88dda674de5d2dae8e04",
    measurementId: "G-HR35VE9TZ5"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

//register button
const getin = document.getElementById('getin');
getin.addEventListener("click", function(event){
    event.preventDefault()
    //inputs
    const email = document.getElementById('email-signin').value;
    const password = document.getElementById('password-signin').value;
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      // Signed in 
      alert("Logging in...")
      window.location.href="dashboard.html";
      // ...
    })
    .catch(() => {
      const errorMessage = 'Wrong Password or Username';
      alert(errorMessage)
    });
})

//register button
const enlist = document.getElementById('enlist');
enlist.addEventListener("click",function(event){
    event.preventDefault()
    //inputs
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;
    const username = document.getElementById('username-signup').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed up 
        alert("Creating Account...")
        
        const userEmail = userCredential.user.email.replace(/[^a-zA-Z0-9]/g, ','); // Retrieve the email
        db.ref(`users/${userEmail}/username`).set(username)    
    })
    .then(()=>{
        container.classList.remove("active");

    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
    });
})

const googleProvider = new firebase.auth.GoogleAuthProvider();

    const googleSignInBtn = document.getElementById('signin-google');
    googleSignInBtn.addEventListener('click', () => {
      firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
          const user = result.user;
          const userEmail = user.email;
          console.log("User's email:", userEmail);
        })
        .then(() => {
          // Signed in 
          alert("Logging in...")
          window.location.href="dashboard.html";
        })
        .catch((error) => {
          console.error(error);
        });
    });
