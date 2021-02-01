const getTableRowColor = fraction => {
	if (fraction < 0.25) {
		return "bg-danger";
	}

	if (fraction < 0.7) {
		return "bg-warning";
	} else {
		return "bg-success";
	}
};

const showTryAgainButton = () => {
	const buttonContainer = document.getElementById("tryAgainButton");
	buttonContainer.style.display = "flex";
	buttonContainer.style.height = "100%";
	buttonContainer.style.width = "100%";
};

const getDeckName = num => numToDeckName[Math.floor(num / 13)];
const getCardValue = num => numToCardVal[num % 13];

const calculatePlayerScore = () => {
	let correctlyChosen = [],
		incorrectlyChosen = [];

	for (let i = 0; i < playersChosenSequence.length; i++) {
		const p = playersChosenSequence[i];
		const r = Number(randomCardNumbers[i]);
		if (p === r) {
			correctlyChosen.push(getCardValue(p) + " Of " + getDeckName(p));
			score++;
		} else {
			incorrectlyChosen.push(getCardValue(r) + " Of " + getDeckName(r));
		}
	}

	const originalOrder = randomCardNumbers.map(r => {
		return getCardValue(Number(r)) + " Of " + getDeckName(Number(r));
	});

	const playersOrder = playersChosenSequence.map(p => {
		return getCardValue(p) + " Of " + getDeckName(p);
	});

	document.getElementById("statsTable").style.display = "table";

	document.getElementById(
		"score"
	).innerText = `${score}/${playersChosenSequence.length}`;
	document
		.getElementById("scoreTableRow")
		.classList.add(getTableRowColor(score / playersChosenSequence.length));

	document.getElementById(
		"timeTaken"
	).innerText = `${minutes} minutes(s) ${seconds} seconds`;

	let playersOrderHtml = "";

	for (let i = 0; i < playersOrder.length; i++) {
		let color;

		if (playersOrder[i] === originalOrder[i]) {
			color = "#27ae60";
		} else {
			color = "#d63031";
		}

		let toAdd = i === playersOrder.length - 1 ? "" : " --> ";

		playersOrderHtml += `<span style = "color: ${color}">${originalOrder[i]}</span><span>${toAdd}</span>`;
	}

	document.getElementById("yourChosenOrder").innerHTML = playersOrderHtml;

	showTryAgainButton();
};

const playerIsChoosingTheSequence = e => {
	if (playersChosenSequence.length === randomCardNumbers.length) {
		return;
	}

	const parentDiv = e.target.parentNode;
	const number = Number(parentDiv.getAttribute("number"));
	playersChosenSequence.push(number);

	if (number === Number(randomCardNumbers[playersChosenSequence.length - 1])) {
		parentDiv.innerHTML += checkmarkHtml;
	} else {
		parentDiv.innerHTML += wrongHtml;
	}

	// fade out the checkmark
	// document
	// 	.querySelector(".checkmark-container")
	// 	.classList.add("checkmark-container-fade");

	if (playersChosenSequence.length === randomCardNumbers.length) {
		calculatePlayerScore();
		stopTimer();
	}
};

const letPlayerChooseSequence = () => {
	document.querySelector(".single-img").style.display = "none";
	allImages.forEach(image => {
		image.className = "card-img-view";
		image.addEventListener("click", playerIsChoosingTheSequence);
		// image.innerHTML += checkmarkHtml;
	});

	startTimer();
};
