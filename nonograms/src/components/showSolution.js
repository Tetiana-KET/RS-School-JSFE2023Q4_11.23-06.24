import { stopTimer } from './timerHandlers';
export default function showSolution() {
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
