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

		const cellWidth =
			size === 5
				? gameContentWidth / 3 / size
				: size === 10
				? gameContentWidth / 2.6 / size
				: gameContentWidth / 2.5 / size;

		gameContainer.style.height = gameContainerWidth + 'px';
		gameContainer.style.maxHeight = 500 + 'px';

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
});
overlay.addEventListener('click', () => {
	modal.classList.remove('show');
});

//THEME SWITCHER 
const themeSwitcher = document.querySelector('.theme-switcher');
themeSwitcher.addEventListener('click', switchTheme);

// SHOW SOLUTION
const solutionBtn = document.querySelector('.show-solution-btn');
solutionBtn.addEventListener('click', showSolution);
