import {gameTemplates} from './gameTemplates';
import getRandomNumber from './getRandomNumber';

let currentPuzzle = null;
let currentPuzzleName = null;
let random = getRandomNumber();
let previousRandom = null;
let filledCells = null;
let gridSize = null;

function getRandomPuzzle () {
  
  const puzzles = [];
  const puzzleNames = [];

  gameTemplates.forEach(level => {
    Object.entries(level).forEach((entry) => {
      puzzles.push(entry[1]);
      puzzleNames.push(entry[0]);
    })
  })

  currentPuzzle = puzzles[random];
  currentPuzzleName = puzzleNames[random];
  gridSize = puzzles[random].length;
}

getRandomPuzzle();

export default function createGameGrid() {
	const gameContent = document.querySelector('.game__content');
	const gameGrid = new Array(gridSize).fill(new Array(gridSize).fill(0));
  const gameContentWidth = document.querySelector('.game__content').clientWidth;
  const cellWidth = gameContentWidth / gridSize;

	gameGrid.forEach(line => {
		const gridLine = document.createElement('div');
		gridLine.classList.add('game__line');
		gameContent.append(gridLine);

		line.forEach(() => {
			const gridCell = document.createElement('div');
			gridCell.classList.add('game__cell');
      gridCell.style.width = cellWidth + 'px';
      gridCell.style.height = cellWidth + 'px';
			gridLine.append(gridCell);

		});
		gameContent.append(gridLine);
	});

}
