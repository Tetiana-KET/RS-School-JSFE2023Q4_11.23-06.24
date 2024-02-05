import { stopTimer } from './timerHandlers';

export default function checkForWin() {
	const currentGame = JSON.parse(localStorage.getItem('currentGame'));
	let winResultsArr = JSON.parse(localStorage.getItem('winResults')) || [];

	const isSolutionPressed = localStorage.getItem('isSolutionPressed');
	const solvedPuzzle = currentGame.currentName;
	const complexity = currentGame.currentPuzzleLevel;
	const cells = document.querySelectorAll('.game__cell');
	const openedCells = document.querySelectorAll('.game__cell.cell-filled');
	let isWin = Array.from(openedCells).every(item =>
		item.classList.contains('filled')
	);

	if (isWin) {
		stopTimer();

		const duration = localStorage.getItem('duration');
		const modal = document.querySelector('.modal');
		const modalTitle = document.querySelector('.modal-title');
		const modalText = document.querySelector('.modal-text');
		const modalTextMessage = document.querySelector('.message');
		const messageTime = document.querySelector('.message-time');
		const pageTimer = document.querySelector('.settings__timer');

		const winResult = {
			duration: duration,
			time: `${pageTimer.textContent}`,
			date: new Date().toLocaleString(),
			solvedPuzzle: solvedPuzzle,
			complexity: complexity,
		};

		if (isSolutionPressed === 'false') {
			modalTitle.textContent = 'You Win!';
			modalText.textContent = 'Congratulations';
			modalTextMessage.textContent = 'You have solved this puzzle in ';
			messageTime.textContent = pageTimer.textContent;
			winResultsArr.push(winResult);
		} else if (isSolutionPressed === 'true') {
			modalTitle.textContent = 'You cheat!';
			modalText.textContent = 'You saw solution';
			modalTextMessage.textContent = 'This win is not included to the score';
			messageTime.textContent = '';
		}

		if (winResultsArr.length >= 2) {
			winResultsArr.sort((a, b) => {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);

				return +dateA - +dateB;
			});
		}

		if (winResultsArr.length >= 5) {
			winResultsArr = winResultsArr.slice(-5);
		}

		if (winResultsArr.length >= 2) {
			winResultsArr.sort((a, b) => a.duration - b.duration);
		}

		localStorage.setItem('winResults', JSON.stringify(winResultsArr));

		Array.from(cells).forEach(cell => {
			cell.classList.remove('cell-crossed');
			cell.classList.add('disabled');
		});
		setTimeout(() => {
			modal.classList.add('show');
			document.body.classList.add('no-scroll');
		}, 500);
	}
}