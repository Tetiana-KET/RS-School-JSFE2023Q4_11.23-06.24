export default function createInfoHtml() {
	return `
    <div class="info__container">
      <ul class="info-wrap">
        <li class="info__item">
          <button type="button" class="button info__score"></button>
        </li>
        <li class="info__switcher switcher">
          <button class="button switcher__theme-name">
            Dark
          </button>
          <label class="switcher__button">
            <input type="checkbox" id="theme-switcher">
            <span class="switcher__slider-wrap"></span>
          </label>
          <button class="button switcher__theme-name">
            Light
          </button>
        </li>
        <li class="info__item">
          <button type="button" class="button info__volume"></button>
        </li>
      </ul>
    </div>
  `;
}
