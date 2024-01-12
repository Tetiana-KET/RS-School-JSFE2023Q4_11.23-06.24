import questionsList from './questionsList.js';
import {initGame} from './initGame.js';
import { createGameOverModal, showGameOverModal } from './gameOverModal.js';
// import name from './name.js';

console.log(questionsList[1]);
window.addEventListener('DOMContentLoaded', function () {
	initGame();
	createGameOverModal();
	showGameOverModal();
});
