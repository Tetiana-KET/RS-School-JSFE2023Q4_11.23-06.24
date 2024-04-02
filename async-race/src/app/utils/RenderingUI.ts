import { GarageInterface, WinnersInterface } from '../interfaces/car.interface';
import { getCars, getWinners } from './InteractionAPI';

export function directToPage(): void {
  const garageBtn = document.querySelector('#toGarageBtn') as HTMLButtonElement;
  const winnerBtn = document.querySelector('#toWinnersBtn') as HTMLButtonElement;
  const winners = document.querySelector('#winnersSection') as HTMLElement;
  const garage = document.querySelector('#garageSection') as HTMLElement;

  garageBtn.addEventListener('click', () => {
    window.location.hash = 'garage';
    garage.style.display = 'flex';
    winners.style.display = 'none';
    garageBtn.setAttribute('disabled', 'true');
    winnerBtn.removeAttribute('disabled');
  });
  winnerBtn.addEventListener('click', () => {
    window.location.hash = 'winners';
    winners.style.display = 'flex';
    garage.style.display = 'none';
    winnerBtn.setAttribute('disabled', 'true');
    garageBtn.removeAttribute('disabled');
  });
}

export function updatePageTitle(carsCount: number, currentPage: number, pageName: string, lastPage: number = 1): void {
  const titleWrapper = document.querySelector(`#${pageName}CarsCount h2`);
  const text = pageName === 'garage' ? 'Cars in Garage:' : 'Total Winners:';
  if (titleWrapper) {
    titleWrapper.innerHTML = `<h2>${text} ( ${carsCount} )</h2>`;
  }
  const pageNumberWrapper = document.querySelector(`#${pageName}pageNumber`);
  if (pageNumberWrapper) {
    pageNumberWrapper.textContent = `Page: ( № ${currentPage} / ${lastPage})`;
  }
}

export async function createCarsInGarage(page: number, limit: number): Promise<[GarageInterface, number]> {
  const [cars, total] = await getCars(page, limit);
  const carsInGarage = await cars;
  const totalCars = total;
  return [carsInGarage, totalCars];
}

export async function createWinnersList(page: number, limit: number): Promise<[WinnersInterface, number]> {
  const [winners, winnersCount] = await getWinners(page, limit);
  const winnersList = await winners;
  const totalWinners = winnersCount;
  return [winnersList, totalWinners];
}

export function togglePaginationBtnsState(currentPage: number, lastPage: number, pageName: string): void {
  const firstPageBtn = document.querySelector(`#${pageName}FirstPageBtn`) as HTMLButtonElement;
  const prevBtn = document.querySelector(`#${pageName}PrevBtn`) as HTMLButtonElement;
  const nextBtn = document.querySelector(`#${pageName}NextBtn`) as HTMLButtonElement;
  const lastPageBtn = document.querySelector(`#${pageName}LastPageBtn`) as HTMLButtonElement;

  if (currentPage > 1) {
    firstPageBtn.removeAttribute('disabled');
    prevBtn.removeAttribute('disabled');
  } else {
    firstPageBtn.setAttribute('disabled', 'true');
    prevBtn.setAttribute('disabled', 'true');
  }

  if (currentPage < lastPage) {
    lastPageBtn.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');
  } else {
    lastPageBtn.setAttribute('disabled', 'true');
    nextBtn.setAttribute('disabled', 'true');
  }
}

export function createSvg(classes: CSSModuleClasses, id: number, color: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `./sprite.svg#car${(id % 7) + 1}`);
  svg.classList.add(classes.carSvg);
  svg.style.fill = color;
  svg.append(use);
  return svg;
}
