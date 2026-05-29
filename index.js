function gameboard() {
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

          return { setCross, setNought, getState, emptyState };
        })(),
      );
  })();

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

  return { playCross, playNought, displayBoard };
}
