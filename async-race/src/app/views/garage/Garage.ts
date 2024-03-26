import classes from './Garage.module.css';
import { Component } from '../../components/Component';
import { CARS_LIMIT, currentPage, getCars } from '../../modules/InteractionAPI';
import { GarageInterface } from '../../interfaces/car.interface';
import Car from '../car/Car';

export default class GarageView extends Component {
  private totalCars: number = 0;
  private carsInGarage: GarageInterface = [];
  constructor() {
    const formWrap = new Component({ tagName: 'div', classNames: [classes.settings] });
    const titleWrap = new Component({ tagName: 'div', classNames: [classes.titleWrapper] });
    const garageRaceContainer = new Component({ tagName: 'div', classNames: [classes.garageRaceContainer] });
    const paginationWrap = new Component({ tagName: 'div', classNames: [classes.paginationWrapper] });
    super({ tagName: 'section', classNames: [classes.garage] });

    formWrap.getNode().innerHTML = this.createFormWrapper();
    titleWrap.getNode().innerHTML = this.createGarageTitle(1);
    paginationWrap.getNode().innerHTML = this.createPagination();

    this.appendElements(formWrap, titleWrap, garageRaceContainer, paginationWrap);

    this.getGarageState(garageRaceContainer);
  }

  private appendElements(
    formWrapper: Component<HTMLElement>,
    titleWrapper: Component<HTMLElement>,
    garageRaceComponent: Component<HTMLElement>,
    paginationWrapper: Component<HTMLElement>
  ): void {
    this.append(formWrapper);
    this.append(titleWrapper);
    this.append(garageRaceComponent);
    this.append(paginationWrapper);
  }

  private async getGarageState(garageContainer: Component<HTMLElement>): Promise<void> {
    const garageRaceContainer = garageContainer;
    const [cars, totalCars] = await getCars(currentPage, CARS_LIMIT);
    this.totalCars = totalCars;
    this.carsInGarage = await cars;
    this.createCars(garageRaceContainer);
    this.updateGarageTitle();
  }

  private createCars(garageContainer: Component<HTMLElement>): void {
    this.carsInGarage.forEach(carData => {
      const car = new Car(carData);
      const garageRaceContainer = garageContainer;
      const carElement = car.getElement();
      garageRaceContainer?.append(carElement);
    });
  }

  private updateGarageTitle(): void {
    const titleWrapper = this.getNode().querySelector(`.${classes.carsCount} h2`);
    if (titleWrapper) {
      titleWrapper.innerHTML = `<h2>Cars in Garage: ( ${this.totalCars} )</h2>`;
    }
  }

  private createFormWrapper(): string {
    return `
      <div class="${classes.formWrapper}">
        <div class="${classes.form}">
          <form action="" class="${classes.carForm}" id="create-car">
            <input class="${classes.formNameInput}" type="text" id="create-car-name" name="car-name"><br>
            <input type="color" id="create-car-color" name="car-color" value="#ffffff">
            <button type="button" class="${(classes.createBtn, classes.button)} ">Create</button>
          </form>
        </div>
        <div class="${classes.form}">
          <form action="" class="${classes.carForm}" id="update-car">
            <input class="${classes.formNameInput}" type="text" id="update-car-name" name="car-name"><br>
            <input type="color" id="update-car-color" name="car-color" value="#ffffff">
            <button type="button" class="${(classes.updateBtn, classes.button)}" disabled>Update</button>
          </form>
        </div>
      </div>
      <div class="${classes.garageMenuButtons}">
        <button class="${(classes.raceBtn, classes.button)}">Start Race</button>
        <button class="${(classes.resetBtn, classes.button)}" disabled>Reset</button>
        <button class="${(classes.generateBtn, classes.button)}">Generate cars</button>
      </div>`;
  }

  private createGarageTitle(page: number): string {
    return `
        <div class="${classes.carsCount}">
          <h2></h2>
        </div>
        <div class="${classes.garagePageNumber}">
          <h3 class="${classes.pageNumber}" data-page="${page}">Page: ( № ${page} )</h3>
        </div>
    `;
  }

  private createPagination(): string {
    return `
      <button type="button" class="${(classes.prevPage, classes.button)}" disabled>Previous</button>
      <button type="button" class="${(classes.nextPage, classes.button)}">Next</button>`;
  }
}
