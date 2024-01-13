import questionsList from './questionsList.js';
import {initGame} from './initGame.js';
import { createGameOverModal, showGameOverModal } from './gameOverModal.js';
// import name from './name.js';

window.addEventListener('DOMContentLoaded', function () {
	initGame();
	createGameOverModal();
	showGameOverModal();

	getRandomQuestion();
	function getRandomQuestion() {
		const random = Math.floor(Math.random() * questionsList.length);
		const { word, hint } = questionsList[random];

		const hintText = document.querySelector('.hint__title-text');
		hintText.textContent = `${hint}`;

		// one letter
		const secretWord = document.querySelector('.game__secret-word');
		word.split('').forEach((char) => {
			const letter = document.createElement('li');
			letter.classList.add('secret-word__letter');
			letter.setAttribute('char', `${char}`);
			secretWord.append(letter);
			letter.textContent = '';
		})

		// CORRECT WORD IN MODAL
		const textContentAnswer = document.querySelector('.modal-content__answer');
		textContentAnswer.textContent = `${word}`;

		console.log(`The correct word was: "${word}"`);
	}
});

// console.log(list);


