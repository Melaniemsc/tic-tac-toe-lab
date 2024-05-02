/*-------------------------------- Constants --------------------------------*/
const squares= document.querySelectorAll(".board .sqr");
const message = document.querySelector("#message")
const boardContainer = document.querySelector(".board")
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]  
]
/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
/*------------------------ Cached Element References ------------------------*/
const resetButton = document.createElement('button')
resetButton.innerText = "Reset"
resetButton.id= "Reset"


/*-------------------------------- Functions --------------------------------*/
function init(){
    board = [
        '','','',
        '','','',
        '','',''
    ];
    turn="X";
    winner=false;
    tie=false;
    render();
}
init()

function render(){
    updateBoard()
    updateMessage()
}

function updateBoard(){
    board.forEach((boardCell,boardCellIndex) => {
        if (boardCell=== "X"){
            squares[boardCellIndex].innerText = "X"
            squares[boardCellIndex].style.color = "red"
            squares[boardCellIndex].style.backgroundColor = "gainsboro"
        }else if (boardCell=== "O"){
            squares[boardCellIndex].innerText = "O"
            squares[boardCellIndex].style.color = "blue"
            squares[boardCellIndex].style.backgroundColor = "gainsboro"
        }else{
            squares[boardCellIndex].innerText = ""
        }
});
}

function updateMessage(){
    
    if (winner === false && tie===false ){
        message.innerText= `Its ${turn}'s turn`;
    } else if (winner === false && tie === true){
        message.innerText = "It's a tie";
    } else {
        message.innerText= `Congratulations ${turn}!!! you won`;
    }
}
function handleClick(event){
    const squareIndex = event.target.id
    if (board[squareIndex]=== "X" || board[squareIndex]=== "O" || winner){
        return
    }else{
        placePiece(squareIndex)
        checkForWinner()
        checkForTie()
        switchPlayerTurn()
        render()
    }
}
function placePiece(index){
    board[index] = turn;
}

function checkForWinner(){
    winningCombos.forEach(combo => {
        if (combo.every(index => board[index] !== '' && board[index] === board[combo[0]])) {
            winner = true;
            return
        }
    });
}
function checkForTie (){
    if (winner){
        return
    } else if (!board.some(cell => cell === '')){
        tie=true
        console.log(`tie${tie}`);
    }
}
function switchPlayerTurn () {
    if (winner) {
        return
    } else if (turn === "X"){
        turn = "O"
    } else {
        turn ="X"
    }
    }



/*----------------------------- Event Listeners -----------------------------*/
squares.forEach(square => {
    square.addEventListener('click',handleClick)
});
resetButton.addEventListener("click",init)
document.body.appendChild(resetButton)
