
import createGameGrid from './createGameGrid';

export default function resumeSavedGame() {
	localStorage.removeItem('isSaved');


	const savedGame = localStorage.getItem('savedGame');

	if (savedGame) {
		localStorage.setItem('isResume', 'true');
		localStorage.setItem('isResumeTime', 'true');
		const gameState = JSON.parse(savedGame);
		const timer = gameState.time;
		const currentPuzzleIndex = gameState.index;
		const cellsOpened = gameState.cellsOpened;
		const progressWidth = gameState.progressWidth;
		const newCurrentPuzzle = JSON.parse(gameState.currentPuzzle);
		const newCurrentPuzzleName = gameState.currentName;
		const newGridSize = newCurrentPuzzle.length;
		const newLineClues = JSON.parse(gameState.rowClues);
		const newColumnClues = JSON.parse(gameState.colClues);

		const gameContent = document.querySelector('.game__content');
		const gameClueTop = document.querySelector('.clues-columns-wrap');
		const gameClueAside = document.querySelector('.clues-rows-wrap');

		gameContent.innerHTML = '';
		gameClueTop.innerHTML = '';
		gameClueAside.innerHTML = '';

		createGameGrid(
			newCurrentPuzzle,
			newCurrentPuzzleName,
			newGridSize,
			newLineClues,
			newColumnClues,
		);

		gameState.filledCells.forEach(index => {
			document
				.querySelector(`.game__cell[data-index="${index}"]`)
				.classList.add('cell-filled');
		});
		gameState.crossedCells.forEach(index => {
			document
				.querySelector(`.game__cell[data-index="${index}"]`)
				.classList.add('cell-crossed');
		});

		// @ts-ignore
		document.querySelector('.progress-bar').style.width = progressWidth + '%';
		document.querySelector('.settings__timer').textContent = timer;

		localStorage.removeItem('isResume');
	}
}
