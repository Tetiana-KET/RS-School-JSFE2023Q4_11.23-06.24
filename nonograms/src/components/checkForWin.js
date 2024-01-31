export default function checkForWin() {
	const cells = document.querySelectorAll('.game__cell');
	const openedCells = document.querySelectorAll('.game__cell.cell-filled');
	let isWin = Array.from(openedCells).every(item =>
		item.classList.contains('filled')
	);
	console.log(isWin);
	if (isWin) {
        const modal = document.querySelector('.modal');
        setTimeout(()=> {
            modal.classList.add('show');
						Array.from(cells).forEach((cell) => {
							cell.classList.add('disabled')
						});
        }, 800)
	}
}