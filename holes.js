// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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
const db = getFirestore(app);

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    const userNameElement = document.getElementById('user-name');
    if (user) {
        // User is signed in
        if (userNameElement) {
            const userName = user.displayName || user.email;
            userNameElement.textContent = userName; // Display user name
        }
        if (window.location.pathname.includes('sign-in.html')) {
            window.location.href = "courses.html";
        }
    } else {
        // User is signed out
        if (userNameElement) {
            userNameElement.textContent = ''; // Clear the username display
        }
    }
});

// Define course name based on the page title
const courseName = document.title; // Use the document title

// Score tracking variables
let currentHole = 1;
const totalHoles = 9;
const scores = {};

function showHole(hole) {
    for (let i = 1; i <= totalHoles; i++) {
        document.getElementById(`hole-${i}`).classList.remove('active');
    }
    document.getElementById(`hole-${hole}`).classList.add('active');

    // Update input field with stored score if available
    const scoreInput = document.getElementById(`score-${hole}`);
    if (scores[hole]) {
        scoreInput.value = scores[hole];
    } else {
        scoreInput.value = '';
    }
}

function prevHole() {
    if (currentHole > 1) {
        currentHole--;
    } else {
        currentHole = totalHoles;
    }
    showHole(currentHole);
}

function nextHole() {
    if (currentHole < totalHoles) {
        currentHole++;
    } else {
        currentHole = 1;
    }
    showHole(currentHole);
}
let startX;

const carousel = document.getElementById('carousel');
carousel.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

carousel.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX > 50) {
        prevHole();
    } else if (deltaX < -50) {
        nextHole();
    }
});


function addScore(hole) {
    const scoreInput = document.getElementById(`score-${hole}`);
    const score = parseInt(scoreInput.value);
    if (isNaN(score)) return;
    scores[hole] = score;
    updateTotalScore();
}

function updateTotalScore() {
    let total = 0;
    for (const score of Object.values(scores)) {
        total += score;
    }
    document.getElementById('total-score').innerText = total;
}

// Submit score to Firestore
async function submitScore() {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const finalScore = parseInt(document.getElementById('total-score').innerText);
    const timestamp = new Date();

    if (userId) {
        try {
            await addDoc(collection(db, "scores"), {
                userId: userId,
                courseName: courseName,
                finalScore: finalScore,
                timestamp: timestamp
            });
            alert("Score submitted successfully!");
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error submitting score.");
        }
    } else {
        alert("You must be logged in to submit a score.");
    }
}

// Function to update username
async function updateUsername(newUsername) {
    const user = auth.currentUser;
    if (user) {
        try {
            await updateProfile(user, { displayName: newUsername });
            console.log("Username updated successfully!");
            // Update the displayed username
            document.getElementById('user-name').textContent = newUsername;
        } catch (error) {
            console.error("Error updating username:", error);
        }
    } else {
        console.log("No user is signed in.");
    }
}

// Make functions globally accessible
window.prevHole = prevHole;
window.nextHole = nextHole;
window.addScore = addScore; // If needed for buttons
window.submitScore = submitScore; // If needed for the submit button
window.updateUsername = updateUsername; // If needed to update username

// Initialize the first hole
showHole(currentHole);
