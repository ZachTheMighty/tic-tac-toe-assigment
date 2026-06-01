function gameBoard() {
  const blocks = [];

  (() => {
    for (let i = 0; i < 9; i++)
      blocks.push(
        (() => {
          let state = "empty";
          const id = crypto.randomUUID();

          function setCross() {
            state = "cross";
          }

          function setNought() {
            state = "nought";
          }

          function emptyState() {
            state = "empty";
          }

          function getState() {
            return state;
          }

          function getId() {
            return id;
          }

          return {
            setCross,
            setNought,
            getState,
            getId,
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
    if (blocks[blockNum - 1].getState() === "empty") {
      blocks[blockNum - 1].setCross();
    }
  }

  function playNought(blockNum) {
    if (blocks[blockNum - 1].getState() === "empty") {
      blocks[blockNum - 1].setNought();
    }
  }

  function getBlocks() {
    return blocks;
  }

  function getMatrix() {
    return martrix;
  }

  function resetBoard() {
    blocks.forEach((block) => block.emptyState());
  }

  return { playCross, playNought, getBlocks, getMatrix, resetBoard };
}

function player(name, symbol, coinGuess) {
  this.name = name;
  this.symbol = symbol;
  this.coinGuess = coinGuess;
  let score = 0;
  let hasTurn = false;

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

  function getCoinGuess() {
    return coinGuess;
  }

  function toggleTurn() {
    hasTurn = !hasTurn;
  }

  function getTurn() {
    return hasTurn;
  }

  return {
    getName,
    incrementScore,
    getScore,
    getSymbol,
    toggleTurn,
    getTurn,
    getCoinGuess,
  };
}

function playRound(player1, player2, bestOfX) {
  const gameboard = gameBoard();
  const blockDivs = document.querySelectorAll(".gameboard > *");

  const nextButton = document.querySelector("div.gg + button");

  const randomNumber = Math.floor(Math.random() * 10) + 2;
  const coinToss = randomNumber % 2 === 0 ? "heads" : "tails";

  if (coinToss === player1.getCoinGuess()) player1.toggleTurn();

  (function roundOver() {
    for (let i = 0; i < 9; i++) {
      blockDivs[i].addEventListener("click", () => {
        if (!blockDivs[i].hasChildNodes()) {
          if (player1.getTurn()) {
            gameboard.playCross(i + 1);
            blockDivs[i].textContent = "X";
            blockDivs[i].classList.add("cross");

            player1.toggleTurn();

            if (winner()) {
              document.querySelector(".score-1").textContent =
                player1.getScore();
              document.querySelector(".score-2").textContent =
                player2.getScore();
              domDisplay().disableBlocks();

              if (
                player1.getScore() !== (bestOfX + 1) / 2 &&
                player2.getScore() !== (bestOfX + 1) / 2
              )
                nextButton.classList.remove("hide-button");
              else {
                document.querySelector(".gg").textContent = `${
                  player1.getScore() === (bestOfX + 1) / 2
                    ? `${player1.getName()} Wins`
                    : `${player2.getName()} Wins`
                }`;
                document.querySelector(".gg").classList.remove("hide-gg");
              }

              nextButton.addEventListener("click", () => {
                gameboard.resetBoard();
                domDisplay().resetDivBoard();
                domDisplay().enableBlocks();
                nextButton.classList.add("hide-button");

                nextButton.textContent = "Next Round";
              });
              return;
            }

            if (boardIsFull()) {
              nextButton.textContent = "tie";

              domDisplay().disableBlocks();

              if (
                player1.getScore() !== (bestOfX + 1) / 2 &&
                player2.getScore() !== (bestOfX + 1) / 2
              )
                nextButton.classList.remove("hide-button");
              else {
                document.querySelector(".gg").textContent = `${
                  player1.getScore() === (bestOfX + 1) / 2
                    ? `${player1.getName()} Wins`
                    : `${player2.getName()} Wins`
                }`;
                document.querySelector(".gg").classList.remove("hide-gg");
              }

              nextButton.addEventListener("click", () => {
                gameboard.resetBoard();
                domDisplay().resetDivBoard();
                domDisplay().enableBlocks();
                nextButton.classList.add("hide-button");

                nextButton.textContent = "Next Round";
              });
              return;
            }
          } else {
            gameboard.playNought(i + 1);
            blockDivs[i].textContent = "O";
            blockDivs[i].classList.add("nought");

            player1.toggleTurn();

            if (winner()) {
              document.querySelector(".score-1").textContent =
                player1.getScore();
              document.querySelector(".score-2").textContent =
                player2.getScore();
              domDisplay().disableBlocks();

              if (
                player1.getScore() !== (bestOfX + 1) / 2 &&
                player2.getScore() !== (bestOfX + 1) / 2
              )
                nextButton.classList.remove("hide-button");
              else {
                document.querySelector(".gg").textContent = `${
                  player1.getScore() === (bestOfX + 1) / 2
                    ? `${player1.getName()} Wins`
                    : `${player2.getName()} Wins`
                }`;
                document.querySelector(".gg").classList.remove("hide-gg");
              }

              nextButton.addEventListener("click", () => {
                gameboard.resetBoard();
                domDisplay().resetDivBoard();
                domDisplay().enableBlocks();
                nextButton.classList.add("hide-button");
                nextButton.textContent = "Next Round";
              });
              return;
            }
            if (boardIsFull()) {
              nextButton.textContent = "tie";

              domDisplay().disableBlocks();

              if (
                player1.getScore() !== (bestOfX + 1) / 2 &&
                player2.getScore() !== (bestOfX + 1) / 2
              )
                nextButton.classList.remove("hide-button");
              else {
                document.querySelector(".gg").textContent = `${
                  player1.getScore() === (bestOfX + 1) / 2
                    ? `${player1.getName()} Wins`
                    : `${player2.getName()} Wins`
                }`;
                document.querySelector(".gg").classList.remove("hide-gg");
              }

              nextButton.addEventListener("click", () => {
                gameboard.resetBoard();
                domDisplay().resetDivBoard();
                domDisplay().enableBlocks();
                nextButton.classList.add("hide-button");

                nextButton.textContent = "Next Round";
              });
              return;
            }
          }
        }
      });
    }
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

function domDisplay() {
  const blockDivs = document.querySelectorAll(".gameboard > div");

  function disableBlocks() {
    blockDivs.forEach((block) => block.classList.add("disabled-block"));
  }

  function enableBlocks() {
    blockDivs.forEach((block) => block.classList.remove("disabled-block"));
  }

  function resetDivBoard() {
    blockDivs.forEach((block) => {
      block.textContent = "";
      block.className = "";
    });
  }

  return { disableBlocks, enableBlocks, resetDivBoard };
}

function playTicTacToe(bestOfX) {
  const form = document.querySelector("form");
  let player1;
  let player2;
  let numOfFormSubmits = 0;

  form.addEventListener("submit", (event) => {
    numOfFormSubmits++;
    event.preventDefault();

    if (numOfFormSubmits === 1) {
      player1 = player(
        form.name.value,
        form.symbol.value,
        form.coinGuess.value,
      );

      document.querySelector(".player-1").classList.remove("hide-player");
      document.querySelector(".name-1").textContent = player1.getName();
      document.querySelector(".symbol-1").textContent = player1.getSymbol();
      document.querySelector(".score-1").textContent = "0";

      form.symbol[0].checked
        ? ((form.symbol[0].disabled = true), (form.symbol[0].checked = false))
        : ((form.symbol[1].disabled = true), (form.symbol[1].checked = false));

      form.coinGuess[0].checked
        ? ((form.coinGuess[0].disabled = true),
          (form.coinGuess[0].checked = false))
        : ((form.coinGuess[1].disabled = true),
          (form.coinGuess[1].checked = false));

      form.name.value = "";
      form.name.focus();
    }

    if (numOfFormSubmits === 2) {
      form.classList.add("hide-form");
      player2 = player(
        form.name.value,
        form.symbol.value,
        form.coinGuess.value,
      );

      document.querySelector(".player-2").classList.remove("hide-player");
      document.querySelector(".name-2").textContent = player2.getName();
      document.querySelector(".symbol-2").textContent = player2.getSymbol();
      document.querySelector(".score-2").textContent = "0";

      playRound(player1, player2, bestOfX);
    }
  });
}

playTicTacToe(3);
