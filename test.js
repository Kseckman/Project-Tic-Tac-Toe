const gameBoard = document.querySelector('.gameboard')
const info = document.querySelector('.info')
const startCells = ['','','','','','','','','',]
info.textContent = 'X goes first'
let go = 'X'

function createBoard(){
    startCells.forEach((cell, index) => {
       const cellElement = document.createElement('div')
       cellElement.classList.add('square')
       cellElement.id = index
       cellElement.addEventListener('click', addGo)
       gameBoard.append(cellElement)
    })
}

createBoard()

function addGo(e){
    console.log('clicked', e.target.value)
    if(e.target.innerText === ''){
        const goDisplay = document.createElement('div')
        goDisplay.textContent = go
        e.target.append(goDisplay)
        go = go === 'X' ? 'O': 'X'
        info.innerText =`${go}'s turn`
        checkScore()
    }
}

function checkScore(){
    const allSquares = document.querySelectorAll('.square')
    console.log(allSquares)
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]  
    ]
    winningCombos.forEach(arr=>{
        const circleWin = arr.every(cell=> allSquares[cell].firstChild?.innerText === 'O') 
        if(circleWin){
            info.textContent = `Circle wins`
            allSquares.forEach(square => square.removeEventListener('click', addGo))
        }
    })
    winningCombos.forEach(arr=>{
        const XWin = arr.every(cell=> allSquares[cell].firstChild?.innerText === 'X') 
        if(XWin){
            info.textContent = `X wins`
            allSquares.forEach(square => square.removeEventListener('click', addGo))
        }
    })
}