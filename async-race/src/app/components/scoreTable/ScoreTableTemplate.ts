import classes from './ScoreTable.module.css';

export default function createScoreTableTemplate(): string {
  return `
  <table class="${classes.scoreTable}">
    <thead class="${classes.scoreHeaders}">
      <tr class="${classes.scoreHeadersItems}">
        <th class="${classes.scoreHeadersPosition} scope="col" id="colNum">№.</th>
        <th class="${classes.carImg} scope="col" id="carImg">Car</th>
        <th class="${classes.carName} scope="col" id="carName">Car Name</th>
        <th class="${classes.winsCount} scope="col" id="winsCount">Wins <span></span></th>
        <th class="${classes.timeValue} scope="col" id="timeValue">Time, s <span data-sorted="ASC"></span></th>
      </tr>
    </thead>
    <tbody class="${classes.scoreTableBody}">
      
    </tbody>
    <tfoot class="${classes.scoreFooter}">
    </tfoot>
  </table>
  `;
}
