export default function choosePuzzleLevel(e, easy, medium, hard) {

  document.querySelector('.level__body').classList.remove('level__body-active');
  document.querySelector('.level__header-text').textContent = e.target.getAttribute('value');

  const selectOptions = document.querySelector('.select-options');
  selectOptions.innerHTML = '';

  if (e.target.getAttribute('value').toLowerCase() === 'easy') {
		easy.forEach(item => {
			selectOptions.appendChild(item.cloneNode(true));
		});
	} else if (e.target.getAttribute('value').toLowerCase() === 'medium') {
		medium.forEach(item => {
			selectOptions.appendChild(item.cloneNode(true));
		});
	} else if (e.target.getAttribute('value').toLowerCase() === 'hard') {
		hard.forEach(item => {
			selectOptions.appendChild(item.cloneNode(true));
		});
	}
}