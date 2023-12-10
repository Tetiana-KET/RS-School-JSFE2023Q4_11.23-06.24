"use strict"

import productsData from './products.js';
import createMenuCard from './menuCardTemplate.js';

window.addEventListener('DOMContentLoaded', () => {

	const body = document.body;
	const burgerButton = document.querySelector('.header__burger');
	const headerBurgerMenu = document.querySelector('.nav__body');

	const menuRefreshBtn = document.querySelector('.menu__refresh-btn');
	const menuTriggers = Array.from(document.querySelectorAll('.trigger'));
	const menuList = document.querySelector('.menu__items');
	let currentItems = [];
	let chosenCategory = 'coffee';


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
	}

	function createPageContent(currItems) {
		menuList.innerHTML = '';
		currItems.forEach((item, i) => {
			createMenuItem(item, i);
		});
	}
	createPageContent(currentItems);

	// EVENT LISTENERS

	menuTriggers.forEach((trigger) => {
		trigger.addEventListener('click', () => {
			menuTriggers.forEach((btn) => {
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
		})	
	});

	window.addEventListener('resize', checkBurgerMenu);

	window.addEventListener('resize', () => {
		if (window.screen.width <= 768) {
			menuRefreshBtn.classList.add('menu__refresh-btn_visible');
		}
		if (window.screen.width > 768) {
			menuRefreshBtn.classList.remove('menu__refresh-btn_visible');
		}
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
	});
})