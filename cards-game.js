const cards = [
  {
    id: 1,
    image: "./assets/dog.jpg",
    value: "dog",
  },
  {
    id: 2,
    image: "./assets/dog.jpg",
    value: "dog",
  },
  {
    id: 3,
    image: "./assets/duckling.jpg",
    value: "duckling",
  },
  {
    id: 4,
    image: "./assets/duckling.jpg",
    value: "duckling",
  },
  {
    id: 5,
    image: "./assets/goose.jpg",
    value: "goose",
  },
  {
    id: 6,
    image: "./assets/goose.jpg",
    value: "goose",
  },
  {
    id: 7,
    image: "./assets/meduza.jpg",
    value: "meduza",
  },
  {
    id: 8,
    image: "./assets/meduza.jpg",
    value: "meduza",
  },
  {
    id: 9,
    image: "./assets/monkey.jpg",
    value: "monkey",
  },
  {
    id: 10,
    image: "./assets/monkey.jpg",
    value: "monkey",
  },
  {
    id: 11,
    image: "./assets/panda.jpg",
    value: "panda",
  },
  {
    id: 12,
    image: "./assets/panda.jpg",
    value: "panda",
  },
  {
    id: 13,
    image: "./assets/parrot.jpg",
    value: "parrot",
  },
  {
    id: 14,
    image: "./assets/parrot.jpg",
    value: "parrot",
  },
  {
    id: 15,
    image: "./assets/rabbit.jpg",
    value: "rabbit",
  },
  {
    id: 16,
    image: "./assets/rabbit.jpg",
    value: "rabbit",
  },
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const container = document.querySelector("#container");
const template = document.querySelector("#template");
let firstCard = null;
let pairsFound = 0;

let totalPairs = 8;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;

// New initializeGame function added
function initializeGame() {
  shuffle(cards); // Shuffle the cards

  cards.forEach(function (card) {
    const cardHolder = document.importNode(template.content, true);
    const flipCard = cardHolder.querySelector(".flip-card");
    cardHolder.querySelector(".flip-card-back img").src = card.image;
    // cardHolder.classList.add("card");

    flipCard.addEventListener("click", function () {
      if (flipCard.classList.contains("click")) {
        flipCard.classList.remove("click");
        if (firstCard != null) {
          firstCard = null;
        }
      } else {
        flipCard.classList.add("click");
        if (firstCard === null) {
          firstCard = card.value;
        } else {
          const openCards = document.querySelectorAll(".click");
          if (firstCard === card.value) {
            setTimeout(function () {
              updatePairsFound();
              openCards.forEach(function (currentCard) {
                currentCard.classList.add("guessed");
              });
            }, 1000);
          } else {
            setTimeout(function () {
              openCards.forEach(function (currentCard) {
                currentCard.classList.remove("click");
              });
            }, 1000);
          }
          firstCard = null;
        }
      }
    });

    container.append(cardHolder);
  });
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  document.getElementById('timer').textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
function pad(value) {
  return value.toString().padStart(2, '0');
}
function updatePairsFound() {
  pairsFound++;
  document.querySelector('#pairsFound').textContent = `${pairsFound}/${totalPairs}`;
  if (pairsFound == cards.length / 2 ) {
    clearInterval(timer);
  }
}

const button = document.querySelector("#pressToStart");
const stats = document.querySelector("#stats");
const octopus = document.querySelector("#octopus");
button.onclick = function () {
  button.classList.add("hidden");
  stats.classList.remove("hidden");
  container.classList.remove("hidden");
  octopus.classList.remove("hidden");
  initializeGame(); // Call initializeGame when button is clicked
  startTimer();
};

// что еще дбавить
// что джальше разработать
