export default function createModalHtml() {
	return `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__content modal-content">
        <div class="modal-content__content">
          <h2 class="modal-title">You Win!</h2>
          <p class="modal-text">Congratulations</p>
          <p class="modal-text">
            You have successfully solved this puzzle!
          </p>
          <button class="button modal__btn" type="button">OK</button>
        </div>
      </div>
  </div>
  `;
}
