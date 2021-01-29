const getRandomlyShuffledCards = numberOfCards => {
	let arr = [];
	let i = 0;

	while (i < numberOfCards) {
		const rand = Math.floor(Math.random() * allImages.length);

		arr.push(rand);
		i++;
	}

	return arr;
};
