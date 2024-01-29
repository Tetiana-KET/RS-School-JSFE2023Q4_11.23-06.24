export default function calculateClues(currentPuzzle, lineClues, columnClues, gridSize) {
	currentPuzzle.forEach((line, i) => {
		let currentLineClues = [];
		let count = 0;

		//clues for line
		line.forEach((cell, j) => {
			if (cell) {
				count += 1;
			} else {
				if (count > 0) {
					currentLineClues.push(count);
					count = 0;
				}
			}
		});

		//last iteration
		if (count > 0) {
			currentLineClues.push(count);
			count = 0;
		}
		lineClues.push(currentLineClues);
	});

	//clues for columns
	let currentColClues = [];

	for (let col = 0; col < gridSize; col += 1) {
		let count = 0;

		for (let row = 0; row < gridSize; row += 1) {
			if (currentPuzzle[row][col]) {
				count += 1;
			} else {
				if (count > 0) {
					currentColClues.push(count);
					count = 0;
				}
			}
		}

		//last iteration
		if (count > 0) {
			currentColClues.push(count);
		}

		columnClues.push(currentColClues);
		// Clear the array for the next column
		currentColClues = [];
	}
}