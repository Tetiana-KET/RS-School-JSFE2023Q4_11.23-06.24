export default function createInfoHtml() {
	return `
    <div class="info__container">
      <ul class="info-wrap">
        <li class="info__item">
          <button type="button" class="button info__score"></button>
        </li>

        <li class="info__item select__hint hint">
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
        </li>
        <li class="info__item">
          <button type="button" class="button info__volume"></button>
        </li>
      </ul>
    </div>
  `;
}
