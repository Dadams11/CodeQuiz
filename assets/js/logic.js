var currentQuestionIndex = 0;
//time left value here
var time = questions.length * 20
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var timeEl = document.getElementById('time');
var titleScreen = document.getElementById('title-section');
var quizScreen = document.getElementById('quiz-section');
var highScoreScreen = document.getElementById('highscore-section');
var highScoreDisplay = document.getElementById('highscore-display-section');
var startScreenEl = document.getElementById('start-screen');
var highScoreEl= document.getElementById('highscores');

function startQuiz() {
  // hide start screen
   startScreenEl.setAttribute('class', 'hide');
  // un-hide questions section
 questionsEl.setAttribute('class','show');

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}
function tick(){
  //to update time
  time --;
  timerEl.textContent= time;
}
function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title; 

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event)  {
  var buttonEl = event.target;
  // check if user guessed wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
// penalize time
time -= 15;

if (time < 0){
  time = 0;
}
  
// display new time on page
    timerEl.textContent= time;

  // flash right/wrong feedback on page for half a second
 feedbackEl. textContent= 'Wrong!';
} else { 
feedbackEl.textContent = 'Correct!';
}
  // move to next question
  currentQuestionIndex++ ;
  // check if we've run out of questions or if time ran out?
  if (currentQuestionIndex == questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
 clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  questionsEl.setAttribute('class','hide');
  highScoreEl.removeAttribute('class');


  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

}

function clockTick() {
  //  to update time
  time--
  timerEl.textContent = time; 

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !=='') {

    // to get saved scores from localstorage,
    
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    // save to outr localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    printHighscores()
    // window.location.href = 'highScore.html';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks  buttons to start the functions
 submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;


choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;

function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // sort highscores by score property in descending order HINT: the sort method. 
  for (var i = 0; i < highscores.length; i += 1) {
    // create li tag for each high score
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    // display on page
    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

