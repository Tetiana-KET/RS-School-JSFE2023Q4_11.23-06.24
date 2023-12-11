"use strict"

import productsData from './products.js';
import createMenuCard from './menuCardTemplate.js';
import createMenuModalTemplate from './menuModalTemplate.js';

window.addEventListener('DOMContentLoaded', () => {
	const body = document.body;
	const burgerButton = document.querySelector('.header__burger');
	const headerBurgerMenu = document.querySelector('.nav__body');

	const menuRefreshBtn = document.querySelector('.menu__refresh-btn');
	const menuTriggers = Array.from(document.querySelectorAll('.trigger'));
	const menuList = document.querySelector('.menu__items');
	const cardsPerPage = 4;
	let currentItems = [];
	let chosenCategory = 'coffee';

	const modal = document.querySelector('.modal');
	const modalContent = document.querySelector('.modal__content');

	function lockBodyScroll() {
		body.classList.add('no-scroll');
	}

	function unlockBodyScroll() {
		body.classList.remove('no-scroll');
	}

	function toggleHeaderMenu() {
		if (burgerButton.classList.contains('menu-open')) {
			closeBurgerMenu();
		} else {
			openBurgerMenu();
		}
	}

	function openBurgerMenu() {
		headerBurgerMenu.classList.add('header__nav_open');
		burgerButton.classList.add('menu-open');
		lockBodyScroll();
	}

	function closeBurgerMenu() {
		headerBurgerMenu.classList.remove('header__nav_open');
		burgerButton.classList.remove('menu-open');
		unlockBodyScroll();
	}

	function checkBurgerMenu() {
		if (window.screen.width >= 769) {
			closeBurgerMenu();
		}
	}

	function getCurrentItems() {
		currentItems = productsData.filter(
			item => item.category === chosenCategory
		);
	}
	getCurrentItems();

	function createMenuItem(item, i) {
		const menuItem = document.createElement('figure');
		menuItem.classList.add('menu__item', 'menu-item');
		menuItem.innerHTML = createMenuCard(chosenCategory, i, item);
		menuList.append(menuItem);
		menuItem.addEventListener('click', () => {
			createModalContent(menuItem, item);
			showModal();
		});
	}

	function createModalContent(card, item) {
		modalContent.innerHTML = createMenuModalTemplate(card, item);

		const sizeBtns = document.querySelectorAll('.size__btn');
		const additiveBtns = document.querySelectorAll('.additive__btn');
		
		let initialPrice = parseFloat(item.price);
	
		sizeBtns.forEach((btn, i) => {
			btn.addEventListener('click', () => {
				sizeBtns.forEach(btn => {
					btn.classList.remove('modal-card__btn_active');
				});
				btn.classList.add('modal-card__btn_active');
				let additionalPrice = parseFloat(Object.values(item.sizes)[i]['add-price']);
				updateTotalPrice(initialPrice, additionalPrice);

				additiveBtns.forEach((btn) => {
					btn.classList.remove('modal-card__btn_active');
					btn.removeAttribute('selected');
				});
			});
		});

		additiveBtns.forEach((btn, i) => {

			btn.addEventListener('click', () => {
				let additionalPrice = parseFloat(Object.values(item.additives)[i]['add-price']);
				const totalPrice = document.querySelector('.price-sum');

				if (btn.hasAttribute('selected')) {
					btn.classList.remove('modal-card__btn_active');
					btn.removeAttribute('selected');
					let initialPrice = Number(totalPrice.textContent.slice(1));
					initialPrice -= additionalPrice;
					totalPrice.textContent = `$${initialPrice.toFixed(2)}`;
				} else {
					btn.classList.add('modal-card__btn_active');
					btn.setAttribute('selected', true);
					let initialPrice = Number(totalPrice.textContent.slice(1));
					initialPrice += additionalPrice;
					totalPrice.textContent = `$${initialPrice.toFixed(2)}`;
				}
			});
		});
	}

	function updateTotalPrice(initial, additional) {
		const totalPrice = document.querySelector('.price-sum');
		const finalCost = (initial + additional).toFixed(2);
		totalPrice.textContent = `$${finalCost}`;
		initial = finalCost;
	}

	function showModal() {
		modal.classList.add('modal_active');
		lockBodyScroll();
	}

	function hideModal() {
		modal.classList.remove('modal_active');
		unlockBodyScroll();
	}

	function createPageContent(currItems) {
		menuList.innerHTML = '';
		currItems.forEach((item, i) => {
			createMenuItem(item, i);
		});

		if (window.innerWidth <= 768) {
			if (menuList.children.length > cardsPerPage) {
				menuRefreshBtn.classList.add('menu__refresh-btn_visible');
			} else {
				menuRefreshBtn.classList.remove('menu__refresh-btn_visible');
			}
			hideAdditionalItems();
		}
	}
	createPageContent(currentItems);

	function hideAdditionalItems() {
		Array.from(menuList.children)
			.slice(cardsPerPage)
			.forEach(el => el.classList.add('menu__items_hidden'));
	}

	function loadMoreItems() {
		Array.from(menuList.children).forEach(item => {
			item.classList.remove('menu__items_hidden');
		});
	}

	// EVENT LISTENERS

	menuTriggers.forEach(trigger => {
		trigger.addEventListener('click', () => {
			menuTriggers.forEach(btn => {
				btn.classList.remove('menu__type_checked', 'disabled');
			});
			trigger.classList.add('menu__type_checked', 'disabled');
			chosenCategory = trigger.textContent.trim().toLowerCase();
			menuList.style.opacity = 0;
			setTimeout(() => {
				getCurrentItems();
				createPageContent(currentItems);
				menuList.style.opacity = 1;
			}, 300);
		});
	});

	window.addEventListener('resize', checkBurgerMenu);

	window.addEventListener('resize', () => {
		if (window.innerWidth <= 768) {
			if (menuList.children.length > cardsPerPage) {
				menuRefreshBtn.classList.add('menu__refresh-btn_visible');
			} else {
				menuRefreshBtn.classList.remove('menu__refresh-btn_visible');
			}
			hideAdditionalItems();
		} else {
			menuRefreshBtn.classList.remove('menu__refresh-btn_visible');
			loadMoreItems();
		}
	});

	menuRefreshBtn.addEventListener('click', () => {
		menuRefreshBtn.classList.remove('menu__refresh-btn_visible');
		loadMoreItems();
	});

	body.addEventListener('click', e => {
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
		if (
			e.target.classList.contains('modal__overlay') ||
			e.target.classList.contains('modal-close')
		) {
			hideModal();
		}
	});
})