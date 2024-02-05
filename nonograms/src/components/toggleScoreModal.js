import updateScoreTable from './updateScoreTable';
export default function toggleScoreModal () {
	updateScoreTable();
  const score = document.querySelector('.score');
  if (score.classList.contains('show')) {
		score.classList.remove('show');
		document.body.classList.remove('no-scroll');
	} else if (!score.classList.contains('show')) {
		score.classList.add('show');
		document.body.classList.add('no-scroll');
	}
}