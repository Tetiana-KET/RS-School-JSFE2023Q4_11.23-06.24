import createGameGrid from './createGameGrid';
import { stopTimer } from './timerHandlers';

export default function restartGame() {
  stopTimer();
  localStorage.setItem('isResetGame', 'true');
  const currentGame = JSON.parse(localStorage.getItem('currentGame'));
  currentGame.duration = `${localStorage.getItem('duration')}`;
  const gameTimer = document.querySelector('.settings__timer');
  currentGame.time = `${gameTimer.textContent}`;

  let isSolutionPressed = localStorage.getItem('isSolutionPressed');


  console.log(`game process (only filled cells) were reset`);
  console.log(`restart game from saved time ${currentGame.time}`);
  console.log(`--------------------------------`);

  const newCurrentPuzzle = JSON.parse(currentGame.currentPuzzle);
  const newCurrentPuzzleName = currentGame.currentName;
  const newGridSize = newCurrentPuzzle.length;
  const newLineClues = JSON.parse(currentGame.rowClues);
  const newColumnClues = JSON.parse(currentGame.colClues);

  const gameContent = document.querySelector('.game__content');
  const gameClueTop = document.querySelector('.clues-columns-wrap');
  const gameClueAside = document.querySelector('.clues-rows-wrap');

  gameContent.innerHTML = '';
  gameClueTop.innerHTML = '';
  gameClueAside.innerHTML = '';

  createGameGrid(
    newCurrentPuzzle,
    newCurrentPuzzleName,
    newGridSize,
    newLineClues,
    newColumnClues
  );

  localStorage.setItem('isSolutionPressed', `${isSolutionPressed}`);

  document.querySelector('.settings__timer').textContent = currentGame.time;
}