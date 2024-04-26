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
        themeBtn.classList.add("light");
        card.classList.add("light");
    } else {
        mode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
    }
};

function checkGuess() {
    let userInp = Number(inputNum.value);
    console.log(randomNum);

    if(count === 1) {
        text.textContent = "Previous Numbers: ";
        alert("You have only 9 tries left");
    }

    text.textContent = text.textContent + userInp + " ";

    if(userInp === randomNum) {
      showResult.classList.add("alert-success");
      showResult.textContent = "Congratulations! You Guess it Right";
      gameOver();
    } else if(count === 10) {
        console.log("User input:", userInp);
        console.log("Random number:", randomNum);
        showResult.classList.add("alert-danger");
        showResult.textContent = "!!! GAME OVER !!!";
        gameOver();
    } else {

        if(userInp > randomNum) {
            showResult.classList.add("alert-warning");
            showResult.textContent = "Your guess is too High!"; 

        } else if(userInp < randomNum) {
            showResult.classList.add("alert-warning");
            showResult.textContent = "Your guess is too Low!";
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
    try {
        inputNum.disabled = false;
        guessBtn.disabled = false;

    inputNum.value = "";
    showResult.textContent = "";
    showResult.classList.remove("alert-success", "alert-danger", "alert-warning");
    BtnSet.removeChild(resetBtn);
    text.textContent = "Welcome to the Game!";
    inputNum.focus();
    randomNum = Math.floor(Math.random() * 100) + 1;
    count = 1;
    } catch(err) {
        console.log(`error is : ${err}`);
    };
}

function quitGame() {   
    inputNum.value = "";
    showResult.textContent = "";
    showResult.classList.remove("alert-success", "alert-danger", "alert-warning");
    text.textContent = "Welcome to the Game!";
    if(resetBtn) {
    resetBtn.parentElement.remove();
    }
    showResult.classList.remove("alert-warning");
    inputNum.focus();
    randomNum = Math.floor(Math.random() * 100) + 1;
    count = 1; 
}

quitBtn.addEventListener("click", quitGame);

guessBtn.addEventListener("click", checkGuess);