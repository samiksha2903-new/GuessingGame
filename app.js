const body = document.querySelector("body");
const themeBtn = document.querySelector(".theme-btn");
const card = document.querySelector(".card");
const inputNum = document.querySelector(".input-num"); 
const text = document.querySelector(".collection");
const showResult = document.querySelector(".show-result");
const guessBtn = document.querySelector(".guess");
const BtnSet = document.querySelector(".resetButton");
const quitBtn = document.querySelector(".quitBtn");
let randomNum = Math.floor(Math.random() * 100) + 1;
let mode = "light";
let count = 1;
let resetBtn;

themeBtn.addEventListener("click", Theme);

function Theme() {
    if(mode === "light") {
        mode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
        themeBtn.textContent = "☀️ Theme";
    } else {
        mode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
        themeBtn.textContent = "🌙 Theme";
    }
};

function checkGuess() {
    let userInp = Number(inputNum.value);
    
    if(!inputNum.value || userInp < 1 || userInp > 100) {
        showResult.classList.remove("alert-success", "alert-danger", "alert-warning");
        showResult.classList.add("alert-warning");
        showResult.textContent = "Please enter a number between 1 and 100!";
        return;
    }

    if(count === 1) {
        text.textContent = "Previous Guesses: ";
    }

    text.textContent = text.textContent + userInp + " ";

    if(userInp === randomNum) {
      showResult.classList.remove("alert-warning", "alert-danger");
      showResult.classList.add("alert-success");
      showResult.textContent = "🎉 Congratulations! You guessed it right in " + count + " tries!";
      gameOver();
    } else if(count === 10) {
        showResult.classList.remove("alert-warning", "alert-success");
        showResult.classList.add("alert-danger");
        showResult.textContent = "😢 Game Over! The number was " + randomNum;
        gameOver();
    } else {
        showResult.classList.remove("alert-success", "alert-danger");
        if(userInp > randomNum) {
            showResult.classList.add("alert-warning");
            showResult.textContent = "📈 Too High! Try a lower number. (" + (10 - count) + " tries left)"; 

        } else if(userInp < randomNum) {
            showResult.classList.add("alert-warning");
            showResult.textContent = "📉 Too Low! Try a higher number. (" + (10 - count) + " tries left)";
        }
    }

    count++;
    inputNum.value = "";
    inputNum.focus();

}

function gameOver() {
    inputNum.disabled = true;
    guessBtn.disabled = true;

    resetBtn = document.createElement("button");
    BtnSet.appendChild(resetBtn);
    resetBtn.classList.add("btn", "btn-primary");
    resetBtn.textContent = "Play Again";
    resetBtn.addEventListener("click", playAgain);
}

function playAgain() {
    inputNum.disabled = false;
    guessBtn.disabled = false;
    inputNum.value = "";
    showResult.textContent = "";
    showResult.classList.remove("alert-success", "alert-danger", "alert-warning");
    if(resetBtn && resetBtn.parentElement) {
        resetBtn.remove();
        resetBtn = null;
    }
    text.textContent = "Welcome to the Game!";
    inputNum.focus();
    randomNum = Math.floor(Math.random() * 100) + 1;
    count = 1;
}

function quitGame() {   
    inputNum.value = "";
    inputNum.disabled = false;
    guessBtn.disabled = false;
    showResult.textContent = "";
    showResult.classList.remove("alert-success", "alert-danger", "alert-warning");
    text.textContent = "Welcome to the Game!";
    if(resetBtn && resetBtn.parentElement) {
        resetBtn.remove();
        resetBtn = null;
    }
    inputNum.focus();
    randomNum = Math.floor(Math.random() * 100) + 1;
    count = 1; 
}

quitBtn.addEventListener("click", quitGame);

guessBtn.addEventListener("click", checkGuess);

// Allow pressing Enter to submit guess
inputNum.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});