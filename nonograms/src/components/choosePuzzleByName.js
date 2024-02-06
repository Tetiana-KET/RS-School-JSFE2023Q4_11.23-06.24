import { gameTemplates } from './gameTemplates';
import createGameGrid from './createGameGrid';
import { puzzleDataEntries } from './setPuzzleNames';
import calculateClues from './calculateClues';

let eventTarget = null;
let newGridSize = null;
let index = null;
let newCurrentPuzzle = null;
let newCurrentPuzzleName = null;

export default function choosePuzzleByName (e) {
	
	if(localStorage.getItem('isResumeTime')) {
		localStorage.removeItem('isResumeTime');
	}
	
	const newLineClues = [];
	const newColumnClues = [];

	eventTarget = e.target;
	newGridSize = Number(e.target.getAttribute('size'));
	index = e.target.getAttribute('index');
	newCurrentPuzzle = puzzleDataEntries[index][1];
	newCurrentPuzzleName = puzzleDataEntries[index][0];

	const gameContent = document.querySelector('.game__content');
	const gameClueTop = document.querySelector('.clues-columns-wrap');
	const gameClueAside = document.querySelector('.clues-rows-wrap');

	gameContent.innerHTML = '';
	gameClueTop.innerHTML = '';
	gameClueAside.innerHTML = '';

	calculateClues(newCurrentPuzzle, newGridSize, newLineClues, newColumnClues);

	createGameGrid(
		newCurrentPuzzle,
		newCurrentPuzzleName,
		newGridSize,
		newLineClues,
		newColumnClues
	);

	document.querySelector('.hint__body').classList.remove('hint__body-active');
	document.querySelector('.level__body').classList.remove('level__body-active');
}