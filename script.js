const player = (symbol, name) => {

    // function to set name
    const setName = () => {
        name = prompt(`Who will be ${symbol}?`);
        `${symbol}` == 'x' ? xName.textContent = name : null;
        `${symbol}` == 'o' ? oName.textContent = name : null;
        return name;
    }

    return {setName, name, symbol};
}

const game = (() => {

    // function to choose a square on click
    const chooseSquare = (e) => {
        //place an x or an o in the array and update the text of that square

        if(oTurn) {
            boardIndex[e.target.id] = `o`;
            console.log(`clicked index at ${e.target.id}, value is ${boardIndex[e.target.id]}`);
            e.target.textContent = `${o.symbol}`;
            roundText.innerHTML = `${x.name}'s turn (X)`;
            oTurn = false;
        } else if(!oTurn) {
            boardIndex[e.target.id] = 'x';
            console.log(typeof(e.target.id));
            console.log(`clicked index at ${e.target.id}, value is ${boardIndex[e.target.id]}`);
            e.target.textContent = `${x.symbol}`;
            roundText.innerHTML = `${o.name}'s turn (O)`;
            oTurn = true;
        }

        // after placing x or o, remove the event listener

        event.target.removeEventListener('click', chooseSquare);
    }

    // create a container for the game board - 600 x 600
    const drawBoard = (() => {
    const board = document.createElement('div');
    board.setAttribute('id', 'board');
    board.setAttribute('style', 'display: flex; flex-wrap: wrap; padding: 5px; justify-content: space-around; align-items: center; height: 600px; width: 600px; background-color: blue');
    body.appendChild(board);
    })();

    // after drawing a container, make game squares and index them 0-8 with an id
    const populateGameBoard = (() => {
        
        for(i = 0; i < 9; i++) {
            const boardSquare = document.createElement('div');
            boardSquare.setAttribute('id', `${i}`);
            boardSquare.setAttribute('class', 'boardSquare');
            board.appendChild(boardSquare);

            // add event listener to gameSquare
            boardSquare.addEventListener('click', chooseSquare);
        }

    })();

    // after drawing the page, initialize variables

    // create an index array for the board
    const boardIndex = [];

    // create x and o players
    const x = player('x');
    const o = player('o');
    
    // create a boolean for the turn. 1 = x
    let oTurn = false;
    
    // set the player names
    x.name = x.setName();
    o.name = o.setName();
    
    // initialize roundText - x's turn first
    roundText.innerHTML = `${x.name}'s turn (X)`;

})();