export default function createHeaderHtml() {
  return `
    <div class="header___container">
      <button class="button header__burger burger" type="button">
        <span class="burger__line"></span>
        <span class="burger__line"></span>
      </button>
      <div class="settings-btns-wrap">
        <button class="button buttons-settings resume-btn">Continue</button>
        <button class="button buttons-settings restart-btn">Restart game</button>
        <button class="button buttons-settings show-solution-btn">Solution</button>
        <button class="button buttons-settings random-btn">Random</button>
      </div>
      <div class="theme-switcher switcher">
        <button class="button switcher__theme-name theme-dark"></button>
        <label class="switcher__button">
          <input type="checkbox" id="theme-switcher">
          <span class="switcher__slider-wrap"></span>
        </label>
        <button class="button switcher__theme-name theme-light"></button>
      </div>
  </div>
  `;
}
