import { gameTemplates } from './gameTemplates';
export default function setPuzzleNames() {

	const selectOptions = document.querySelector('.select-options');

  gameTemplates.forEach((level) => {
    
    const size = Object.values(level)[0].length;

    Object.keys(level).forEach((puzzleName) => {

      puzzleName = puzzleName.charAt(0).toUpperCase() + puzzleName.slice(1);

      const option = document.createElement('li');
      option.classList.add('options__value');
      option.textContent = `${puzzleName} ${size}*${size}`;
      selectOptions.append(option);
    })
  });
}
