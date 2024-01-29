import createFooterHtml from './footerTemplate';
import createHeaderHtml from './headerTemplate';
import createSettingsHtml from './settingsTemplate';
import createInfoHtml from './infoTemplate';

export default function generateHtml() {
	const siteWrapper = document.createElement('div');
	siteWrapper.classList.add('site-wrapper');
	document.body.prepend(siteWrapper);

	const header = document.createElement('header');
	header.classList.add('header');
	siteWrapper.prepend(header);
	header.innerHTML = createHeaderHtml();

	const main = document.createElement('main');
	main.classList.add('main');
	siteWrapper.append(main);

	const footer = document.createElement('footer');
	footer.classList.add('footer');
	siteWrapper.append(footer);
	footer.innerHTML = createFooterHtml();

	const mainSettings = document.createElement('section');
	mainSettings.classList.add('main__settings');
	main.append(mainSettings);
	mainSettings.innerHTML = createSettingsHtml();

	const mainGame = document.createElement('section');
	mainGame.classList.add('main__game', 'game');
	main.append(mainGame);
	const container = document.createElement('div');
	container.classList.add('game__container');
	mainGame.append(container);

	const gameOuterWrapper = document.createElement('div');
	gameOuterWrapper.classList.add('game__wrap-outer');
	container.append(gameOuterWrapper);

	const gameClueAside = document.createElement('div');
	gameClueAside.classList.add('game__clues', 'clues-rows-wrap');
	gameOuterWrapper.prepend(gameClueAside);

	const gameWrapper = document.createElement('div');
	gameWrapper.classList.add('game__wrap');
	gameOuterWrapper.append(gameWrapper);

	const gameClueTop = document.createElement('div');
	gameClueTop.classList.add('game__clues', 'clues-columns-wrap');
	gameWrapper.prepend(gameClueTop);

	const gameContent = document.createElement('div');
	gameContent.classList.add('game__content');
	gameWrapper.append(gameContent);

	const mainInfo = document.createElement('section');
	mainInfo.classList.add('main__info');
	main.append(mainInfo);
	mainInfo.innerHTML = createInfoHtml();
}
