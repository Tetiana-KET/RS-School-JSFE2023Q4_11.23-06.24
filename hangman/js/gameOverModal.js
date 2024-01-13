function createGameOverModal () {

  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.prepend(modal);
  //overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal__overlay');
  modal.prepend(modalOverlay);
  //content
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content', 'modal-content');
  modal.append(modalContent);

  const imgWrap = document.createElement('div');
	imgWrap.classList.add('modal-content__img-wrap');
	modalContent.append(imgWrap);

  const image = document.createElement('img');
	image.classList.add('modal-content__img');
  image.setAttribute('alt', 'game result icon');
	imgWrap.append(image);

  const textContent = document.createElement('div');
	textContent.classList.add('modal-content__text');
	modalContent.append(textContent);

  const textContentTitle = document.createElement('h2');
	textContentTitle.classList.add('modal-content__title');
	textContent.append(textContentTitle);

  const textContentMessage = document.createElement('p');
	textContentMessage.classList.add('modal-content__message');
  textContentMessage.textContent = 'The correct word was: ';
	textContent.append(textContentMessage);

  const textContentAnswer = document.createElement('span');
	textContentAnswer.classList.add('modal-content__answer');
	textContentMessage.append(textContentAnswer);

  const modalButton = document.createElement('button');
	modalButton.classList.add('button', 'try-again-btn');
  modalButton.setAttribute('type', 'button');
  modalButton.textContent = 'Play again';
	textContent.append(modalButton);
}

function showGameOverModal(isVictory) {
  const textContentTitle = document.querySelector('.modal-content__title');
	textContentTitle.textContent = isVictory ? 'You won!' : 'You lose!';
  const image = document.querySelector('.modal-content__img');
  image.src = `../hangman/assets/images/${isVictory ? 'victory' : 'lost'}.gif`

  document.querySelectorAll('.keyboard__key').forEach((button) => {
    button.disabled = true;
  });
  setTimeout(()=> {
    const modal = document.querySelector('.modal');
    modal.classList.add('show');
  }, 500)
}

export { createGameOverModal, showGameOverModal };
