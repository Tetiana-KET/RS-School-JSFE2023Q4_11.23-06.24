import questionsList from './questionsList.js';
import {initGame} from './initGame.js';
import { createGameOverModal, showGameOverModal } from './gameOverModal.js';

window.addEventListener('DOMContentLoaded', function () {
	initGame();

	let currentWord  = null;
	let wrongGuess = 0;
	const attemptPerGame = 6;

	const guessesCount = document.querySelector('.game__count');
	guessesCount.textContent = `${wrongGuess} / ${attemptPerGame}`;

	const keyboard = document.querySelector('.keyboard');

	function getRandomQuestion() {
		const random = Math.floor(Math.random() * questionsList.length);
		const { word, hint } = questionsList[random];
		currentWord = word;
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

	keyboard.addEventListener('click', (e) => {
		const letterPressed = e.target.getAttribute('data');
		e.target.classList.add('clicked');
		if (currentWord.includes(letterPressed)) {
			[...currentWord].forEach((letter, index) => {
				if (letter === letterPressed) {
					document.querySelectorAll('.secret-word__letter')[index].textContent = letter;
					document
						.querySelectorAll('.secret-word__letter')
						[index].classList.add('letter__guessed');
				}
			})
		} else {
			wrongGuess += 1;
			guessesCount.textContent = `${wrongGuess} / ${attemptPerGame}`;
		}
	
	});
	createGameOverModal();
	getRandomQuestion();
});


