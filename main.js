// a place to store the game board
// how to store information in a 2d matrix
// factory for making players
// function that keeps track of player turn
// function that places a mark for a player
// function to check game over after each round
// look into array matrix
//read up on factory functions/ iife

//create and render board use iife
const Gameboard = (()=>{
    let gameboard = ['','','','','','','','','']



    //render loop
    //add event listenter to each box
    const createBoard= ()=>{
        const board = document.querySelector('.gameboard')
        gameboard.forEach((box, index)=>{
            const divEl = document.createElement('div')
            divEl.classList.add('square')
            divEl.id = index
            divEl.textContent = `${box}`
            divEl.addEventListener('click', Game.handleClick)
            board.append(divEl)
        })
    }
    
    //how to update
    const update = (index, mark)=>{
        gameboard[index] = mark
    }

    //return the board
    const getGameboard = ()=> gameboard
    return {
        createBoard,
        getGameboard,
        update
    }

})()

//player factory
const createPlayer = (name, mark)=>{
    return {name, mark}
}

//game logic
const Game =(()=>{
    //player logic
    let players = []
    let currentPlayer;
    let gameOver;
    console.log(currentPlayer)
    //game start
    const start = ()=>{
        const playerOne = document.querySelector('#player1')
        const playerTwo = document.querySelector('#player2')
        players = [
            createPlayer(playerOne.value = 'Player One', 'X'),
            createPlayer(playerTwo.value = 'Player Two', 'O')
        ]
        document.querySelector('#player1-display').textContent = playerOne.value
        document.querySelector('#player2-display').textContent = playerTwo.value
        currentPlayer = 0;
        gameOver= false;
        console.log(currentPlayer)
        Gameboard.createBoard()
    }
    //click events . here we update, check for win, switch player
    const handleClick = (e)=>{
        if(gameOver) return
        let index = +e.target.id
        if(Gameboard.getGameboard()[index] !== '') return
        e.target.textContent = players[currentPlayer].mark

        Gameboard.update(index, players[currentPlayer].mark)

        if(checkForWin(Gameboard.getGameboard(), players[currentPlayer].mark)){
            gameOver = true;
            const results = document.querySelector('.results-display')
            results.textContent = `${players[currentPlayer].name} has won!`
        } else if(checkForTie(Gameboard.getGameboard())){
            gameOver = true;
            const results = document.querySelector('.results-display')
            results.textContent = `It's a tie!`
        }
        
        currentPlayer = currentPlayer === 0? 1 : 0
        console.log(currentPlayer, index, players[currentPlayer].mark)
    }
    
    //restart
    return {
        start,
        handleClick
    }
})()

//winning logic
const checkForWin = (board)=>{
    const winningCombinations= [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]  
        ]
    for(let i=0; i < winningCombinations.length; i++){
        const [a,b,c] = winningCombinations[i]
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true
        }
    }
    return false
}

const checkForTie = (board)=>{
   return board.every(cell=> cell !== '')
}

//click events for buttons
const resetBtn = document.querySelector('#restart-button')
resetBtn.addEventListener('click',()=>{
    // Game.reset()
})

const startBtn = document.querySelector('#start-button')
startBtn.addEventListener('click',()=>{
    Game.start()
})