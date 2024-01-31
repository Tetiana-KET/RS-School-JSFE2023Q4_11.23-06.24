// @ts-nocheck
import './normalize.css';
import './style.css';
import generateHtml from './components/htmlGenerator.js';
import createGameGrid from './components/createGameGrid';
import setPuzzleNames from './components/setPuzzleNames';
import choosePuzzleByName from './components/choosePuzzleByName';
import sortPuzzlesByLevel from './components/sortPuzzlesByLevel';
import choosePuzzleLevel from './components/choosePuzzleLevel';

generateHtml();
createGameGrid();
setPuzzleNames();

let easyLevel = [];
let mediumLevel = [];
let hardLevel = [];

sortPuzzlesByLevel(easyLevel, mediumLevel, hardLevel);

window.addEventListener('DOMContentLoaded', (e) => {
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