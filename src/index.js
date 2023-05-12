const Player = (name,mark) => ({name, mark})

const gameBoard = (function(){
    let gameArray = ['','','','','','','','',''];
    
    function getIndex(index){
        return gameArray[index];
    }

    function addToArray(mark, index){

        gameArray[index] = mark;
        return gameArray;
    }

    function clearArray(){
        gameArray.forEach((mark,index)=>{
            gameArray[index] = ""
        })
    }

    function checkFullArray(){
        return gameArray.every(index => index !== '')
    }

    return {
       getIndex,
       addToArray,
       clearArray,
       checkFullArray
    }
})()

const displayController = (function(){
    
    let boxes = document.querySelectorAll('.box');
    let gameMessage = document.querySelector('.gameMessage');

    function clickBox(box, mark){
        box.textContent = mark;
    }

    function clearBoxes(){
        boxes.forEach(box=>{
            box.textContent = '';
        })
    }

    function displayGameMessage(msg){
        gameMessage.textContent = msg;
    }

    return {
        boxes,
        clickBox,
        clearBoxes,
        displayGameMessage
    }
})()

const gameController = (function(){
    let startBtn = document.querySelector('#startBtn');
    let restartBtn = document.querySelector('#restartBtn');
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2','O');
    let currentPlayer = player1;
    
    function startGame(){
    
        // console.log('Game Started');
        displayController.displayGameMessage("Player 1's turn");
        startBtn.style.display = 'none';
        restartBtn.style.display = 'block';
        
        restartBtn.addEventListener('click', ()=>{
            restartGame();
        });

        displayController.boxes.forEach((box, index) =>{
            box.addEventListener('click', ()=>{
                // console.log(currentPlayer);
                if (gameBoard.getIndex(index) === '' && !checkWinner()){
                    gameBoard.addToArray(currentPlayer.mark, index);
                    displayController.clickBox(box, currentPlayer.mark);

                    if (checkWinner()){
                        displayController.displayGameMessage(`${currentPlayer.name} wins!`);
                        // console.log(`${currentPlayer.name} wins!`);
                    }else if (gameBoard.checkFullArray()){
                            displayController.displayGameMessage(`The game ended in a draw!`);
                            // console.log('DRAW!');
                        }else{
                            currentPlayer = nextTurn();
                            displayController.displayGameMessage(`${currentPlayer.name}'s turn`);
                        }
                    
                }
                
            })
        })
    }

    function nextTurn(){
        currentPlayer = currentPlayer === player1 ? player2 : player1
        return currentPlayer;
    }

    function restartGame(){
        gameBoard.clearArray();
        displayController.clearBoxes();
        displayController.displayGameMessage("Player 1's turn");
        currentPlayer = player1;
    }

    let winPossibilities = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    function checkWinner(){
        return winPossibilities.some(possibility => 
            possibility.every(index => gameBoard.getIndex(index) === currentPlayer.mark)
        )
    }

    return {
        startBtn,
        startGame,
    }
})()

gameController.startBtn.addEventListener('click', ()=>{
    gameController.startGame();
})

