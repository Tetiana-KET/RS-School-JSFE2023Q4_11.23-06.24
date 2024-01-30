import {gameTemplates} from './gameTemplates';
import calculateClues from './calculateClues';

let index = Math.floor(Math.random() * Object.values(gameTemplates[0]).length);
let currentPuzzle = Object.values(gameTemplates[0])[index];
let currentPuzzleName = Object.keys(gameTemplates[0])[index];
let gridSize = 5;
const lineClues = [];
const columnClues = [];

calculateClues(currentPuzzle, gridSize, lineClues, columnClues);

export default function createGameGrid(
	current = currentPuzzle,
	currentName = currentPuzzleName,
	size = gridSize,
	rowClues = lineClues,
	colClues = columnClues
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

	colClues.forEach((column, j) => {
		const cluesItemsWrap = document.createElement('div');
		cluesItemsWrap.classList.add('clues__items-wrap', 'clues__items-wrap_cols');
		cluesItemsWrap.style.width = cellWidth + 'px';
		gameClueTop.append(cluesItemsWrap);

		column.forEach((cell, i) => {
			const cluesItem = document.createElement('div');
			cluesItem.classList.add('clues__item');
			cluesItem.style.width = cellWidth + 'px';
			cluesItem.style.height = cellWidth + 'px';
			cluesItemsWrap.append(cluesItem);
			cluesItem.textContent = colClues[j][i];
		});
	});

	// ROW CLUES
	const gameClueAside = document.querySelector('.clues-rows-wrap');

	rowClues.forEach((line, j) => {
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
			cluesRowsItem.style.width = cellWidth + 'px';
			cluesRowsItem.style.height = cellWidth + 'px';
			cluesItemsWrapRow.append(cluesRowsItem);
			cluesRowsItem.textContent = rowClues[j][i];
		});
	});

	const hintPuzzleName = document.querySelector('.hint__name');
	hintPuzzleName.textContent = `${currentName
		.charAt(0)
		.toUpperCase()}${currentName.slice(1)}`
	;
}
