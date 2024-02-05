// @ts-nocheck
import { puzzleDataEntries } from './setPuzzleNames';
import { updateTimer, startTimer, stopTimer } from './timerHandlers';

export default function saveGame() {

  localStorage.setItem('isSaved', 'true');
	let isGameStarted = localStorage.getItem('cellsOpened') > 0;

	if (isGameStarted) {
		stopTimer();

		const progress = document.querySelector('.progress-bar');
		const progressWidth = progress.style.width;
		const gameTimer = document.querySelector('.settings__timer');
		const time = gameTimer.textContent;

		const savedGame = {
			currentPuzzle: `${localStorage.getItem('currentPuzzle')}`,
			currentName: `${localStorage.getItem('currentName')}`,
			gameStarted: true,
			progressWidth: `${progressWidth}`,
			time: `${time}`,
			duration: `${localStorage.getItem('duration')}`,
			cellsOpened: `${localStorage.getItem('cellsOpened')}`,
			index: `${localStorage.getItem('index')}`,
			colClues: `${localStorage.getItem('colClues')}`,
			rowClues: `${localStorage.getItem('rowClues')}`,
			filledCells: Array.from(document.querySelectorAll('.cell-filled')).map(
				cell => cell.dataset.index
			),
			crossedCells: Array.from(document.querySelectorAll('.cell-crossed')).map(
				cell => cell.dataset.index
			),
		};

		localStorage.setItem('savedGame', JSON.stringify(savedGame));
	}
}
