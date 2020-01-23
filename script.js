
var start = document.getElementById("start-btn");
var next = document.getElementById("next-btn");
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question")
var choicesEl = document.getElementById("choices-buttons");
var timeEl = document.getElementById("timerRemaining");
var scores = document.getElementById("scores");



var shuffledQuestions
var currentQuestion

start.addEventListener("click", startQuiz);
start.addEventListener("click", startTime);

next.addEventListener("click", () =>{
    currentQuestion++;
    nextQuestion();
});

function startQuiz(){
    start.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionContainer.classList.remove("hide")
    nextQuestion()
}

function nextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestion])
}

function showQuestion(question){
    questionEl.innerText = question.question
    question.choices.forEach(choice =>{
        var button = document.createElement("button")
        button.innerText = choice.text
        button.classList.add("btn")
        if(choice.correct){
            button.dataset.correct = choice.correct
        }
    button.addEventListener("click", selectChoice)
    choicesEl.appendChild(button)     
    })
}

function resetState() {
    next.classList.add("hide")
    while(choicesEl.firstChild){
        choicesEl.removeChild(choicesEl.firstChild)
    }
}

function selectChoice(e){
    var chosenButton = e.target
    var correct = chosenButton.dataset.correct
    Array.from(choicesEl.children).forEach(button =>{
        status(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestion + 1){
        next.classList.remove("hide") 
    } 
  
} 

function status(element, correct){
    clearStatus(element)
    if (correct){
        element.classList.add("correct")
    }
    else{
        element.classList.add("wrong")
    }
}

function clearStatus(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

var secondsLeft = 75;

function startTime() {
    var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.innerText = "Time: " + secondsLeft;

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
  choicesEl.addEventListener("click", function(){
      secondsLeft -= 15;
      timeEl.innerText = secondsLeft;
  })
}
startTime();


var questions = [
    {question: "What is 3 + 3?",
        choices:[
            {text: "9", correct: false},
            {text: "6", correct: true},
            {text: "8", correct: false},
            {text: "7", correct: false}
        ]   
    },
    {question: "What is 9 multiplied by 4?",
        choices:[
            {text: "27", correct: false},
            {text: "34", correct: false},
            {text: "36", correct: true},
            {text: "13", correct: false}
        ]
    },
    {question: "What is 381 divided by 3?",
        choices:[
            {text: "127", correct: true},
            {text: "125", correct: false},
            {text: "124", correct: false},
            {text: "126", correct: false}
        ]
    },
    {question: "What is 817 - 53?",
        choices:[
            {text: "774", correct: false},
            {text: "754", correct: false},
            {text: "784", correct: false},
            {text: "764", correct: true}
        ]
    },
    {question: "What is 144 multiplied by 24?",
        choices:[
            {text: "2800", correct: false},
            {text: "2880", correct: false},
            {text: "3456", correct: true},
            {text: "3312", correct: false}
        ]
    },
]