// a place to store the game board
// factory for making players
// function that keeps track of player turn
// function that places a mark for a player
// function to check game over after each round
// read up on factory functions/ iife
// create and render board use iife
const Gameboard = (()=>{
    let gameboard = ['','','','','','','','',''];
    const createBoard= ()=>{
        const board = document.querySelector('.gameboard')
        board.classList.toggle('background')
        gameboard.forEach((box, index)=>{
            const divEl = document.createElement('div');
            divEl.classList.add('square');
            divEl.id = index;
            divEl.textContent = `${box}`;
            divEl.addEventListener('click', Game.handleClick);
            board.append(divEl);
        })
    }

    const update = (index, mark)=>{
        gameboard[index] = mark;
    }

    const getGameboard = ()=> gameboard
    return {
        createBoard,
        getGameboard,
        update
    }
})()

const createPlayer = (name, mark)=>{
    return {name, mark}
}

const Game =(()=>{
    let players = [];
    let currentPlayer;
    let gameOver;

    const start = ()=>{
        const playerOne = document.querySelector('#player1')
        const playerTwo = document.querySelector('#player2')
        players = [
            createPlayer(playerOne.value = 'Player One', 'X'),
            createPlayer(playerTwo.value = 'Player Two', 'O')
        ]
        document.querySelector('#player1-display').textContent = playerOne.value;
        document.querySelector('#player2-display').textContent = playerTwo.value;
        currentPlayer = 0;
        gameOver= false;
        if(!document.querySelector('.square')) return Gameboard.createBoard();
    }

    const handleClick = (e)=>{
        if(gameOver) return;
        let index = +e.target.id;
        if(Gameboard.getGameboard()[index] !== '') return;
        e.target.textContent = players[currentPlayer].mark;
        Gameboard.update(index, players[currentPlayer].mark);

        if(checkForWin(Gameboard.getGameboard(), players[currentPlayer].mark)){
            gameOver = true;
            const results = document.querySelector('.results-display')
            results.textContent = `${players[currentPlayer].name} has won!`
        } else if(checkForTie(Gameboard.getGameboard())){
            gameOver = true;
            const results = document.querySelector('.results-display')
            results.textContent = `It's a tie!`
        }
        
        currentPlayer = currentPlayer === 0? 1 : 0;
    }
    
    const reset = ()=>{
        gameOver = false;
        const squares = document.querySelectorAll('.square')
        for(let i=0; i < squares.length; i++){
            Gameboard.update(i, '')
            squares[i].textContent = '';
        }
        const results = document.querySelector('.results-display')
        results.textContent = '';
    }
    return {
        start,
        handleClick,
        reset
    }
})()

const checkForWin = (board)=>{
    const winningCombinations= [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]  
        ]
    for(let i=0; i < winningCombinations.length; i++){
        const [a,b,c] = winningCombinations[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }
    return false;
}

const checkForTie = (board)=>{
   return board.every(cell=> cell !== '')
}

const resetBtn = document.querySelector('#restart-button')
resetBtn.addEventListener('click',()=>{
    Game.reset()
})

const startBtn = document.querySelector('#start-button')
startBtn.addEventListener('click',()=>{
    Game.start()
})