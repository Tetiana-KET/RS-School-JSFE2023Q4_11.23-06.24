"use strict"
window.addEventListener('DOMContentLoaded', () => {
	// initSlider();

	const body = document.body;
	const burgerButton = document.querySelector('.header__burger');
	const headerBurgerMenu = document.querySelector('.nav__body');

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

	// SLIDER

	const arrows = document.querySelectorAll('.favorite__arrows');
	const slider = document.querySelector('.slider');
	const sliderTrack = document.querySelector('.slider__items');
	const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
	const sliderDots = Array.from(document.querySelectorAll('.pagination__item'));

	let position = 0;
	let dotIndex = 0;
	let translateX = 0;
	let width = slider.clientWidth;
	let progressIntervalId;

	function setActiveDot(dotIndex) {
		clearInterval(progressIntervalId);

		sliderDots.forEach(dot => {
			dot.classList.remove('pagination__item_active');
			dot.querySelector('.pagination__progress').style.width = '0%';
		});

		sliderDots[dotIndex].classList.add('pagination__item_active');
		resetProgress();
	}

	function setNextSlide() {
		position += 1;
		dotIndex += 1;

		if (position >= sliderItems.length) {
			position = 0;
			dotIndex = position;
		}

		moveSlider();
		setActiveDot(dotIndex);
	}

	function setPrevSlide() {
		position -= 1;
		dotIndex -= 1;

		if (position < 0) {
			position = sliderItems.length - 1;
			dotIndex = position;
		}

		moveSlider();
		setActiveDot(dotIndex);
	}

	function moveSlider() {
		translateX = -position * width;
		sliderTrack.style.transform = `translateX( ${translateX}px)`;
	}

	function progressRun(progressWidth = 0) {
		const activeSliderDot = document.querySelector('.pagination__item_active');
		const paginationProgress = activeSliderDot.querySelector(
			'.pagination__progress'
		);

		let paginationProgressWidth = parseInt(progressWidth);

		progressIntervalId = setInterval(() => {
			if (paginationProgressWidth > 100) {
				clearInterval(progressIntervalId);
				paginationProgressWidth = 0;
				paginationProgress.style.width = paginationProgressWidth + 'px';
				setNextSlide();
			} else {
				paginationProgressWidth += 1;
				paginationProgress.style.width = paginationProgressWidth + '%';
			}
		}, 50);
	}

	progressRun();

	function resetProgress() {
		clearInterval(progressIntervalId);

		progressRun(
			document.querySelector(
				'.pagination__item.pagination__item_active>.pagination__progress'
			).style.width
		);
	}

	function pauseProcess () {
		clearInterval(progressIntervalId);
	}

	// EVENT LISTENERS
	slider.addEventListener('mouseleave', () => {
		resetProgress();
	});

	slider.addEventListener('mouseover', () => {
		pauseProcess();
		clearInterval(progressIntervalId);
	});

	arrows.forEach(arrow => {
		arrow.addEventListener('click', e => {
			if (e.target.closest('.arrow-left')) {
				setPrevSlide();
			} else if (e.target.closest('.arrow-right')) {
				setNextSlide();
			}
		});
	});

	window.addEventListener('resize', checkBurgerMenu);

	window.addEventListener('resize', () => {
		width = slider.clientWidth;
		resetProgress();
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