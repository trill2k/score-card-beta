import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

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
    // Sign-in functionality
    const form = document.getElementById('signin-form'); 
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert('Successful Log In');
                    window.location.href = "account.html"; // Redirect on success
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage); // Show error message
                });
        });
    }

    // Sign-out functionality
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            signOut(auth).then(() => {
                alert('Successfully signed out');
                window.location.href = "sign-in.html"; // Redirect to sign-in page
            }).catch((error) => {
                console.error("Error signing out: ", error);
            });
        });
    }

    // Check if user is logged in
    onAuthStateChanged(auth, (user) => {
        const userNameElement = document.getElementById('user-name');
        if (user) {
            // User is signed in
            if (userNameElement) {
                const userName = user.displayName || user.email;
                userNameElement.textContent = userName; // Display user name
            }
            // Redirect if logged in and on sign-in page
            if (window.location.pathname.includes('sign-in.html')) {
                window.location.href = "courses.html";
            }
        } else {
            // No user is signed in
            if (userNameElement) {
                userNameElement.textContent = 'Guest'; // Show guest status
            }
            // Redirect to sign-in page if not signed in and not already on it
            if (!window.location.pathname.includes('sign-in.html')) {
                window.location.href = "sign-in.html";
            }
        }
    });
});
