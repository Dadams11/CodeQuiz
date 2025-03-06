var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

// Variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var startScreenEl = document.getElementById('start-screen');
var endScreenEl = document.getElementById('end-screen');
var highScoreListEl = document.getElementById('highscores-list'); // Highscore list
var restartBtn = document.getElementById('restart'); // Start Over button
var highScoreSectionEl = document.getElementById('highscores'); // Highscores section

function startQuiz() {
  // Hide start screen
  startScreenEl.setAttribute('class', 'hide');
  // Show questions section
  questionsEl.setAttribute('class', 'show');

  // Start timer
  timerId = setInterval(clockTick, 1000);

  // Show starting time
  timerEl.textContent = time;

  getQuestion();
}

function tick() {
  time--;
  timerEl.textContent = time;
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  // Update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title; 

  // Clear old question choices
  choicesEl.innerHTML = '';

  // Loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // Display on the page
    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = 'Wrong!';
  } else { 
    feedbackEl.textContent = 'Correct!';
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length || time <= 0) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  endScreenEl.removeAttribute('class');
  questionsEl.setAttribute('class', 'hide');

  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  // Show highscores only on this page
  printHighscores();
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initialsEl.value.trim();
  if (initials !== '') {
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    printHighscores();
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// Restart quiz function
function restartQuiz() {
  // Reset variables
  currentQuestionIndex = 0;
  time = questions.length * 20;

  // Hide end screen and show start screen
  endScreenEl.setAttribute('class', 'hide');
  startScreenEl.setAttribute('class', 'show');

  // Clear previous choices
  choicesEl.innerHTML = '';

  // Reset timer display
  timerEl.textContent = time;

  // Restart the quiz
  startQuiz();
}

// Function to display high scores
function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  var olEl = document.getElementById('highscores-list');

  // Clear existing list to avoid duplicates
  olEl.innerHTML = '';

  for (var i = 0; i < highscores.length; i++) {
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  document.getElementById('highscores-list').innerHTML = ''; // Clear display
}

submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
restartBtn.onclick = restartQuiz; // Start Over button
document.getElementById('clear').onclick = clearHighscores;
