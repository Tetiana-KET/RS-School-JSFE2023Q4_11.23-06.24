// @ts-nocheck
import './normalize.css';
import './style.css';
import generateHtml from './components/htmlGenerator.js';
import createGameGrid from './components/createGameGrid';
import setPuzzleNames from './components/setPuzzleNames';
import choosePuzzleByName from './components/choosePuzzleByName';
import sortPuzzlesByLevel from './components/sortPuzzlesByLevel';
import choosePuzzleLevel from './components/choosePuzzleLevel';
import burgerHandler from './components/burgerHandler'
import saveGame from './components/saveGame';
import resumeSavedGame from './components/resumeSavedGame';
import switchTheme from './components/switchTheme';
import showSolution from './components/showSolution';
import getRandomPuzzle from './components/getrandomPuzzle';
import restartGame from './components/restartGame';
import toggleScoreModal from './components/toggleScoreModal';

let isMuted = false;

const currentTheme = localStorage.getItem('currentTheme');
const winResults = JSON.parse(localStorage.getItem('winResults'));
const savedGame = JSON.parse(localStorage.getItem('savedGame'));
localStorage.clear();

if (winResults) {
	localStorage.setItem('winResults', JSON.stringify(winResults));
}

if (savedGame) {
	localStorage.setItem('savedGame', JSON.stringify(savedGame));
}

if (currentTheme) {
	localStorage.setItem('currentTheme', `${currentTheme}`);
}

generateHtml();
createGameGrid();
setPuzzleNames();
burgerHandler();

let easyLevel = [];
let mediumLevel = [];
let hardLevel = [];

sortPuzzlesByLevel(easyLevel, mediumLevel, hardLevel);
//RESIZE 
window.addEventListener('DOMContentLoaded', (e) => {
	window.addEventListener('resize', () => {
		const gameContainerWidth =
			document.querySelector('.game__container').clientWidth;
		const gameContentWidth =
			document.querySelector('.game__wrap-outer').clientWidth;
		const gameContainer = document.querySelector('.game__container');
		const gameCells = Array.from(document.querySelectorAll('.game__cell'));
		const cluesCells = Array.from(document.querySelectorAll('.clues__item'));
		const size = Math.sqrt(gameCells.length);

		const cluesRowWrap = Array.from(
			document.querySelectorAll('.clues__items-wrap_rows')
		);

		const cluesColsWrap = Array.from(
			document.querySelectorAll('.clues__items-wrap_cols')
		);

		let  cellWidth;
		if (window.screen.width <= 600) {
			cellWidth =
				size === 5
					? gameContentWidth / 2 / size
					: size === 10
					? gameContentWidth / 1.8 / size
					: gameContentWidth / 1.6 / size;

		} else if (window.screen.width <= 700) {
			cellWidth =
				size === 5
					? gameContentWidth / 2.5 / size
					: size === 10
					? gameContentWidth / 2 / size
					: gameContentWidth / 2 / size;

		} else if (window.screen.width <= 900) {
			cellWidth =
				size === 5
					? gameContentWidth / 2.5 / size
					: size === 10
					? gameContentWidth / 2.4 / size
					: gameContentWidth / 2.3 / size;

		} else {
			cellWidth =
				size === 5
					? gameContentWidth / 2.8 / size
					: size === 10
					? gameContentWidth / 2.6 / size
					: gameContentWidth / 2.5 / size;
		}

		cluesRowWrap.forEach(wrap => {
			wrap.style.height = cellWidth + 'px';
		});

		cluesColsWrap.forEach(wrap => {
			wrap.style.width = cellWidth + 'px';
		});

		gameCells.forEach(cell => {
			cell.style.width = cellWidth + 'px';
			cell.style.height = cellWidth + 'px';
		});

		cluesCells.forEach(item => {
			item.style.width = cellWidth + 'px';
			item.style.height = cellWidth + 'px';
		});
		const levelButton = document.querySelector('.settings__level');
		const levelButtonText = document.querySelector('.level__header-text');
		const puzzleButton = document.querySelector('.settings__hint');

		if (window.screen.width <= 500) {
			levelButtonText.textContent = 'Level';
		} else if (window.screen.width > 500) {
			levelButtonText.textContent = 'Select Level';
		}

		//SCORE TABLE
		const headerRow = document.querySelector('.score__headers-items');
		if (window.screen.width <= 500) {
			headerRow.cells[0].textContent = '';
			headerRow.cells[3].textContent = 'Level';
		} else if (window.screen.width > 500) {
			headerRow.cells[0].textContent = 'Position';
			headerRow.cells[3].textContent = 'Complexity';
		}
	});


	document.querySelector('.select__hint').addEventListener('click', (e) => {
		e.preventDefault();
		//CHOOSE PUZZLE BY NAME
		if (
			e.target.closest('.hint__header') ||
			e.target.classList.contains('select__hint')
		) {
			document
				.querySelector('.hint__body')
				.classList.toggle('hint__body-active');
		} else if (e.target.classList.contains('options__value')) {
			choosePuzzleByName(e);
		}
	});

	document.querySelector('.level').addEventListener('click', (e) => {
		//CHOOSE LEVEL
		if (
			e.target.closest('.level__header') ||
			e.target.classList.contains('settings__level')
		) {
			document
				.querySelector('.level__body')
				.classList.toggle('level__body-active');
		} else if (e.target.classList.contains('level__value')) {
			choosePuzzleLevel(e, easyLevel, mediumLevel, hardLevel);
		}
	});

	//SAVE - RESUME GAME
	document.querySelector('.save-btn').addEventListener('click', (e) => {
		saveGame();
	});
	document.querySelector('.resume-btn').addEventListener('click', e => {
		resumeSavedGame();
	});
})

//MODAL
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal__btn');
const overlay = document.querySelector('.modal__overlay');
modalButton.addEventListener('click', () => {
	modal.classList.remove('show');
	document.body.classList.remove('no-scroll');
});
overlay.addEventListener('click', () => {
	modal.classList.remove('show');
	document.body.classList.remove('no-scroll');
});

//THEME SWITCHER 
const themeSwitcher = document.querySelector('.theme-switcher');
themeSwitcher.addEventListener('click', switchTheme);

// SHOW SOLUTION
const solutionBtn = document.querySelector('.show-solution-btn');
solutionBtn.addEventListener('click', showSolution);

// GET RANDOM PUZZLE
const randomBtn = document.querySelector('.random-btn');
randomBtn.addEventListener('click', getRandomPuzzle);

// RESTART GAME
const restartBtn = document.querySelector('.restart-btn');
restartBtn.addEventListener('click', restartGame);

// SHOW/HIDE SCORE
const scoreBtn = document.querySelector('.info__score');
const scoreCloseBtn = document.querySelector('.score__btn');
const scoreOverlay = document.querySelector('.score__overlay');
scoreBtn.addEventListener('click', toggleScoreModal);
scoreCloseBtn.addEventListener('click', toggleScoreModal);
scoreOverlay.addEventListener('click', () => {
	document.querySelector('.score').classList.remove('show');
	document.body.classList.remove('no-scroll');
});

// VOLUME
const volumeBtn = document.querySelector('.button.info__volume');
volumeBtn.addEventListener('click', () => {
	if (isMuted) {
		isMuted = false;
		volumeBtn.classList.remove('mute');
	} else {
		isMuted = true;
		volumeBtn.classList.add('mute');
	}
});