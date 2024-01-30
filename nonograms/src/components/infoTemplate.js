export default function createInfoHtml() {
	return `
    <div class="info__container">
      <ul class="info-wrap">
        <li class="info__item">
          <button type="button" class="button info__score"></button>
        </li>
        <li class="info__progress-bar">
          <div class="progress-bar"></div>
        </li>
        <li class="info__item">
          <button type="button" class="button info__volume"></button>
        </li>
      </ul>
    </div>
  `;
}
