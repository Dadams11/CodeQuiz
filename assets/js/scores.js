// Function to load highscores from local storage and display them
function loadHighscores() {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    var highscoreListEl = document.getElementById('highscores');

    // Clear existing list to prevent duplicates
    highscoreListEl.innerHTML = '';

    // Sort highscores in descending order (highest score first)
    highscores.sort((a, b) => b.score - a.score);

    // Populate highscores list
    highscores.forEach(score => {
        var liTag = document.createElement('li');
        liTag.textContent = `${score.initials} - ${score.score}`;
        highscoreListEl.appendChild(liTag);
    });
}

// Function to clear highscores from local storage and remove from the page
function clearHighscores() {
    localStorage.removeItem('highscores');
    document.getElementById('highscores').innerHTML = ''; // Clear display
}

// Load highscores when the page is opened
document.addEventListener('DOMContentLoaded', loadHighscores);

// Attach event listener to "Clear Highscores" button
document.getElementById('clear').addEventListener('click', clearHighscores);
