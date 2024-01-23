import createFooterHtml from './footerTemplate';
import createHeaderHtml from './headerTemplate';
import createSettingsHtml from './settingsTemplate';

export default function generateHtml() {

	const siteWrapper = document.createElement('div');
	siteWrapper.classList.add('site-wrapper');
	document.body.prepend(siteWrapper);

	// container
	const container = document.createElement('div');
	container.classList.add('container');

	const header = document.createElement('header');
	header.classList.add('header');
	siteWrapper.prepend(header);
	header.innerHTML = createHeaderHtml();

	const main = document.createElement('main');
	main.classList.add('main');
	siteWrapper.append(main);
	// main.textContent = 'main';

	const footer = document.createElement('footer');
	footer.classList.add('footer');
	siteWrapper.append(footer);
	footer.innerHTML = createFooterHtml();

	const mainSettings = document.createElement('section');
	mainSettings.classList.add('main__settings');
	main.append(mainSettings);
	mainSettings.textContent = 'settings';
	mainSettings.innerHTML = createSettingsHtml();

	const mainGame = document.createElement('section');
	mainGame.classList.add('main__game');
	main.append(mainGame);
	mainGame.textContent = 'mainGame';

	const mainInfo = document.createElement('section');
	mainInfo.classList.add('main__info');
	main.append(mainInfo);
	mainInfo.textContent = 'mainInfo';

}
