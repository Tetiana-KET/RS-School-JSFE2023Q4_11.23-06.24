import {gameTemplates} from './gameTemplates';

export default function createGameGrid() {
  // const puzzleTemplate = 
  const gridSize = 5;
  const gameContent = document.querySelector('.game__content');
  const gameGrid = new Array(gridSize).fill(new Array(gridSize).fill(0));

  gameGrid.forEach(line => {
    const gridLine = document.createElement('div');
    gridLine.classList.add('game__line');
    gameContent.append(gridLine);

    line.forEach(() => {
      const gridCell = document.createElement('div');
      gridCell.classList.add('game__cell');
      gridLine.append(gridCell);
    });
    gameContent.append(gridLine);
  });
  console.log(gameTemplates[0].dog);//5*5
}
