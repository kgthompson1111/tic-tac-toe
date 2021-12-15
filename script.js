const player = (symbol, name, score) => {

    // function to set name
    const setName = () => {
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

    // winner variable
    let winner = false;

    // game reset function
    const reset = () => {
        document.removeEventListener('mousedown', reset);
        winner = false;
        body.removeChild(board);
        
        // iterate through the board index and reset
        for(i = 0; i < 9; i++) {
            boardIndex[i] = null;
        }
        
        drawBoard();

    }

    // X win function
    const xWins = () => {
        roundText.innerHTML = `${x.name} wins the round! Click anywhere to reset the board`;
        x.score++;
        xScore.innerText = x.score;
        winner = true;
    }

    // O win function
    const oWins = () => {
        roundText.innerHTML = `${o.name} wins the round! Click anywhere to reset the board`;
        o.score++;
        oScore.innerText = o.score;
        winner = true;
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
            } else if(boardIndex[0] == 'O') {
                oWins();
            }
        // check horizontal winners
        } else if(boardIndex[0] != null && boardIndex[0] == boardIndex[1] && boardIndex[1] == boardIndex[2]) {
            if(boardIndex[0] == 'X') {
                xWins();
            } else if(boardIndex[0] == 'O') {
                oWins();
            }
        } else if(boardIndex[3] != null && boardIndex[3] == boardIndex[4] && boardIndex[4] == boardIndex[5]) {
            if(boardIndex[3] == 'X') {
                xWins();
            } else if(boardIndex[3] == 'O') {
                oWins();
            }
        } else if(boardIndex[6] != null && boardIndex[6] == boardIndex[7] && boardIndex[7] == boardIndex[8]) {
            if(boardIndex[6] == 'X') {
                xWins();
            } else if(boardIndex[6] == 'O') {
                oWins();
            }
        // check vertical winners
        } else if(boardIndex[0] != null && boardIndex[0] == boardIndex[3] && boardIndex[3] == boardIndex[6]) {
            if(boardIndex[0] == 'X') {
                xWins();
            } else if(boardIndex[0] == 'O') {
                oWins();
            }
        } else if(boardIndex[1] != null && boardIndex[1] == boardIndex[4] && boardIndex[4] == boardIndex[7]) {
            if(boardIndex[1] == 'X') {
                xWins();
            } else if(boardIndex[1] == 'O') {
                oWins();
            }
        } else if(boardIndex[2] != null && boardIndex[2] == boardIndex[5] && boardIndex[5] == boardIndex[8]) {
            if(boardIndex[2] == 'X') {
                xWins();
            } else if(boardIndex[2] == 'O') {
                oWins();
            }
        }

        if(winner) {
            // remove event listener
            const boardSquares = document.querySelectorAll('.boardSquare');
            boardSquares.forEach((div) => {
                div.removeEventListener('click', chooseSquare);
            });
        // add window reset event listener
        document.addEventListener('mousedown', reset);
        }
    }

    // function to choose a square on click
    const chooseSquare = (e) => {
        //place an x or an o in the array and update the text of that square

        if(boardIndex[e.target.id] == null) {
        if(oTurn) {
            boardIndex[e.target.id] = `O`;
            e.target.textContent = `${o.symbol}`;
            roundText.innerHTML = `${x.name}'s turn (X)`;
            checkWinner();
            oTurn = false;
        } else if(!oTurn) {
            boardIndex[e.target.id] = 'X';
            e.target.textContent = `${x.symbol}`;
            roundText.innerHTML = `${o.name}'s turn (O)`;
            checkWinner();
            oTurn = true;
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
        boardSquare.setAttribute('class', 'boardSquare');
        board.appendChild(boardSquare);

        // add event listener to gameSquare
        boardSquare.addEventListener('click', chooseSquare);
    }
    }

    drawBoard();

    // set the player names
    x.name = x.setName();
    o.name = o.setName();

    // initialize roundText - x's turn first
    roundText.innerHTML = `${x.name}'s turn (X)`;

})();