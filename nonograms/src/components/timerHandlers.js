let timerID;
let startTime;
let duration = 0;

function updateTimer() {
	duration = Math.floor((Date.now() - startTime) / 1000);
	const hours = String(Math.floor(duration / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
	const seconds = String(duration % 60).padStart(2, '0');
	const gameTimer = document.querySelector('.settings__timer');
	gameTimer.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
	let savedTime = 0;
	const savedGameState = JSON.parse(localStorage.getItem('savedGame'));
	const isResumeTime = localStorage.getItem('isResumeTime');
	const isResetGame = localStorage.getItem('isResetGame');

	if (isResumeTime) {
		savedTime = Number(savedGameState.duration);
		localStorage.removeItem('isResumeTime');
	}

	if (isResetGame) {
		savedTime = Number(localStorage.getItem('duration'));
		localStorage.removeItem('isResetGame');
	}

	startTime = Date.now() - savedTime * 1000;
	timerID = setInterval(updateTimer, 1000);
}

function stopTimer() {
	localStorage.setItem('duration', `${duration}`)
	clearInterval(timerID);
}
export { updateTimer, startTimer, stopTimer};
