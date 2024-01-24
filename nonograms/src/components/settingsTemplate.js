export default function createSettingsHtml() {
	return `
    <div class="settings__container">
      <div class="settings__wrap">
        <div class="settings__level level">
          <div class="level__header">
            <div class="level__current">
              Select Level
              <span class="level__header-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" fill="#e8cba8"/>
                  <path d="M8.00003 8.99997L6.00002 7.00008" stroke="#5d4132ed" stroke-width="0.5" stroke-linecap="round"/>
                  <path d="M8 9L10 7" stroke="#5d4132ed" stroke-width="1" stroke-linecap="round"/>
                </svg>
              </span>
            </div>
          </div>
          <ul class="level__body"> 
            <li class="level__value" value="Easy">Easy 5*5</li>
            <li class="level__value" value="Medium">Medium 10*10</li>
            <li class="level__value" value="Hard">Hard 15*15</li>
          </ul>
        </div>
        <div class="settings__timer">00:00:00</div>
        <div class="settings__switcher switcher">
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
        </div>
      </div>
    </div>
  `;
}
