"use strict"
window.addEventListener('DOMContentLoaded', () => {

  const body = document.body;
  const burgerButton = document.querySelector('.header__burger');
  const headerBurgerMenu = document.querySelector('.nav__body');
  const overlay = document.querySelector('.overlay');



	function lockBodyScroll () {
		body.classList.add('no-scroll');
	}

	function unlockBodyScroll () {
		body.classList.remove('no-scroll');
	}

  function toggleHeaderMenu () {

		if (burgerButton.classList.contains('menu-open')) {
			closeBurgerMenu();
		} else {
			openBurgerMenu();
		}
	}

	function openBurgerMenu () {
		headerBurgerMenu.classList.add('header__nav_open');
		burgerButton.classList.add('menu-open');
		lockBodyScroll();
	}

	function closeBurgerMenu () {
		headerBurgerMenu.classList.remove('header__nav_open');
		burgerButton.classList.remove('menu-open');
		unlockBodyScroll();
	}

	function checkBurgerMenu () {
		if (window.screen.width >= 769) {
			closeBurgerMenu();
		}
	}

  window.addEventListener('resize', checkBurgerMenu);

  body.addEventListener('click', (e) => {

		if (window.screen.width <= 768) {
			if (
				e.target.classList.contains('burger') ||
				e.target.classList.contains('burger__line') ||
				e.target.classList.contains('nav__link') ||
				e.target.classList.contains('menu__link')
			) {
				e.stopPropagation();
				toggleHeaderMenu();
			}
		}

    
		
  });
})