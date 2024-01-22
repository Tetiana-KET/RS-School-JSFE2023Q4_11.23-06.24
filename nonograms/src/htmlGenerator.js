import createFooterHtml from './footerTemplate';
import createHeaderHtml from './headerTemplate';

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
	main.textContent = 'main';

	const footer = document.createElement('footer');
	footer.classList.add('footer');
	siteWrapper.append(footer);
	footer.innerHTML = createFooterHtml();


}
