export default function toggleScoreModal () {
  const score = document.querySelector('.score');
  if (score.classList.contains('show')) {
		score.classList.remove('show');
	} else if (!score.classList.contains('show')) {
		score.classList.add('show');
	}
}