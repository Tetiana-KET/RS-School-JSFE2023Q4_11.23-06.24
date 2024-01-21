export default function generateHtml() {
	console.log('Hello world!');
	const page = document.createElement('main');
	page.classList.add('page');
	document.body.prepend(page);

	// container
	const container = document.createElement('div');
	container.classList.add('container');
	page.prepend(container);

	const header = document.createElement('div');
	header.classList.add('header');
	container.prepend(header);
	header.textContent = 'Проверка связи';
}
