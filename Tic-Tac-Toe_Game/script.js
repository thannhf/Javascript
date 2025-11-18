let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartbtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];
//Player 'X' plays first
let xTurn = true;
let count = 0;

// Disable all buttons
const disabledButton = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
}

//enable all buttons (for new game and Restart)
const enableButtons = () => {
    btnRef.forEach(element => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};

//New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartbtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
})

//this function is executed when a player wins
const winFunction = (letter) => {
    disabledButton();

    if(letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

//Function for draw
const drawFunction = () => {
    disabledButton();
    msgRef.innerHTML = '&#x1F60E; <br> It\'s a Draw';
}

//win logic
const winChecker = () => {
    //loop through all win patterns
    for(let i of winningPattern) {
        let[element1, element2, element3] = [
            btnRef[i[0]].innerText, 
            btnRef[i[1]].innerText, 
            btnRef[i[2]].innerText,
        ];
        //check if elements are filled
        //3 empty elements are same and would give win as would
        if(element1 != "" && element2 != "" && element3 != ""){
            if(element1 == element2 && element2 == element3) {
                //if all 3 buttons have same values then pass the value to winFunction
                winFunction(element1);
            }
        }
    }
}

//Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if(xTurn) {
            xTurn = false;
            //display x
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //display Y
            element.innerText = "O";
            element.disabled = true;
        }
        //increment count on each click
        count += 1;
        if(count == 9) {
            //It's a draw since there are a total of 9 boxed
            drawFunction();
        } 
        //check for win on every click
        winChecker();
    });
});

//Enable Buttons and disable popup on page load
window.onload = enableButtons;