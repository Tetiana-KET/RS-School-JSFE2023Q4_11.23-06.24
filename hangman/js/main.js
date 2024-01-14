import questionsList from './questionsList.js';
import {initGame} from './initGame.js';
import { keyList } from './initGame.js';
import { createGameOverModal, showGameOverModal } from './gameOverModal.js';
import { createAlertModal } from './wrongLangModal.js';

window.addEventListener('DOMContentLoaded', function () {
	initGame();

	let currentWord  = null;
	let random = getRandom();
	let previousRandom = null;
	let wrongGuess = 0;
	const guessedLetters = [];
	const attemptPerGame = 6;
	const image = document.querySelector('.picture-wrap__img');
	const keyboard = document.querySelector('.keyboard');
	const guessesCount = document.querySelector('.game__count');
	guessesCount.textContent = `${wrongGuess} / ${attemptPerGame}`;

	function getRandom() {
		return Math.floor(Math.random() * questionsList.length);
	}

	function getRandomQuestion() {
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
		console.log(`The secret word is: "${word}"`);
		previousRandom = random;
	}

	function resetGame() {
		random = getRandom();
		while (previousRandom === random) {
			random = getRandom();
		}
		wrongGuess = 0;
		guessesCount.textContent = `${wrongGuess} / ${attemptPerGame}`;
		image.setAttribute(
			'src',
			`../hangman/assets/icons/hangman-${wrongGuess}.svg`
		);
		guessedLetters.length = 0;
		document.querySelectorAll('.keyboard__key').forEach(button => {
			button.disabled = false;
			button.classList.remove('clicked');
		});
		const secretWord = document.querySelector('.game__secret-word');
		secretWord.innerHTML = '';

		const modal = document.querySelector('.modal__game-over');
		modal.classList.remove('show');
		getRandomQuestion();
	}

	function checkLetter(letterPressed) {
		if (currentWord.includes(letterPressed)) {
			[...currentWord].forEach((letter, index) => {
				if (letter === letterPressed) {
					guessedLetters.push(letter);
					document.querySelectorAll('.secret-word__letter')[index].textContent =
						letter;
					document
						.querySelectorAll('.secret-word__letter')
						[index].classList.add('letter__guessed');
				}
			});
		} else {
			wrongGuess += 1;
			image.setAttribute(
				'src',
				`../hangman/assets/icons/hangman-${wrongGuess}.svg`
			);
		}
		guessesCount.textContent = `${wrongGuess} / ${attemptPerGame}`;

		if (wrongGuess === attemptPerGame) return showGameOverModal(false);
		if (guessedLetters.length === currentWord.length)
			return showGameOverModal(true);
	}

	keyboard.addEventListener('click', (e) => {
		if (e.target.classList.contains('keyboard__key')) {
			const letterPressed = e.target.getAttribute('data');
			e.target.classList.add('clicked');
			e.target.disabled = true;
			checkLetter(letterPressed);
		}
	});

	document.addEventListener('keydown', (e)  => {
		const letterPressed = e.key.toLowerCase();

		if (e.key.toUpperCase().match(/([А-Я])/g)) {
			const modalAlert = document.querySelector('.modal__alert');
			modalAlert.classList.add('show');
		}

		const keyPressed = document.getElementById(`${letterPressed}`);

		if (keyList.includes(letterPressed)) {
			if (!keyPressed.classList.contains('clicked')) {
				keyPressed.classList.add('clicked');
				keyPressed.disabled = true;
				checkLetter(letterPressed);
			}
		}
	});

	createGameOverModal();
	createAlertModal();
	getRandomQuestion();

	const modalButton = document.querySelector('.try-again-btn');
	modalButton.addEventListener('click', resetGame);
	const modalAlertButton = document.querySelector('.ok-btn');
	modalAlertButton.addEventListener('click', () => {
		const modalAlert = document.querySelector('.modal__alert');
		modalAlert.classList.remove('show');
	});
});


