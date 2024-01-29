import './normalize.css';
import './style.css';
import generateHtml from './components/htmlGenerator.js';
import createGameGrid from './components/createGameGrid';
import setPuzzleNames from './components/setPuzzleNames';
import choosePuzzleByName from './components/choosePuzzleByName';

generateHtml();
createGameGrid();
setPuzzleNames();

window.addEventListener('DOMContentLoaded', (e) => {
  document.querySelector('.select__hint ').addEventListener('click', (e) => {
    e.preventDefault();
    // @ts-ignore
    if (e.target.closest('.hint__header')) {
      document
        .querySelector('.hint__body')
        .classList.toggle('hint__body-active');
      console.log(e.target);
		// @ts-ignore
		} else if (e.target.classList.contains('options__value')) {
			choosePuzzleByName(e);
		}

  });

})
