import { stopTimer } from './timerHandlers';
import { soundCheat } from './createGameGrid';

export default function showSolution() {
	soundCheat.play();
	localStorage.setItem('isSolutionPressed', 'true');
	const solutionCells = document.querySelectorAll('.filled');

	const cells = document.querySelectorAll('.game__cell');
	Array.from(cells).forEach(cell => {
		cell.classList.remove('cell-crossed');
		cell.classList.remove('cell-filled');
		cell.classList.add('disabled');
	});

	Array.from(solutionCells).forEach(cell => {
		cell.classList.add('cell-filled');
	});
  stopTimer();
}
