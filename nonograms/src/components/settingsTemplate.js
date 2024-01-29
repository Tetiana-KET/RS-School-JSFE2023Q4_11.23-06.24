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
        <div class="settings__hint select__hint">
          <div class="hint__wrap">
            <div class="hint__header">
              <div class="hint__header-content">
                <span class="hint__name">Select Image</span>
                <span class="hint__icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" fill="#e8cba8"></circle>
                    <path d="M8.00003 8.99997L6.00002 7.00008" stroke="#5d4132ed" stroke-width="0.5" stroke-linecap="round"></path>
                    <path d="M8 9L10 7" stroke="#5d4132ed" stroke-width="1" stroke-linecap="round"></path>
                  </svg>
                </span>
              </div>
            </div>
            <ul class="hint__body select-options"></ul>
          </div>
        </div>
      </div>
    </div>
  `;
}
