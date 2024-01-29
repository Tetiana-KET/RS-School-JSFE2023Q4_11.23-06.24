import { gameTemplates } from './gameTemplates';
const puzzleDataEntries = [];
export default function setPuzzleNames() {

	const selectOptions = document.querySelector('.select-options');

  gameTemplates.forEach((level, i) => {
    puzzleDataEntries.push(...Object.entries(level));
  });

  puzzleDataEntries.forEach((entry, i) => {
    let puzzleName = puzzleDataEntries[i][0];
		const size = entry[1].length;
		const option = document.createElement('li');
    option.classList.add('options__value');
    option.setAttribute('size', `${size}`);
    option.setAttribute('name', `${puzzleName}`);
    option.setAttribute('index', `${i}`);
    puzzleName = puzzleName.charAt(0).toUpperCase() + puzzleName.slice(1);
    option.textContent = `${puzzleName} ${size}*${size}`;
    selectOptions.append(option);
	})
}
export { puzzleDataEntries };
