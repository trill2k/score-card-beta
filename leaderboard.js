import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, getDocs, where } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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

async function displayTopScores(courseName, containerId) {
    const scoresCollection = collection(db, "scores");
    const scoresQuery = query(scoresCollection, where("courseName", "==", courseName), orderBy("finalScore", "asc"), limit(10));

    try {
        const querySnapshot = await getDocs(scoresQuery);
        const scoresContainer = document.getElementById(containerId);

        // Clear previous scores
        scoresContainer.innerHTML = '';

        if (querySnapshot.empty) {
            scoresContainer.innerHTML = '<p>No scores available.</p>';
        } else {
            querySnapshot.forEach((doc) => {
                const scoreData = doc.data();
                const formattedTimestamp = scoreData.timestamp.toDate().toLocaleDateString(); // Format timestamp

                // Create a score item with desired formatting
                const scoreItem = document.createElement('div');
                scoreItem.classList.add('score-item');
                scoreItem.innerHTML = `
                    <div>
                        <span class="label">User ID: </span><span class="value">${scoreData.userId}</span><br>
                        <span class="label">Score: </span><span class="value">${scoreData.finalScore}</span><br>
                        <span class="label">Date: </span><span class="value">${formattedTimestamp}</span><br>
                    </div>
                    <hr>
                `;
                scoresContainer.appendChild(scoreItem);
            });
        }
    } catch (error) {
        console.error("Error fetching scores: ", error);
    }
}

// Fetch and display scores for each course
displayTopScores("East Potomac White Course", "white-course-scores");
displayTopScores("East Potomac Red Course", "red-course-scores");
displayTopScores("East Potomac Blue Course", "blue-course-scores");
