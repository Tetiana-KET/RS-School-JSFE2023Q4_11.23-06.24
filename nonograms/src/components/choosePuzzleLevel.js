import createGameGrid from './createGameGrid';
import { puzzleDataEntries } from './setPuzzleNames';
import calculateClues from './calculateClues';

export default function choosePuzzleLevel(e, easy, medium, hard) {

	const puzzlesData = [];
	const newGridSize = Number(e.target.getAttribute('size'));

	puzzleDataEntries.forEach(entry => {
		if (entry[1].length === newGridSize) {
			puzzlesData.push(entry);
		}
	});

	const index = Math.floor(Math.random() * puzzlesData.length);
	const newCurrentPuzzle = puzzlesData[index][1];
	let newCurrentPuzzleName = puzzlesData[index][0];
	const newLineClues = [];
	const newColumnClues = [];

	document.querySelector('.level__body').classList.remove('level__body-active');
	
	document.querySelector('.level__header-text').textContent =
		e.target.getAttribute('value');

	const selectOptions = document.querySelector('.select-options');
	selectOptions.innerHTML = '';

	if (e.target.getAttribute('value').toLowerCase() === 'easy') {
		easy.forEach(item => {
			selectOptions.appendChild(item.cloneNode(true));
		});
	} else if (e.target.getAttribute('value').toLowerCase() === 'medium') {
		medium.forEach(item => {
			selectOptions.appendChild(item.cloneNode(true));
		});
	} else if (e.target.getAttribute('value').toLowerCase() === 'hard') {
		hard.forEach(item => {
			selectOptions.appendChild(item.cloneNode(true));
		});
	}

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
}
