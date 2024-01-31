let timerID;
let startTime;

function updateTimer() {
	const duration = Math.floor((Date.now() - startTime) / 1000);
	const hours = String(Math.floor(duration / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
	const seconds = String(duration % 60).padStart(2, '0');
	const gameTimer = document.querySelector('.settings__timer');
	gameTimer.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
	startTime = new Date();
	timerID = setInterval(updateTimer, 1000);
}

function stopTimer() {
	clearInterval(timerID);
}
export { updateTimer, startTimer, stopTimer};
