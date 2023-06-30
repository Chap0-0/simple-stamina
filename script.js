var target = document.getElementById("target");
var input = document.getElementById("input");
var accuracyDisplay = document.getElementById("accuracy");
var speedDisplay = document.getElementById("speed");
var timerDisplay = document.getElementById("timer");

var words = [
  "apple",
  "beach",
  "chair",
  "dance",
  "eagle",
  "fight",
  "ghost",
  "hotel",
  "igloo",
  "juice",
  "knife",
  "lemon",
  "money",
  "novel",
  "olive",
  "paint",
  "queen",
  "rabbit",
  "snake",
  "tiger",
  "umbra",
  "video",
  "water",
  "xerox",
  "young",
  "zebra",
  "angel",
  "black",
  "cloud",
  "dress",
  "earth",
  "fruit",
  "glass",
  "hotel",
  "ivory",
  "jelly",
  "kite",
  "light",
  "mango",
  "night",
  "opera",
  "pizza",
  "quilt",
  "radio",
  "sheep",
  "train",
  "urban",
  "viper",
  "whisk",
  "xylo",
  "yoga",
  "zesty",
  "amber",
  "bread",
  "candy",
  "dance",
  "eggplant",
  "feather",
  "gadget",
  "helmet",
  "island",
  "jigsaw",
  "kangaroo",
  "lantern",
  "monkey",
  "nature",
  "orange",
  "penguin",
  "quiver",
  "rocket",
  "soccer",
  "tomato",
  "unicorn",
  "volley",
  "window",
  "x-ray",
  "yacht",
  "zebra",
  "arctic",
  "barrel",
  "cactus",
  "dolphin",
  "engine",
  "forest",
  "guitar",
  "hammer",
  "insect",
  "jacket",
  "kitchen",
  "lantern",
  "mountain",
  "noodle",
  "octopus",
  "planet",
  "quasar",
  "rocket",
  "sunset",
  "turtle",
  "unicorn",
  "voyage",
];
var currentWordIndex = 0;
var correctCharsTyped = 0;
var totalCharsTyped = 0;
var startTime = null;
var timeLimit = 60; // seconds

function generateRandomWord() {
  var randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function updateTarget() {
  var currentWord = generateRandomWord();
  var formattedWord = "";
  for (var i = 0; i < currentWord.length; i++) {
    formattedWord += '<span class="letter">' + currentWord[i] + "</span>";
  }
  target.innerHTML = formattedWord;
  currentWordIndex = words.indexOf(currentWord);
}

function handleInput() {
  var enteredChar = input.value[input.value.length - 1];
  var expectedChar = words[currentWordIndex][input.value.length - 1];

  if (enteredChar === expectedChar) {
    input.style.color = "gray";
    correctCharsTyped++;
    var targetChars = target.getElementsByClassName("letter");
    targetChars[input.value.length - 1].style.color = "gray";
  } else {
    input.value = input.value.slice(0, -1);
    input.style.color = "black";
  }

  totalCharsTyped++;
  var accuracy = (correctCharsTyped / totalCharsTyped) * 100;
  accuracyDisplay.textContent = "Точность: " + accuracy.toFixed(2) + "%";

  var elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  var speed = (totalCharsTyped / elapsedTime) * 60;
  speedDisplay.textContent = "Скорость: " + speed.toFixed(2) + " зн./мин.";

  if (input.value === words[currentWordIndex]) {
    input.value = "";
    input.style.color = "black";
    updateTarget();
  }
}

input.addEventListener("input", handleInput);

function startTimer() {
  startTime = Date.now();
  var timerId = setInterval(function () {
    var remainingTime = timeLimit - Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = "Осталось времени: " + remainingTime + " сек.";
    if (remainingTime <= 0) {
      clearInterval(timerId);
      input.disabled = true;
      alert("Время вышло!");
    }
  }, 1000);
}

// Начальное обновление слова
updateTarget();
input.focus();
startTimer();
