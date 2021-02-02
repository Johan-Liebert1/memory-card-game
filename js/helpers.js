const lessThan52 = numberOfCards => {
	let arr = [];
	let i = 0;

	while (i < numberOfCards) {
		const rand = Math.floor(Math.random() * allImages.length);

		if (arr.includes(rand)) {
			continue;
		} else {
			arr.push(rand);
			i++;
		}
	}
	console.log(arr);
	return arr;
};

const getRandomlyShuffledCards = numberOfCards => {
	if (numberOfCards <= 52) {
		console.log("numberOfCards <= 52");
		return lessThan52(numberOfCards);
	}

	let arr = [];
	let i = 0;

	while (i < numberOfCards) {
		const rand = Math.floor(Math.random() * allImages.length);

		arr.push(rand);
		i++;
	}

	return arr;
};
