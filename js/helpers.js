const lessThan52 = numberOfCards => {
	let arr = {};
	let i = 0;

	while (i < numberOfCards) {
		const rand = Math.floor(Math.random() * allImages.length);

		if (rand in arr) {
			continue;
		} else {
			arr[rand] = true;
			i++;
		}
	}

	return Object.keys(arr);
};

const getRandomlyShuffledCards = numberOfCards => {
	if (numberOfCards <= 52) {
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
