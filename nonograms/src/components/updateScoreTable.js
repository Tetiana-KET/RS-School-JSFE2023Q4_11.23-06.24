// @ts-nocheck
export default function updateScoreTable () {

	let results = JSON.parse(localStorage.getItem('winResults')) || [];

  if (results.length) {
		const tableBody = document.querySelector('.score__table-body');
		const tableRows = document.querySelectorAll('.score__row');

		results.forEach((result, index) => {
			const row = tableRows[index];
			let timeDuration = result.duration;
      
			const hours = String(Math.floor(timeDuration / 3600)).padStart(2, '0');
			const minutes = String(Math.floor((timeDuration % 3600) / 60)).padStart(2,'0');
			const seconds = String(timeDuration % 60).padStart(2, '0');

			if (row) {
				row.cells[1].textContent = result.date;
				row.cells[2].textContent = `${result.solvedPuzzle
					.slice(0, 1)
					.toUpperCase()}${result.solvedPuzzle.slice(1)}`;
				row.cells[3].textContent = `${result.complexity
					.slice(0, 1)
					.toUpperCase()}${result.complexity.slice(1)}`;
				row.cells[4].textContent = `${hours}:${minutes}:${seconds}`;
			}
		});
	}
}