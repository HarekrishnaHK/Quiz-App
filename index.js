const quizData = [
    {
        question: "Question 1: What is the output of the following code?",
        options: ["[1] [2]", "[1] [1, 2]", "[1] [1]", "[2] [1, 2]"],
        correct: "b",
        code: `
def func(x, y=[]):
    y.append(x)
    return y
print(func(1))
print(func(2))
        `
    },
    {
        question: "Question 2: Which of the following is a mutable data type in Python?",
        options: ["String", "Tuple", "List", "Integer"],
        correct: "c"
    },
    {
        question: "Question 3: What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: "c"
    },
    {
        question: "Question 4: Which HTML tag is used to define an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        correct: "a"
    },
    {
        question: "Question 5: Which method must be implemented by all threads in Java?",
        options: ["start()", "run()", "execute()", "init()"],
        correct: "b"
    },
    {
        question: "Question 6: Which of the following is not a Java feature?",
        options: ["Object-oriented", "Use of pointers", "Portable", "Dynamic"],
        correct: "b"
    },
    {
        question: "Question 7: What is the output of the following C code?",
        options: ["x is 10", "x is not 10", "Error", "x == 10"],
        correct: "a",
        code: `
#include <stdio.h>
int main() {
    int x = 10;
    if (x == 10) {
        printf("x is 10\\n");
    } else {
        printf("x is not 10\\n");
    }
    return 0;
}
        `
    },
    {
        question: "Question 8: Which of the following is not a valid variable name in C?",
        options: ["_var", "var_1", "1_var", "var1"],
        correct: "c"
    },
    {
        question: "Question 9: Which data structure uses LIFO (Last In First Out) method?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: "b"
    },
    {
        question: "Question 10: Which of the following algorithms is used for sorting?",
        options: ["Dijkstra's algorithm", "Prim's algorithm", "Merge sort", "Kruskal's algorithm"],
        correct: "c"
    },
];

const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const [option_1, option_2, option_3, option_4] = [
    document.getElementById("option_1"),
    document.getElementById("option_2"),
    document.getElementById("option_3"),
    document.getElementById("option_4")
];
const submitBtn = document.getElementById("submit");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const closeBtn = document.querySelector(".close-btn");
const restartBtn = document.getElementById("restartBtn");

let currentQuiz = 0;
let score = 0;
const answers = Array(quizData.length).fill(null);

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    
    questionEl.innerHTML = currentQuizData.question;
    option_1.innerText = currentQuizData.options[0];
    option_2.innerText = currentQuizData.options[1];
    option_3.innerText = currentQuizData.options[2];
    option_4.innerText = currentQuizData.options[3];
    
    if (currentQuizData.code) {
        const codeEl = document.createElement('pre');
        codeEl.innerText = currentQuizData.code;
        questionEl.appendChild(codeEl);
    }
    
    if (answers[currentQuiz] !== null) {
        document.getElementById(answers[currentQuiz]).checked = true;
    }
    
    prevBtn.style.display = currentQuiz === 0 ? "none" : "inline-block";
    nextBtn.style.display = currentQuiz === quizData.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentQuiz === quizData.length - 1 ? "inline-block" : "none";
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

function saveAnswer() {
    const answer = getSelected();
    if (answer !== undefined) {
        answers[currentQuiz] = answer;
    }
}

function nextQuestion() {
    saveAnswer();
    if (currentQuiz < quizData.length - 1) {
        currentQuiz++;
        loadQuiz();
    }
}

function prevQuestion() {
    saveAnswer();
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
    }
}

function submitQuiz() {
    saveAnswer();
    score = 0;
    answers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
    resultText.innerText = ` Congratulations 🎊 🏆 You answered correctly ${score}/${quizData.length} questions.`;
    resultModal.style.display = "block";
}

function closeModal() {
    resultModal.style.display = "none";
}

function restartQuiz() {
    currentQuiz = 0;
    score = 0;
    answers.fill(null);
    loadQuiz();
    closeModal();
}

submitBtn.addEventListener("click", submitQuiz);
nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);
closeBtn.addEventListener("click", closeModal);
restartBtn.addEventListener("click", restartQuiz);
window.onclick = function(event) {
    if (event.target == resultModal) {
        closeModal();
    }
};

window.onload = loadQuiz;
