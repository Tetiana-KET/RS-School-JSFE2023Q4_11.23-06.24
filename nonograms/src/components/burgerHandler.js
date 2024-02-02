export default function burgerHandler() {
	const burger = document.querySelector('.burger');
	const settingsButtonsWrap = document.querySelector('.settings-btns-wrap');
  const settingsButtons = document.querySelectorAll('.buttons-settings');

  function openBurgerMenu() {
    burger.classList.add('burger-open');
    settingsButtonsWrap.classList.add('menu-open');
  }
    
  function closeBurgerMenu() {
    burger.classList.remove('burger-open');
    settingsButtonsWrap.classList.remove('menu-open');
  }

  function toggleBurgerMenu() {
    if (burger.classList.contains('burger-open')) {
			closeBurgerMenu();
		} else {
			openBurgerMenu();
		}
  }

  settingsButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeBurgerMenu();
    });
  })

  burger.addEventListener('click', toggleBurgerMenu);
}