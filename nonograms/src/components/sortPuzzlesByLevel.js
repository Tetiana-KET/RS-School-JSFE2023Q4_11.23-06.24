export default function sortPuzzlesByLevel(
	easyLevelValues,
	mediumLevelValues,
	hardLevelValues
) {
	const optionsValues = document.querySelectorAll('.options__value');
	easyLevelValues.push(...Array.from(optionsValues).filter(element => {
		return element.getAttribute('size') === '5';
	}));

	mediumLevelValues.push(...Array.from(optionsValues).filter(element => {
		return element.getAttribute('size') === '10';
	}));

	hardLevelValues.push(...Array.from(optionsValues).filter(element => {
		return element.getAttribute('size') === '15';
	}));
}
