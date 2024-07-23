// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Function to fetch and display scores
async function displayUserScores() {
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (userId) {
        try {
            const scoresCollection = collection(db, "scores");
            const scoresQuery = query(scoresCollection, where("userId", "==", userId), orderBy("timestamp", "desc"));

            const querySnapshot = await getDocs(scoresQuery);
            const scoresList = document.getElementById('scores-list');

            // Clear previous scores
            scoresList.innerHTML = '';

            if (querySnapshot.empty) {
                scoresList.innerHTML = '<p>No scores available.</p>';
            } else {
                querySnapshot.forEach((doc) => {
                    const scoreData = doc.data();
                    const formattedTimestamp = scoreData.timestamp.toDate().toLocaleDateString(); // Format timestamp

                    // Create a score item with desired formatting
                    const scoreItem = document.createElement('div');
                    scoreItem.classList.add('score-item');
                    scoreItem.innerHTML = `
                        <div>
                            <span class="label">Course: </span><span class="value">${scoreData.courseName}</span><br>
                            <span class="label">Final Score: </span><span class="value">${scoreData.finalScore}</span><br>
                            <span class="label">Date: </span><span class="value">${formattedTimestamp}</span><br>
                        </div>
                        <hr>
                    `;
                    scoresList.appendChild(scoreItem);
                });
            }
        } catch (error) {
            console.error("Error fetching scores: ", error);
        }
    } else {
        console.log("No user is signed in.");
    }
}

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    const userNameElements = document.querySelectorAll('.user-name');
    if (user) {
        // User is signed in
        const userName = user.displayName || user.email;
        userNameElements.forEach(element => {
            element.textContent = userName; // Display user name
        });
        // Redirect if logged in and on sign-in page
        if (window.location.pathname.includes('sign-in.html')) {
            window.location.href = "courses.html";
        }
    } else {
        // No user is signed in
        userNameElements.forEach(element => {
            element.textContent = 'Guest'; // Show guest status
        });
        // Redirect to sign-in page if not signed in and not already on it
        if (!window.location.pathname.includes('sign-in.html')) {
            window.location.href = "sign-in.html";
        }
    }
});

// Initialize
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayUserScores();
    } else {
        console.log("User is not logged in.");
    }
});
