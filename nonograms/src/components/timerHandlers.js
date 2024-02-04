let timerID;
let startTime;
let duration;

function updateTimer() {
	duration = Math.floor((Date.now() - startTime) / 1000);
	const hours = String(Math.floor(duration / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
	const seconds = String(duration % 60).padStart(2, '0');
	const gameTimer = document.querySelector('.settings__timer');
	gameTimer.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
	const savedGameState = JSON.parse(localStorage.getItem('savedGame'));
	const isResumeTime = localStorage.getItem('isResumeTime');
	let savedTime = isResumeTime ? Number(savedGameState.duration) : 0;

	startTime = Date.now() - savedTime * 1000;
	timerID = setInterval(updateTimer, 1000);

	if (isResumeTime) {
		localStorage.removeItem('isResumeTime');
	}
}

function stopTimer() {
	localStorage.setItem('duration', `${duration}`)
	clearInterval(timerID);
}
export { updateTimer, startTimer, stopTimer};
