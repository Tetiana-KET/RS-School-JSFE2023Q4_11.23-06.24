export default function createScoreTableTemplate() {
	return `
    <div class="score__overlay"></div>
    <div class="score__content-wrap">
      <table class="score__table">
        <caption class="score__title">
          Last win results
        </caption>
        <thead class="score__headers">
          <tr class="score__headers-items">
            <th class="score__headers-position scope="col">Position</th>
            <th scope="col">Date</th>
            <th scope="col">Solved puzzle</th>
            <th scope="col">Complexity</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody class="score__table-body">
          <tr class="score__row">
            <th scope="row">1.</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="score__row">
            <th scope="row">2.</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="score__row">
            <th scope="row">3.</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="score__row">
            <th scope="row">4.</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="score__row">
            <th scope="row">5.</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tfoot class="score__footer">
          <tr>
            <th scope="row" colspan="4">Average duration</th>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <button class="button score__btn" type="button">OK</button>
    </div>
  `;
}
