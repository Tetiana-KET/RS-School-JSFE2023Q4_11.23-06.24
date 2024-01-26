import { gameTemplates } from './gameTemplates';

export default function getRandomNumber() {

	let max = 0;

	gameTemplates.forEach(level => {
		max += Object.values(level).length;
	});
	return Math.floor(Math.random() * max);
}
