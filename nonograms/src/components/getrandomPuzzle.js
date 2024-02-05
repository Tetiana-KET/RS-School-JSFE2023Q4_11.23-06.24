import { gameTemplates } from './gameTemplates';
import getRandomNumber from './getRandomNumber';
import calculateClues from './calculateClues';
import createGameGrid from './createGameGrid';

let previousRandom = null;

export default function getRandomPuzzle() {

	let randomGridSize = null;
	let randomCurrentPuzzleName = null;
	let currentPuzzleLevel = null;
	let randomIndex = getRandomNumber();

	while (previousRandom === randomIndex) {
		randomIndex = getRandomNumber();
	}
	
	let randomCurrentPuzzle = Object.values(gameTemplates[0])[randomIndex];

	const puzzles = [];
	const puzzleNames = [];
	const newLineClues = [];
	const newColumnClues = [];

	gameTemplates.forEach(level => {
		Object.entries(level).forEach(entry => {
			puzzles.push(entry[1]);
			puzzleNames.push(entry[0]);
		});
	});

	randomCurrentPuzzle = puzzles[randomIndex];
	randomCurrentPuzzleName = puzzleNames[randomIndex];
	randomGridSize = puzzles[randomIndex].length;
	currentPuzzleLevel =
		randomGridSize === 5 ? 'easy' : randomGridSize === 10 ? 'medium' : 'hard';

	const gameContent = document.querySelector('.game__content');
	const gameClueTop = document.querySelector('.clues-columns-wrap');
	const gameClueAside = document.querySelector('.clues-rows-wrap');
	const levelHeader = document.querySelector('.level__header-text');
	

	gameContent.innerHTML = '';
	gameClueTop.innerHTML = '';
	gameClueAside.innerHTML = '';
	levelHeader.innerHTML = `${currentPuzzleLevel.slice(0, 1).toLocaleUpperCase()}${currentPuzzleLevel.slice(1)}`;

	calculateClues(
		randomCurrentPuzzle,
		randomGridSize,
		newLineClues,
		newColumnClues
	);

	createGameGrid(
		randomCurrentPuzzle,
		randomCurrentPuzzleName,
		randomGridSize,
		newLineClues,
		newColumnClues
	);

	console.log(`random Index ${randomIndex}`);
	console.log(`previous Random index was ${previousRandom}`);
	console.log(
		`Current Puzzle: "${randomCurrentPuzzleName}" - ${currentPuzzleLevel} - ${randomGridSize}*${randomGridSize}`
	);
	console.log(`--------------------------------`);
	previousRandom = randomIndex;
}