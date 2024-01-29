import { gameTemplates } from './gameTemplates';
import createGameGrid from './createGameGrid';
import { puzzleDataEntries } from './setPuzzleNames';


const choosePuzzleNameBtn = document.querySelector('.select__hint');

let eventTarget = null;

let newGridSize;
let index;
let newCurrentPuzzle;
let newCurrentPuzzleName;

export default function choosePuzzleByName (e) {
  eventTarget = e.target;
  newGridSize = Number(e.target.getAttribute('size'));
	console.log(newGridSize);

  index = e.target.getAttribute('index');
  newCurrentPuzzle = puzzleDataEntries[index][1];
  newCurrentPuzzleName = puzzleDataEntries[index][0];

  const gameContent = document.querySelector('.game__content');
  const gameClueTop = document.querySelector('.clues-columns-wrap');
  const gameClueAside = document.querySelector('.clues-rows-wrap');

  gameContent.innerHTML = '';
  gameClueTop.innerHTML = '';
  gameClueAside.innerHTML = '';

  createGameGrid(newCurrentPuzzle, newCurrentPuzzleName, newGridSize);

  document.querySelector('.hint__body').classList.remove('hint__body-active');
  
 	console.log(e.target); //<li class="options__value" size="5" name="tree" index="3">Tree 5*5</li>
	console.log(newCurrentPuzzle);

	console.log(newCurrentPuzzleName);
}

