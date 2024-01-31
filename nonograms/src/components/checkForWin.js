import { stopTimer } from './timerHandlers';
export default function checkForWin() {
	const cells = document.querySelectorAll('.game__cell');
	const openedCells = document.querySelectorAll('.game__cell.cell-filled');
	let isWin = Array.from(openedCells).every(item =>
		item.classList.contains('filled')
	);

	if (isWin) {
		stopTimer();
		const modal = document.querySelector('.modal');
		const pageTimer = document.querySelector('.settings__timer');
		const messageTime = document.querySelector('.message-time');
		messageTime.textContent = pageTimer.textContent;

		Array.from(cells).forEach(cell => {
			cell.classList.remove('cell-crossed');
			cell.classList.add('disabled');
		});
		setTimeout(() => {
			modal.classList.add('show');
		}, 500);
	}
}