// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCesLOoOd-nM5rDhS1ytB5INODb7yvl8Dg",
  authDomain: "scorecard-a32c3.firebaseapp.com",
  databaseURL: "https://scorecard-a32c3-default-rtdb.firebaseio.com",
  projectId: "scorecard-a32c3",
  storageBucket: "scorecard-a32c3.appspot.com",
  messagingSenderId: "685147475325",
  appId: "1:685147475325:web:c5c322900954859e599014"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          alert('Your account has been created');
          window.location.href = "account.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    });
  }
});
