export default function createModalHtml() {
	return `
    <div class="modal__overlay"></div>
    <div class="modal__content modal-content">
      <div class="modal-content__content">
        <h2 class="modal-title">You Win!</h2>
        <p class="modal-text">Congratulations</p>
        <p class="modal-text message">
          You have solved this puzzle in <span class="message-time">00:01:31</span>
        </p>
        <button class="button modal__btn" type="button">OK</button>
      </div>
    </div>

  `;
}
