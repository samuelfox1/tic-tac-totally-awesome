// const allBoxeArr = document.querySelectorAll('.box')
const boardEl = document.getElementById('board')
const boxesEl = document.getElementsByClassName("box");
const playerEl = document.getElementById('player')
// TODO: finish algorithms for finding a winner

// TODO: add ability to dynamically create a board at a specific size
const boardSize = 3

let user = {
    a: { name: 'player-0', mark: 0 },
    b: { name: 'player-1', mark: 1 },
}
let playerHasWon = ''


const boardMatrix = []

const eraseBoard = () => {
    const boxElArr = document.querySelectorAll('.box')
    boxElArr.forEach(box => box.innerText = '')
    boardMatrix.length = 0
}
const buildNewBoard = () => {
    const arr = ['', '', '']
    for (let i = 0; i < boardSize; i++) {
        boardMatrix.push([...arr])
    }
}

const resetBoard = () => {
    eraseBoard()
    buildNewBoard()
    playerHasWon = ''
    playerEl.textContent = `${currentUser.name}'s turn`
}

let currentUser = user.a

const updatePlayerName = () => {
    if (playerHasWon) return
    playerEl.textContent = `${currentUser.name}'s turn`
}
const switchUser = () => {
    currentUser = currentUser === user.a ? user.b : user.a
    updatePlayerName()
}

const declareWinner = (mark) => {
    const winner = mark === user.a.mark ? user.a : user.b
    playerHasWon = winner.name
    playerEl.textContent = `${winner.name} wins!`
}

const checkForWinner = (array, mark) => {
    const filteredRow = array.filter(box => box === mark)
    if (filteredRow.length === array.length) {
        console.log(filteredRow)
        console.log(array)
        declareWinner(mark)
    }
}

const checkRows = (array, mark) => {
    array.map((row, idx) => {
        console.log(row)
        checkForWinner(row, mark)
    })
}
const checkCols = (array, mark) => {
    for (let i = 0; i < array.length; i++) {
        const colArr = []
        array.map(row => colArr.push(row[i]))
        console.log(colArr)
        checkForWinner(colArr, mark)
    }
}
const checkDiag = (array, mark) => {
    for (let i = 0; i < array.length; i++) {
        const diagArrA = []
        const diagArrB = []
        let j = array.length - 1
        array.map((row, idx) => {
            diagArrA.push(row[idx])
            diagArrB.push(row[j])
            j--
        })
        checkForWinner(diagArrA, mark)
        checkForWinner(diagArrB, mark)
    }
}


const checkAllOptionsForWinner = (mark) => {
    checkRows(boardMatrix, mark)
    checkCols(boardMatrix, mark)
    checkDiag(boardMatrix, mark)
}

const handleClick = (e) => {
    if (playerHasWon) resetBoard()
    else {
        console.clear()
        let mark = currentUser.mark
        e.target.innerText = mark
        const [a, b] = e.target.dataset.idx.split('-')
        boardMatrix[a][b] = mark
        checkAllOptionsForWinner(mark)
        switchUser()
    }
}

const init = () => {
    buildNewBoard()
    updatePlayerName()
    boardEl.addEventListener('click', handleClick)
}

init()