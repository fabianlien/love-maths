
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");

});


/**
 * The main game "loop" called when the script is first loaded
 * and after the user's answer has been processed.
 */
function runGame(gameType) {
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2)
    } else if (gameType === "multiply"){
        displayMultiplyQuestion(num1, num2)
    } else if (gameType === "subtract"){
        displaySubtractQuestion(num1, num2)
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}


/**
 * Checks the Answer against the first element of the returned array from calculateCorrectAnswer()
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}.`);
        incrementWrongAnswer();
    }   
    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (num1 and num2) and the operator (algebra sign)
 * from the DOM and returns there sum.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;
    
    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented Operator: ${operator}`);
        throw `Unimplemented Operator: ${operator}. Aborting!`;
    }
}

/**
 * gets the current score from the DOM and increments by 1.
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    let newScore = oldScore + 1;
    document.getElementById("score").innerText = newScore
}

/**
 * gets the current score of incorrecet answers from the DOM and increments by 1.
 */
function incrementWrongAnswer() {
    let oldIncorrect = parseInt(document.getElementById("incorrect").innerText);
    let newIncorrect = oldIncorrect + 1;
    document.getElementById("incorrect").innerText = newIncorrect
}


/**
 * displays the addition game question to the user
 */
function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}



function displaySubtractQuestion(operand1, operand2) {
    let minuend = document.getElementById("operand1").textContent = operand1;
    let subtrahend = document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
    if (minuend < subtrahend) {
        runGame("subtract");
    }
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion() {

}