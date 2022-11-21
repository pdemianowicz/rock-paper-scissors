const board = document.querySelector(".board");
const btnReset = document.querySelector(".button-reset");
const btnRules = document.querySelector(".button-rules");
const btnClose = document.querySelector(".btn-close");
let score = localStorage.getItem("score") || "0";
renderBoard();
renderScore();

board.addEventListener("click", (e) => {
  const value = e.target;
  const valueParent = value.parentElement;
  const { type } = valueParent.dataset;
  if (type !== "rock" && type !== "paper" && type !== "scissors") return;

  const playerPick = type;
  const computerPick = randomComputerPick();
  const result = checkTheWinner(playerPick, computerPick);
  renderFight(playerPick, computerPick, result);
});

function renderBoard() {
  board.classList.remove("game-fight");
  board.classList.add("game");

  const stringToInject = `
  <img class="bg-triangle" src="./images/bg-triangle.svg" alt="" />
  <button class="rock" data-type="rock"><div class="rock-element"></div></button>
  <button class="paper" data-type="paper"><div class="paper-element"></div></button>
  <button class="scissors" data-type="scissors"><div class="scissors-element"></div></button>`;
  board.innerHTML = stringToInject;
}

function randomComputerPick() {
  let x = Math.floor(Math.random() * 3 + 1);

  if (x === 1) return "rock";
  if (x === 2) return "paper";
  if (x === 3) return "scissors";
}

function checkTheWinner(player, computer) {
  if (player === computer) return "Draw";
  else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    score++;
    localStorage.setItem("score", score);
    return "You win";
  }
  score--;
  return "You lose";
}

function renderFight(player, computer, result) {
  board.classList.remove("game");
  board.classList.add("game-fight");

  const stringToInject = `
  <div class="player-pick"><p>You picked</p>
  <button class="${player}"><div class="${player}-element"></div></button></div>
  <div class="computer-pick"><p>The house picked</p><button class="circle"></button></div>`;
  board.innerHTML = stringToInject;

  function renderComputerPick() {
    document.querySelector(".computer-pick").innerHTML = `
    <p>The house picked</p>
    <button class="${computer}">
    <div class="${computer}-element"></div>
    </button>`;

    if (result === "You win") document.querySelector(".player-pick button").classList.add("winner");
    if (result === "You lose") document.querySelector(".computer-pick button").classList.add("winner");
  }

  function renderResult() {
    const gameFight = document.querySelector(".game-fight");
    const div = document.createElement("div");
    div.classList.add("game-result");

    div.innerHTML = `
    <p>${result}</p>
    <button class="button play-again">Play again</button>`;

    gameFight.appendChild(div);
    document.querySelector(".play-again").addEventListener("click", renderBoard);
    renderScore();
  }

  setTimeout(renderComputerPick, 2000);
  setTimeout(renderResult, 2400);
}

function renderScore() {
  const scoreDisplay = document.querySelector(".score");
  scoreDisplay.innerHTML = score;
  localStorage.setItem("score", score);
}

btnReset.addEventListener("click", () => {
  score = 0;
  renderScore();
});

btnRules.addEventListener("click", (e) => {
  const modalRules = document.querySelector(".modal-rules");
  const visibility = modalRules.getAttribute("data-visible");
  document.querySelector(".overlay").style.display = "block";

  if (visibility !== "false") return modalRules.setAttribute("data-visible", false);
  return modalRules.setAttribute("data-visible", true);
});

btnClose.addEventListener("click", () => {
  btnRules.click();
  document.querySelector(".overlay").style.display = "none";
});
