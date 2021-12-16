const player = (symbol, name, score, isComputer) => {

    // function to set name
    const setName = (name) => {
        name = prompt(`Who will be ${symbol}?`);

        //check for blank (invalid) name
        while(name == "") {
        name = prompt(`Please enter a valid name`);
        }

        `${symbol}` == 'X' ? xName.textContent = name : null;
        `${symbol}` == 'O' ? oName.textContent = name : null;
        return name;
    }

    return {setName, name, symbol, score};
}

const game = (() => {

    // after drawing the page, initialize variables
    // create an index array for the board
    const boardIndex = [];

    // create x and o players
    const x = player('X');
    const o = player('O');
    
    // create a boolean for the turn. 1 = x
    let oTurn = false;

    // set player scores to 0
    x.score = 0;
    o.score = 0;

    // winner and draw variable
    let winner = false;
    let draw = false;

    // game reset function
    const reset = () => {
        document.removeEventListener('mousedown', reset);
        winner = false;
        draw = false;
        body.removeChild(board);
        oTurn = false;
        
        // iterate through the board index and reset
        for(i = 0; i < 9; i++) {
            boardIndex[i] = null;
        }
        
        drawBoard();

    }

    // freeze the board for reset
    const resetMode = () => {
        // remove event listener
        const boardSquares = document.querySelectorAll('.boardSquare');
        boardSquares.forEach((div) => {
        div.removeEventListener('click', chooseSquare);
        });
        // add window reset event listener
        document.addEventListener('mousedown', reset);

    }

    // X win function
    const xWins = () => {
        roundText.innerHTML = `${x.name} wins the round! Click anywhere to reset the board`;
        x.score++;
        xScore.innerText = x.score;
        winner = true;
        oTurn = false;
    }

    // O win function
    const oWins = () => {
        roundText.innerHTML = `${o.name} wins the round! Click anywhere to reset the board`;
        o.score++;
        oScore.innerText = o.score;
        winner = true;
        oTurn = false;
    }

    const tie = () => {
        roundText.innerHTML = `It's a draw! Click anywhere to reset the board`;
        oTurn = false;
        draw = true;
    }

    // function to check winner
    const checkWinner = () => {
            
        // check diagonal winners
        if(boardIndex[0] != null && boardIndex[0] == boardIndex[4] && boardIndex[4] == boardIndex[8])   {
            if(boardIndex[0] == 'X') {
                xWins();
            } else if(boardIndex[0] == 'O') {
                oWins();
            }
        } else if(boardIndex[2] != null && boardIndex[2] == boardIndex[4] && boardIndex[4] == boardIndex[6]) {
            if(boardIndex[2] == 'X') {
                xWins();
            } else {
                oWins();
            }
        // check horizontal winners
        } else if(boardIndex[0] != null && boardIndex[0] == boardIndex[1] && boardIndex[1] == boardIndex[2]) {
            if(boardIndex[0] == 'X') {
                xWins();
            } else {
                oWins();
            }
        } else if(boardIndex[3] != null && boardIndex[3] == boardIndex[4] && boardIndex[4] == boardIndex[5]) {
            if(boardIndex[3] == 'X') {
                xWins();
            } else {
                oWins();
            }
        } else if(boardIndex[6] != null && boardIndex[6] == boardIndex[7] && boardIndex[7] == boardIndex[8]) {
            if(boardIndex[6] == 'X') {
                xWins();
            } else {
                oWins();
            }
        // check vertical winners
        } else if(boardIndex[0] != null && boardIndex[0] == boardIndex[3] && boardIndex[3] == boardIndex[6]) {
            if(boardIndex[0] == 'X') {
                xWins();
            } else {
                oWins();
            }
        } else if(boardIndex[1] != null && boardIndex[1] == boardIndex[4] && boardIndex[4] == boardIndex[7]) {
            if(boardIndex[1] == 'X') {
                xWins();
            } else {
                oWins();
            }
        } else if(boardIndex[2] != null && boardIndex[2] == boardIndex[5] && boardIndex[5] == boardIndex[8]) {
            if(boardIndex[2] == 'X') {
                xWins();
            } else {
                oWins();
            }
        }

        if(!winner) {
            for(i = 0; i < 10; i++) {
                if(boardIndex[i] == null && i < 9) {
                    return;
                }
                if(i == 9) {
                    tie();
                }
            }
        }

        if(winner || tie) {
            resetMode();
        }

        // if there's no winner, check for a draw
    }

    const computerPicks = () => {
            // pick a random spot
            let picker = Math.floor(Math.random() * 8);
            // if it's an occupied spot, keep pickin'
            while(boardIndex[picker] != null) {
                picker = Math.floor(Math.random() * 9);
            }
            // if it's empty, put a 0 in the box and the array
            if(boardIndex[picker] == null) {
                boardIndex[picker] = 'O';
                const computerSelection = document.getElementById(`${picker}`);
                computerSelection.textContent = `${o.symbol}`;
                computerSelection.classList.remove('freeSquare');
                computerSelection.style.backgroundColor = "grey";
            }
            // after the computer picks check for a winner
            checkWinner();
            if(winner) { return };
            console.log(boardIndex);
            
            // if no winner, set the round text and set oTurn to false
            roundText.innerHTML = `${x.name}'s turn (X)`;
            oTurn = false;
        }

    // function to choose a square on click
    const chooseSquare = (e) => {
        //place an x or an o in the array and update the text of that square

            if(boardIndex[e.target.id] == null) {
            if(!oTurn) {
                boardIndex[e.target.id] = 'X';
                e.target.textContent = `${x.symbol}`;
                e.target.style.backgroundColor = "lightgreen";
                e.target.classList.remove('freeSquare');
                checkWinner();
                oTurn = true;
                
                // computer Picks
                if(!winner && !draw && o.isAI) {
                    roundText.innerHTML = `${o.name} is thinking...`;
                    let sleepyTime = Math.floor(Math.random() * 1000);
                    setTimeout(() => { computerPicks(); }, sleepyTime);
                    checkWinner();
                }
                 if(!o.isAI && !winner && !draw) {
                    roundText.innerHTML = `${o.name}'s turn (O)`;
                 }
            } else if(oTurn && !winner && !draw && !o.isAI) {
                boardIndex[e.target.id] = `O`;
                e.target.textContent = `${o.symbol}`;
                e.target.classList.remove('freeSquare');
                e.target.style.backgroundColor = "salmon";
                roundText.innerHTML = `${x.name}'s turn (X)`;
                checkWinner();
                oTurn = false;
            }
            
            // do nothing if spot is full
            } else if(boardIndex[e.target.id] != null) {
                return;
            }
    }

    // create a container for the game board - 600 x 600
    const drawBoard = () => {
    const board = document.createElement('div');
    board.setAttribute('id', 'board');
    body.appendChild(board);

    // after drawing a container, make game squares and index them 0-8 with an id
    for(i = 0; i < 9; i++) {
        const boardSquare = document.createElement('div');
        boardSquare.setAttribute('id', `${i}`);
        boardSquare.classList.add('boardSquare', 'freeSquare');
        board.appendChild(boardSquare);

        // add event listener to gameSquare
        boardSquare.addEventListener('click', chooseSquare);
    }
    roundText.innerHTML = `${x.name}'s turn (X)`;
    }

    const playMode = () => {
        // round selector box container
        roundText.innerText = "Choose a game mode";
        const buttonBox = document.createElement('div');
        buttonBox.setAttribute('style', 'display: flex; justify-content: space-between; height: 100px; width: 400px;');

        body.appendChild(buttonBox);

        // create and append player and computer buttons
        const playerButton = document.createElement('div');
        playerButton.classList.add('button');
        playerButton.innerText = "Human";
        buttonBox.appendChild(playerButton);

        const computerButton = document.createElement('div');
        computerButton.classList.add('button');
        computerButton.innerText = "Computer";
        buttonBox.appendChild(computerButton);

        //add event listeners
        playerButton.addEventListener('click', () => {
            // remove selector
            body.removeChild(buttonBox);

            // 2 players - set name and initialize the game
            x.name = x.setName();
            o.name = o.setName();
            roundText.innerHTML = `${x.name}'s turn (X)`;
            drawBoard();
        });

        computerButton.addEventListener('click', () => {
            // remove selector
            body.removeChild(buttonBox);
            o.isAI = true;
            console.log(o.isAI);
            x.name = x.setName();
            o.name = "Computer";
            oName.textContent = o.name;
            drawBoard();
        });
    }

    playMode();



})();