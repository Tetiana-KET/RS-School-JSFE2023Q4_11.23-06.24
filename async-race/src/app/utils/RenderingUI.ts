import { GarageInterface } from '../interfaces/car.interface';

import { getCars } from './InteractionAPI';

export function updateGarageTitle(carsCount: number): void {
  const titleWrapper = document.querySelector(`#carsCount h2`);
  if (titleWrapper) {
    titleWrapper.innerHTML = `<h2>Cars in Garage: ( ${carsCount} )</h2>`;
  }
}

export async function createCarsInGarage(page: number, limit: number): Promise<[GarageInterface, number]> {
  const [cars, total] = await getCars(page, limit);
  const carsInGarage = await cars;
  const totalCars = total;
  return [carsInGarage, totalCars];
}
