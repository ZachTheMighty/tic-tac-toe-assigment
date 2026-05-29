function gameboard() {
  const blocks = [];
}

function block() {
  let state = "empty";
  let id;

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

  return { setCross, setNought, getState, emptyState };
}
