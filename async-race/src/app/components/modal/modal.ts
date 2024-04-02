import { Component } from '../Component';
import classes from './modal.module.css';

export default function createModalTemplate(): Component<HTMLElement> {
  const modal = new Component({ tagName: 'div', classNames: [`${classes.modal}`], attributes: { id: 'winnerPopup' } });
  modal.getNode().innerHTML = ` 
    <div class="${classes.modalOverlay}"></div>
    <div class="${classes.modalContentWrap}">
      <div class="${classes.modalContent}">
        <p class="${classes.modalText}"> The Winner is <span id="modalWinnerName"></span>,  with ID# <span id="modalWinnerId"></span></p>
        <p class="${classes.modalTime}"> He finished in  <span id="modalWinnerTime"></span></p>
      </div>
    </div>
  `;
  return modal;
}

export function showWinnerModal(winnerData: { id: number; time: number }, name: string): void {
  const popup = document.querySelector(`#winnerPopup`) as HTMLDivElement;
  const winnerNameEl = document.querySelector(`#modalWinnerName`) as HTMLSpanElement;
  const winnerTimeEl = document.querySelector(`#modalWinnerTime`) as HTMLSpanElement;
  const winnerIdEl = document.querySelector(`#modalWinnerId`) as HTMLSpanElement;
  winnerTimeEl.innerText = `${winnerData.time} s`;
  winnerNameEl.innerText = `${name}`;
  winnerIdEl.innerHTML = `${winnerData.id}`;
  popup?.setAttribute('active', 'true');

  setTimeout(() => {
    popup?.removeAttribute('active');
  }, 3000);
}
