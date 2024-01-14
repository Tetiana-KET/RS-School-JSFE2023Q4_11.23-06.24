//KEY
const keyList = [
	'q',
	'w',
	'e',
	'r',
	't',
	'y',
	'u',
	'i',
	'o',
	'p',
	'a',
	's',
	'd',
	'f',
	'g',
	'h',
	'j',
	'k',
	'l',
	'z',
	'x',
	'c',
	'v',
	'b',
	'n',
	'm',
];

function initGame() {
	const page = document.createElement('main');
	page.classList.add('page');
	document.body.prepend(page);

	// container
	const container = document.createElement('div');
	container.classList.add('container');
	page.prepend(container);

	// image
	const pictureWrap = document.createElement('figure');
	pictureWrap.classList.add('picture-wrap');
	container.prepend(pictureWrap);

	const image = document.createElement('img');
	image.classList.add('picture-wrap__img');
	image.setAttribute('src', '../hangman/assets/icons/hangman-0.svg');
	image.setAttribute('alt', 'hangman game picture');
	pictureWrap.prepend(image);

	const gameTitle = document.createElement('figcaption');
	gameTitle.classList.add('picture-wrap__title');
	pictureWrap.append(gameTitle);
	gameTitle.textContent = 'Hangman Game';

	//game-wrapper
	const gameWrap = document.createElement('section');
	gameWrap.classList.add('game-wrap', 'game');
	container.append(gameWrap);

	//secret word
	const secretWord = document.createElement('ul');
	secretWord.classList.add('game__secret-word');
	gameWrap.append(secretWord);

	// hint
	const hintWrap = document.createElement('div');
	hintWrap.classList.add('game__hint-wrap');
	gameWrap.append(hintWrap);

	const hintTitle = document.createElement('p');
	hintTitle.classList.add('hint__title');
	hintWrap.append(hintTitle);
	hintTitle.textContent = 'Hint:';

	const hintText = document.createElement('h2');
	hintText.classList.add('hint__title-text');
	hintWrap.append(hintText);
	hintText.textContent = 'lorem lorem lorem';

	// incorrect guesses count
	const countWrap = document.createElement('div');
	countWrap.classList.add('game__count-wrap');
	gameWrap.append(countWrap);

	const guessesCountText = document.createElement('p');
	guessesCountText.classList.add('game__count-text');
	countWrap.append(guessesCountText);
	guessesCountText.textContent = 'Incorrect guesses:';

	const guessesCount = document.createElement('p');
	guessesCount.classList.add('game__count');
	countWrap.append(guessesCount);

	//keyboard
	const keyboard = document.createElement('div');
	keyboard.classList.add('game__keyboard', 'keyboard');
	gameWrap.append(keyboard);

	keyList.forEach((elem, i, arr) => {
		const key = document.createElement('button');
		key.setAttribute('type', 'button');
		key.setAttribute('data', `${elem}`);
		key.setAttribute('id', `${elem}`);
		key.classList.add('button', 'keyboard__key');
		key.textContent = arr[i];
		keyboard.append(key);
	});
}
export { initGame };
export { keyList };