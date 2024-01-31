export default function createHeaderHtml() {
  return `
    <div class="header___container">
      <div class="settings-btns-wrap">
        <button class="button buttons-settings">Play again</button>
        <button class="button buttons-settings">Last game</button>
        <button class="button buttons-settings">Reset game</button>
        <button class="button buttons-settings">Solution</button>
        <button class="button buttons-settings">Random</button>
        <div class="theme-switcher switcher">
          <button class="button switcher__theme-name theme-dark"></button>
          <label class="switcher__button">
            <input type="checkbox" id="theme-switcher">
            <span class="switcher__slider-wrap"></span>
          </label>
          <button class="button switcher__theme-name theme-light"></button>
        </div>
      </div>
  </div>
  `;
}
