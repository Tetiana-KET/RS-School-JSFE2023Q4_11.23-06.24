import {gameTemplates} from './gameTemplates';

let index = Math.floor(Math.random() * Object.values(gameTemplates[0]).length);
let currentPuzzle = Object.values(gameTemplates[0])[index];
let currentPuzzleName = Object.keys(gameTemplates[0])[index];

let gridSize = 5;
const lineClues = [];
const columnClues = [];

function calculateClues() {
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
calculateClues();

export default function createGameGrid(
	current = currentPuzzle,
	currentName = currentPuzzleName,
	size = gridSize
) {
	const gameContent = document.querySelector('.game__content');
	
	const gameGrid = new Array(size).fill(new Array(size).fill(0));
	const gameContentWidth =
		document.querySelector('.game__wrap-outer').clientWidth;
	const cellWidth = gameContentWidth / 2.3 / size;

	gameGrid.forEach((line, i) => {
		const gridLine = document.createElement('div');
		gridLine.classList.add('game__line');
		gameContent.append(gridLine);

		line.forEach((cell, j) => {
			const gridCell = document.createElement('div');
			gridCell.classList.add('game__cell');
			gridCell.style.width = cellWidth + 'px';
			gridCell.style.height = cellWidth + 'px';
			gridLine.append(gridCell);
			if (current[i][j]) {
				gridCell.classList.add('filled');
			}
		});
		gameContent.append(gridLine);
	});

	// COLUMN CLUES
	const gameClueTop = document.querySelector('.clues-columns-wrap');

	columnClues.forEach((column, j) => {
		const cluesItemsWrap = document.createElement('div');
		cluesItemsWrap.classList.add('clues__items-wrap');
		cluesItemsWrap.style.width = cellWidth + 'px';
		gameClueTop.append(cluesItemsWrap);

		column.forEach((cell, i) => {
			const cluesItem = document.createElement('div');
			cluesItem.classList.add('clues__item');
			cluesItem.style.width = cellWidth - 1 + 'px';
			cluesItem.style.height = cellWidth - 1 + 'px';
			cluesItemsWrap.append(cluesItem);
			cluesItem.textContent = columnClues[j][i];
		});
	});

	// ROW CLUES
	const gameClueAside = document.querySelector('.clues-rows-wrap');

	lineClues.forEach((line, j) => {
		const cluesItemsWrapRow = document.createElement('div');
		cluesItemsWrapRow.classList.add(
			'clues__items-wrap',
			'clues__items-wrap_rows'
		);
		cluesItemsWrapRow.style.height = cellWidth + 'px';
		gameClueAside.append(cluesItemsWrapRow);

		line.forEach((cell, i) => {
			const cluesRowsItem = document.createElement('div');
			cluesRowsItem.classList.add('clues__item');
			cluesRowsItem.style.width = cellWidth - 1 + 'px';
			cluesRowsItem.style.height = cellWidth - 1 + 'px';
			cluesItemsWrapRow.append(cluesRowsItem);
			cluesRowsItem.textContent = lineClues[j][i];
		});
	});

	const hintPuzzleName = document.querySelector('.hint__name');
	hintPuzzleName.textContent =
		currentName.charAt(0).toUpperCase() + currentName.slice(1);
}
