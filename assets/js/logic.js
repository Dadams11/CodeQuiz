// variables to keep track of quiz state
var currentQuestionIndex = 0;
//time left value here
var time = questions.length * 15
// var time = ;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('#questions');
var timerEl = document.getElementById('#timer');
var choicesEl = document.getElementById('#choices');
var submitBtn = document.getElementById('#submit');
var startBtn = document.getElementById('#start');
var initialsEl = document.getElementById('#initials');
var feedbackEl = document.getElementById('#feedback');
var timeEl = document.getElementById('#time');
var titleScreen = document.getElementById('#title-section');
var quizScreen = document.getElementById('#quiz-section');
var highScoreScreen = document.getElementById('#highscore-section');
var highScoreDisplay = document.getElementById('#highscore-display-section');
var startScreenEl = document.getElementById('#start-screen');

function startQuiz() {
  // hide start screen
   startScreenEl.setAttribute('class', 'hide');
   titleScreen.setAttribute('class','hide');
  // un-hide questions section
 questionsEl.removeAttribute('hide');
quizScreen.removeAttribute('hide');
  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timeEl.textContent = time;

  getQuestion();
}
//create a second taken off of a clock
function tick(){
  //to update time
  time --;
  timeEl.textContent= time;
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
  for (var i = 0; i < questions.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(target)  
  var buttonEl = target;
 // if the clicked element is not a choice button, do nothing.
 if (!buttonEl.matches('.choice')) {
  return;
  }

  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
// penalize time
time -= 15;

if (time < 0){
  time = 0;
}
  
// display new time on page
    timeEl.textContent= time;

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



function quizEnd() {
  // stop timer
 clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById('');
  endScreenEl.removeAttribute('class');

  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  // hide questions section
  quizScreen.setAttribute('class', 'hide');
}

function clockTick() {
  // update time
  // decrement the variable we are using to track time
  timerEl.textContent = time; // update out time

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

    // get saved scores from localstorage, or if not any, set to empty array
    
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'highScore.html';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
