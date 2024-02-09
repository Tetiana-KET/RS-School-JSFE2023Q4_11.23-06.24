// @ts-nocheck
export default function updateScoreTable () {

	const headerRow = document.querySelector('.score__headers-items');
	console.log(headerRow);

	if (window.screen.width <= 500) {
		headerRow.cells[0].textContent = '';
		headerRow.cells[3].textContent = 'Level';
	} else if (window.screen.width > 500)  {
		headerRow.cells[0].textContent = 'Position';
		headerRow.cells[3].textContent = 'Complexity';
	}

	let results = JSON.parse(localStorage.getItem('winResults')) || [];

  if (results.length) {
		const tableFooter = document.querySelector('.score__footer tr');
		const tableRows = document.querySelectorAll('.score__row');
		const durations = [];

		results.forEach((result, index) => {
			const row = tableRows[index];
			durations.push(Number(result.duration));
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
		
		const average = (Math.round(durations.reduce((acc, cur) => acc + cur, 0) / durations.length));
		const hoursAverage = String(Math.floor(average / 3600)).padStart(2, '0');
		const minutesAverage = String(Math.floor((average % 3600) / 60)).padStart(2,'0');
		const secondsAverage = String(average % 60).padStart(2, '0');
		tableFooter.cells[1].textContent = `${hoursAverage}:${minutesAverage}:${secondsAverage}`;
	}
}