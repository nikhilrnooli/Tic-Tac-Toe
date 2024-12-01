let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;     //playerX, playerO

//2D Array
let winPatterns = 
[[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8]
];  


//Reset Game Function
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");    
}


boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        
        checkWinner();
    
    });
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
  
const showWinner = (winner) =>  {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let isDraw = true; //Assume it is a draw until proven

    for(let pattern of winPatterns) { 
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
                return; //Exit function if a winner is found
            }
        }
    }


    //Check if all boxes are filled
    boxes.forEach((box) => {
        if(box.innerText === "") {
            isDraw = false; //Not a draw if any box is empty
        }
    });

    if (isDraw) {
        showDraw();
    }

};

const showDraw = () => {
    msg.innerText = "Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
