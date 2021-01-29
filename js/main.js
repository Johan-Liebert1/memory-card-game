const cardsDiv = document.getElementById("card-display");
const allImages = document.querySelectorAll(".card-img");
const numCardsList = document.querySelectorAll(".numCardsToShow");
const numSecondsList = document.querySelectorAll(".secsForEachCard");
const startGameButton = document.getElementById("start-game");

const numCardsSpan = document.getElementById("numCardsSpan");
const numSecondsSpan = document.getElementById("numSecondsSpan");

const formContainer = document.getElementById("form-container");
const gameContainer = document.getElementById("game-container");

let numberOfCardsToShow = 26,
	secondsToDisplayEachImageFor = 1;
let score = 0;
let currentCardIndex = 0;
let isCardDisplayOver = false;
let playersChosenSequence = [];
let timerInterval;
let minutes = 0,
	seconds = 0;
let cardIntervalId;
let randomCardNumbers;

const stopTimer = () => {
	clearInterval(timerInterval);
};

const startTimer = () => {
	const m = document.getElementById("minutes");
	const s = document.getElementById("seconds");

	timerInterval = setInterval(() => {
		seconds += 1;

		if (seconds === 60) {
			seconds = 0;
			minutes += 1;
		}

		m.innerText = minutes < 10 ? `0${minutes} :` : `${minutes} :`;
		s.innerText = seconds < 10 ? `0${seconds}` : seconds;
	}, 1000);
};

const changeCardInCardsDiv = () => {
	if (currentCardIndex === randomCardNumbers.length) {
		isCardDisplayOver = true;
	}

	if (!isCardDisplayOver) {
		console.log(randomCardNumbers[currentCardIndex]);
		let image = allImages[randomCardNumbers[currentCardIndex]];

		document
			.querySelector(".single-img")
			.setAttribute("number", image.getAttribute("number"));

		document
			.querySelector(".single-img")
			.setAttribute("src", image.querySelector("img").getAttribute("src"));

		currentCardIndex++;
	} else {
		clearInterval(cardIntervalId);
		letPlayerChooseSequence();
	}
};

const startGame = e => {
	formContainer.style.display = "none";
	gameContainer.style.display = "flex";

	randomCardNumbers = getRandomlyShuffledCards(numberOfCardsToShow);
	cardIntervalId = setInterval(
		changeCardInCardsDiv,
		secondsToDisplayEachImageFor * 1000
	);
};

const numCardsListener = e => {
	numberOfCardsToShow = Number(e.target.innerText.split(" ")[0]);

	numCardsList.forEach(card => card.classList.remove("active"));
	e.target.classList.add("active");
	numCardsSpan.innerText = `${numberOfCardsToShow} cards`;
};

const numSecondsListener = e => {
	secondsToDisplayEachImageFor = Number(e.target.innerText);
	numSecondsList.forEach(card => card.classList.remove("active"));
	e.target.classList.add("active");
	let toAdd = secondsToDisplayEachImageFor === 1 ? "" : "s";
	numSecondsSpan.innerText = `${secondsToDisplayEachImageFor} second${toAdd}`;
};

// Event Listeners

startGameButton.addEventListener("click", startGame);

numCardsList.forEach(card => card.addEventListener("click", numCardsListener));
numSecondsList.forEach(card => card.addEventListener("click", numSecondsListener));
