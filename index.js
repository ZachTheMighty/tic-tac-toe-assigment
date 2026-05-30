function gameBoard() {
  const blocks = [];

  (() => {
    for (let i = 0; i < 9; i++)
      blocks.push(
        (() => {
          let state = "empty";

          function setCross() {
            state = "cross";
            displayBoard();
          }

          function setNought() {
            state = "nought";
            displayBoard();
          }

          function emptyState() {
            state = "empty";
            displayBoard();
          }

          function getState() {
            return state;
          }

          return {
            setCross,
            setNought,
            getState,
            emptyState,
          };
        })(),
      );
  })();

  const martrix = [
    [blocks[0], blocks[1], blocks[2]],
    [blocks[3], blocks[4], blocks[5]],
    [blocks[6], blocks[7], blocks[8]],
  ];

  function playCross(blockNum) {
    if (blocks[blockNum - 1].getState() === "empty")
      blocks[blockNum - 1].setCross();
  }

  function playNought(blockNum) {
    if (blocks[blockNum - 1].getState() === "empty")
      blocks[blockNum - 1].setNought();
  }

  function displayBoard() {
    for (i = 0; i < 9; i++) {
      const state = blocks[i].getState();

      if (state === "empty") process.stdout.write("*");

      if (state === "cross") process.stdout.write("X");

      if (state === "nought") process.stdout.write("O");

      if ((i !== 0 && i === 2) || i === 5 || i === 8)
        process.stdout.write("\n");
    }
    console.log();
  }

  function getBlocks() {
    return blocks;
  }

  function getMatrix() {
    return martrix;
  }

  return { playCross, playNought, displayBoard, getBlocks, getMatrix };
}

function player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
  let score = 0;

  function getName() {
    return name;
  }

  function incrementScore() {
    score++;
  }

  function getScore() {
    return score;
  }

  function getSymbol() {
    return symbol;
  }

  return { getName, incrementScore, getScore, getSymbol };
}

function playRound(player1, player2) {
  const gameboard = gameBoard();

  (function roundOver() {
    for (let i = 0; i < 9; i++) {
      gameboard.playCross(i + 2);
      if (winner() || boardIsFull()) break;
      gameboard.playNought(i + 1);
      if (winner() || boardIsFull()) break;
    }
    console.log(player1.getScore());
    console.log(player2.getScore());
  })();

  function boardIsFull() {
    let res = 0;
    gameboard.getBlocks().forEach((block) => {
      if (block.getState() === "empty") res++;
    });
    if (res === 0) return true;
    return false;
  }

  function winner() {
    const martrix = gameboard.getMatrix();
    let resNoughtDownDia = 0;
    let resCrossDownDia = 0;
    let resNoughtUpDia = 0;
    let resCrossUpDia = 0;

    for (let i = 0; i < martrix.length; i++) {
      let resCrossRow = 0;
      let resCrossCol = 0;
      let resNoughtRow = 0;
      let resNoughtCol = 0;

      for (let j = 0; j < martrix[i].length; j++) {
        if (martrix[i][j].getState() === "cross") resCrossRow++;
        if (martrix[i][j].getState() === "nought") resNoughtRow++;

        if (martrix[j][i].getState() === "cross") resCrossCol++;
        if (martrix[j][i].getState() === "nought") resNoughtCol++;

        if (i === j) {
          if (martrix[i][j].getState() === "cross") resCrossDownDia++;
          if (martrix[i][j].getState() === "nought") resNoughtDownDia++;
        }

        if ((i === 1 && j === 1) || Math.abs(i - j) === 2) {
          if (martrix[i][j].getState() === "cross") resCrossUpDia++;
          if (martrix[i][j].getState() === "nought") resNoughtUpDia++;
        }

        if (resCrossRow === 3 || resNoughtRow === 3) {
          if (resCrossRow === 3) {
            if (player1.getSymbol() === "cross") player1.incrementScore();
            if (player2.getSymbol() === "cross") player2.incrementScore();
          }

          if (resNoughtRow === 3) {
            if (player1.getSymbol() === "nought") player1.incrementScore();
            if (player2.getSymbol() === "nought") player2.incrementScore();
          }
          return true;
        }

        if (resCrossCol === 3 || resNoughtCol === 3) {
          if (resCrossCol === 3) {
            if (player1.getSymbol() === "cross") player1.incrementScore();
            if (player2.getSymbol() === "cross") player2.incrementScore();
          }

          if (resNoughtCol === 3) {
            if (player1.getSymbol() === "nought") player1.incrementScore();
            if (player2.getSymbol() === "nought") player2.incrementScore();
          }
          return true;
        }

        if (
          resCrossDownDia === 3 ||
          resNoughtDownDia === 3 ||
          resCrossUpDia === 3 ||
          resNoughtUpDia === 3
        ) {
          if (resCrossDownDia === 3 || resCrossUpDia === 3) {
            if (player1.getSymbol() === "cross") player1.incrementScore();
            if (player2.getSymbol() === "cross") player2.incrementScore();
          }

          if (resNoughtDownDia === 3 || resNoughtUpDia === 3) {
            if (player1.getSymbol() === "nought") player1.incrementScore();
            if (player2.getSymbol() === "nought") player2.incrementScore();
          }
          return true;
        }
      }
    }
    return false;
  }
}

function playTicTacToe(numOfRounds) {
  const player1 = player("bitch", "cross");
  const player2 = player("nigga", "nought");

  while (player1.getScore() < numOfRounds && player2.getScore() < numOfRounds) {
    playRound(player1, player2);
  }

  return (function declareWinner() {
    return player1.getScore() === numOfRounds
      ? "player 1 wins"
      : "player 2 wins";
  })();
}

console.log(playTicTacToe(3));
