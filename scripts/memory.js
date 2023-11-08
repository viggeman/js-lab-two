/*
1. Random 10 numbers
2. Pop those 10 from characters
3. Create 2 arrays with those 10 IDs
4. Shuffle the arrays
5. Create a randomize image listing with all the duplicates
  a. Create 20 html memory Cards div
  b. Loop and add Characterdata to memory card

1. Click events on al cards
2. function: if cards match, pop to 'matched' array
3. When all cards is gone, end game > rerun button

1. Add styling/animation
2. Maybe create Point system
*/

const min = 1;
const max = 82;
const allCharacters = JSON.parse(sessionStorage.getItem("characters"));
const memoryGrid = document.querySelector(".memory-grid");

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
    console.log("console.log", firstCard.id);
    return;
  }

  secondCard = this;
  console.log("second", secondCard.id);
  checkForMatch();
}

function checkForMatch() {
  console.log(firstCard, secondCard);
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
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

numberGen = () => {
  let randomNr = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNr;
};

createCards = () => {
  let randomNumbers = [];
  for (let i = 0; i < 10; i++) {
    let newNumber = numberGen();
    randomNumbers.push(newNumber);
    // console.log(randomNumbers);
  }
  randomNumbers = randomNumbers.concat(randomNumbers);
  console.log("random", randomNumbers);
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
console.log(memoryCard);

memoryCard.forEach(function (card) {
  card.addEventListener("click", flipCard);
});
/* memoryCard.forEach(function (card) {
  card.addEventListener("click", function () {
    // do something when the button is clicked
    console.log("You clicked a button", card);
    card.classList.toggle("is-flipped");
  });
}); */

console.log("randomid", randomIds);
