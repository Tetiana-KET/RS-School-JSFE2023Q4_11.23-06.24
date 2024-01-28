import { gameTemplates } from './gameTemplates';
import getRandomNumber from './getRandomNumber';

let random = getRandomNumber();
let previousRandom = null;


export default function getRandomPuzzle(currentPuzzle, currentPuzzleName, gridSize) {
	const puzzles = [];
	const puzzleNames = [];

	gameTemplates.forEach(level => {
		Object.entries(level).forEach(entry => {
			puzzles.push(entry[1]);
			puzzleNames.push(entry[0]);
		});
	});

	currentPuzzle = puzzles[random];
	currentPuzzleName = puzzleNames[random];
	gridSize = puzzles[random].length;
}