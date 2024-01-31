// @ts-nocheck
import {gameTemplates} from './gameTemplates';
import calculateClues from './calculateClues';
import checkForWin from './checkForWin';
import { stopTimer, startTimer } from './timerHandlers';


let index = Math.floor(Math.random() * Object.values(gameTemplates[0]).length);
let currentPuzzle = Object.values(gameTemplates[0])[index];
let currentPuzzleName = Object.keys(gameTemplates[0])[index];
let gridSize = 5;
let cellsOpened; // by user
let totalFilledCells; // by default = correct cells
let step;
let progressWidth = 0;
const lineClues = [];
const columnClues = [];
let gameStarted = false;

calculateClues(currentPuzzle, gridSize, lineClues, columnClues);

// Function to handle LEFT CLICK on cells
function handleCellClick(e) {

	if (e.target.classList.contains('game__cell') && !gameStarted) {
		gameStarted = true;
		startTimer();
	}

	if (
		e.target.classList.contains('game__cell') &&
		!e.target.classList.contains('cell-crossed')
	) {
		//if cell is already filled
		if (e.target.classList.contains('cell-filled')) {
			e.target.classList.remove('cell-filled');
			cellsOpened -= 1;

			if (cellsOpened === 0) {
				progressWidth = 0;
				document.querySelector('.progress-bar').style.width = 0 + '%';
			} else if (cellsOpened === totalFilledCells) {
				progressWidth = 100;
				document.querySelector('.progress-bar').style.width =
					progressWidth + '%';
				checkForWin();
			} else if (progressWidth <= 100 && cellsOpened < totalFilledCells) {
				progressWidth -= step;
				document.querySelector('.progress-bar').style.width =
					progressWidth + '%';
			}
		} else if (
			!e.target.classList.contains('cell-filled') &&
			!e.target.classList.contains('cell-crossed')
		) {
			//if cell is not filled
			e.target.classList.add('cell-filled');
			cellsOpened += 1;

			if (cellsOpened === totalFilledCells) {
				progressWidth = 100;
				document.querySelector('.progress-bar').style.width =
					progressWidth + '%';
				checkForWin();
			} else if (cellsOpened <= totalFilledCells) {
				progressWidth += step;
				document.querySelector('.progress-bar').style.width =
					progressWidth + '%';
			} else if (cellsOpened > totalFilledCells) {
				progressWidth = 100;
				document.querySelector('.progress-bar').style.width =
					progressWidth + '%';
			}
		}
	}
}

// Function to handle RIGHT CLICK on cells
function handleCellRightClick(e) {
  e.preventDefault();


	if (e.target.classList.contains('game__cell') && !gameStarted) {
		gameStarted = true;
		startTimer();
	}

  if (
    e.target.classList.contains('game__cell') &&
    !e.target.classList.contains('cell-filled')
  ) {
    e.target.classList.toggle('cell-crossed');
  }
}

// Function to remove event listeners
function removeEventListeners() {
	const outerWrap = document.querySelector('.game__wrap-outer');
	outerWrap.removeEventListener('click', handleCellClick);
	outerWrap.removeEventListener('contextmenu', handleCellRightClick);
}

export default function createGameGrid(
	current = currentPuzzle,
	currentName = currentPuzzleName,
	size = gridSize,
	rowClues = lineClues,
	colClues = columnClues
) {

	stopTimer();
	removeEventListeners();
	const gameTimer = document.querySelector('.settings__timer');
	gameTimer.textContent = '00:00:00';

	gameStarted = false;
	progressWidth = 0;
	cellsOpened = 0;
	const outerWrap = document.querySelector('.game__wrap-outer');
	const progress = document.querySelector('.progress-bar')
	progress.style.width = progressWidth + '%';
	totalFilledCells = String(rowClues).split(',').reduce((prev, acc) => +prev + +acc, 0);
	step = +(100 / totalFilledCells).toFixed(2);

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
		.toUpperCase()}${currentName.slice(1)}`;

	//LISTEN CLICK ON CELLS
	outerWrap.addEventListener('click', handleCellClick);

	// LISTEN RIGHT CLICK ON CELLS
	outerWrap.addEventListener('contextmenu', handleCellRightClick);
}
