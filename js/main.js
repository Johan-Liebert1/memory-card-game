let cardsDiv;
let allImages;
let numCardsList;
let numSecondsList;
let startGameButton;

let numCardsSpan;
let numSecondsSpan;

let formContainer;
let gameContainer;

let numberOfCardsToShow;
let secondsToDisplayEachImageFor;
let score;
let currentCardIndex;
let isCardDisplayOver;
let playersChosenSequence;
let timerInterval;
let minutes, seconds;
let cardIntervalId;
let randomCardNumbers;

const newGame = () => {
	cardsDiv = document.getElementById("card-display");
	allImages = document.querySelectorAll(".card-img");
	numCardsList = document.querySelector("#numCardsToShow");
	numSecondsList = document.querySelector("#secsForEachCard");
	startGameButton = document.getElementById("start-game");

	numCardsSpan = document.getElementById("numCardsSpan");
	numSecondsSpan = document.getElementById("numSecondsSpan");

	formContainer = document.getElementById("form-container");
	gameContainer = document.getElementById("game-container");

	numberOfCardsToShow = 5;
	secondsToDisplayEachImageFor = 0.25;
	score = 0;
	currentCardIndex = 0;
	isCardDisplayOver = false;
	playersChosenSequence = [];
	timerInterval;
	minutes = 0;
	seconds = 0;
};

newGame();

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
	numberOfCardsToShow = Number(e.target.value.split(" ")[0]);
	numCardsSpan.innerText = `${numberOfCardsToShow} cards`;
};

const numSecondsListener = e => {
	secondsToDisplayEachImageFor = Number(e.target.value);
	let toAdd = secondsToDisplayEachImageFor === 1 ? "" : "s";
	numSecondsSpan.innerText = `${secondsToDisplayEachImageFor} second${toAdd}`;
};

// Event Listeners

startGameButton.addEventListener("click", startGame);
numCardsList.addEventListener("click", numCardsListener);
numSecondsList.addEventListener("click", numSecondsListener);

document.getElementById("tryAgainButton").addEventListener("click", () => {
	gameContainer.style.display = "none";
	formContainer.style.display = "flex";
	document.getElementById("tryAgainButton").style.display = "none";
	document.getElementById("statsTable").style.display = "none";
	document.getElementById("timer").style.display = "none";

	const singleImg = document.querySelector(".single-img");
	singleImg.removeAttribute("number");
	singleImg.removeAttribute("src");
	singleImg.style.display = "inline";

	document.querySelectorAll(".card-img-view").forEach(civ => {
		civ.className = "card-img";

		let checkmarkContainer = civ.querySelectorAll(".checkmark-container");

		if (checkmarkContainer.length > 0) {
			checkmarkContainer.forEach(cc => cc.remove());
		}
	});

	newGame();
});

document.getElementById("fullScreen").addEventListener("click", () => {
	if (document.body.requestFullscreen) {
		document.body.requestFullscreen();
	} else if (document.body.mozRequestFullScreen) {
		document.body.mozRequestFullScreen();
	} else if (document.body.webkitRequestFullScreen) {
		document.body.webkitRequestFullScreen();
	}
});
