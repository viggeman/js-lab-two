const min = 1;
const max = 82;
const allCharacters = JSON.parse(sessionStorage.getItem("characters"));
const memoryGrid = document.querySelector(".memory-grid");

/* Inspiration and help from here
https://marina-ferreira.github.io/projects/js/memory-game/ */

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("is-flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.id === secondCard.id;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");

    resetBoard();
  }, 2000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/* End of inspiration */

numberGen = () => {
  let randomNr = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNr;
};

createCards = () => {
  let randomNumbers = [];
  for (let i = 0; i < 10; i++) {
    let newNumber = numberGen();
    if (!randomNumbers.includes(newNumber)) {
      randomNumbers.push(newNumber);
    } else {
      newNumber = numberGen();
      if (!randomNumbers.includes(newNumber)) {
        randomNumbers.push(newNumber);
      } else {
        newNumber = numberGen();
        randomNumbers.push(newNumber);
      }
    }
  }

  randomNumbers = randomNumbers.concat(randomNumbers);
  randomNumbers = shuffle(randomNumbers);

  return randomNumbers;
};

shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/* Initiate JS */

const randomIds = createCards();

randomIds.forEach((id) => {
  const card = document.createElement("div");
  card.classList.add("tile");
  card.setAttribute("id", id);
  card.innerHTML = `
    <div class="tile__face tile__face--front">Memory</div>
    <img src="../media/people/${id}.jpg" class="tile__face tile__face--back"></img>
    `;
  memoryGrid.appendChild(card);
});

const memoryCard = document.querySelectorAll("div.tile");

/* Add eventlistener to each card */

memoryCard.forEach(function (card) {
  card.addEventListener("click", flipCard);
});
