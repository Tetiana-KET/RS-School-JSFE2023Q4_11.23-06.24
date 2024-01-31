export default function checkForWin() {
	const openedCells = document.querySelectorAll('.game__cell.cell-filled');
	let isWin = Array.from(openedCells).every(item =>
		item.classList.contains('filled')
	);
	console.log(isWin);
	if (isWin) {
        const modal = document.querySelector('.modal');
        setTimeout(()=> {
            modal.classList.add('show');
        }, 800)
	}
}