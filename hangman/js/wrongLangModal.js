function createAlertModal() {
	const modalAlert = document.createElement('div');
	modalAlert.classList.add('modal', 'modal__alert');
	document.body.prepend(modalAlert);

	//overlay
	const modalOverlay = document.createElement('div');
	modalOverlay.classList.add('modal__overlay');
	modalAlert.prepend(modalOverlay);

	//content
	const modalContent = document.createElement('div');
	modalContent.classList.add('modal__content', 'modal-content');
	modalAlert.append(modalContent);

	const textContent = document.createElement('div');
	textContent.classList.add('modal-content__text');
	modalContent.append(textContent);

	const contentTitle = document.createElement('h2');
  contentTitle.textContent = 'OOPS!';
	textContent.append(contentTitle);

  const contentText = document.createElement('h3');
  contentText.textContent = 'Wrong keyboard layout!';
  textContent.append(contentText);

	const textContentMessage = document.createElement('h3');
	textContentMessage.textContent = 'The game is on English!';
	textContent.append(textContentMessage);

	const modalButton = document.createElement('button');
	modalButton.classList.add('button', 'ok-btn');
	modalButton.setAttribute('type', 'button');
	modalButton.textContent = 'OK';
	textContent.append(modalButton);
}
export { createAlertModal };
