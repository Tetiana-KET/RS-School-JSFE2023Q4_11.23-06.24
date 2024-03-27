import classes from './Garage.module.css';
import { Component } from '../../components/Component';
import { CARS_LIMIT, currentPage, getCars, updateCar, updateServerState } from '../../utils/InteractionAPI';
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
    this.createNewCar();
  }

  private createNewCar(): void {
    // create NEW CAR
    this.children[0].getNode().querySelector('#create-car-name')?.addEventListener('input', this.createCarNameInputHandler.bind(this));
    this.children[0].getNode().querySelector('#create-car-color')?.addEventListener('input', this.createCarColorInputHandler.bind(this));
    this.children[0].getNode().querySelector(`.${classes.createBtn}`)?.addEventListener('click', this.createBtnClickHandler.bind(this));

    // UPDATE CAR
    this.children[0].getNode().querySelector(`.${classes.updateBtn}`)?.addEventListener('click', this.updateBtnClickHandler.bind(this));
  }
  // private addEventListeners(): void {
  // create NEW CAR
  // UPDATE CAR
  // const updateCarNameInput = document.querySelector('#update-car-name') as HTMLInputElement;
  // const updateCarColorInput = document.querySelector('#update-car-color') as HTMLInputElement;
  // const updateBtn = document.querySelector(`.${classes.updateBtn}`) as HTMLButtonElement;
  // updateBtn.addEventListener('click', this.updateBtnClickHandler.bind(this));
  // updateCarNameInput.addEventListener('input', this.updateCarNameInputHandler.bind(this));
  // updateCarColorInput.addEventListener('input', this.updateCarColorInputHandler.bind(this));
  // const raceBtn = document.querySelector(`.${classes.raceBtn}`) as HTMLButtonElement;
  // const resetBtn = document.querySelector(`.${classes.resetBtn}`) as HTMLButtonElement;
  // const generateBtn = document.querySelector(`.${classes.generateBtn}`) as HTMLButtonElement;
  // raceBtn.addEventListener('click', this.raceBtnClickHandler.bind(this));
  // resetBtn.addEventListener('click', this.resetBtnClickHandler.bind(this));
  // generateBtn.addEventListener('click', this.generateBtnClickHandler.bind(this));
  // }

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
    this.carsInGarage.length = 0;
    const [cars, totalCars] = await getCars(currentPage, CARS_LIMIT);
    this.totalCars = totalCars;
    this.carsInGarage = await cars;
    this.createCars(garageRaceContainer);
    this.updateGarageTitle();
  }

  private createCars(garageContainer: Component<HTMLElement>): void {
    const garageCWrap = garageContainer;
    garageCWrap.getNode().innerHTML = '';

    this.carsInGarage.forEach(carData => {
      const car = new Car(carData);
      const carElement = car.getElement();
      garageContainer?.append(carElement);
    });
  }

  private updateGarageTitle(): void {
    const titleWrapper = this.getNode().querySelector(`.${classes.carsCount} h2`);
    if (titleWrapper) {
      titleWrapper.innerHTML = `<h2>Cars in Garage: ( ${this.totalCars} )</h2>`;
    }
  }

  // Create Name
  private createCarNameInputHandler(): void {
    const createButton = this.children[0].getNode().querySelector(`.${classes.createBtn}`) as HTMLButtonElement;
    const input = this.children[0].getNode().querySelector('#create-car-name') as HTMLInputElement;
    createButton.disabled = input.value.length < 3;
  }
  // Create Color
  private createCarColorInputHandler(): void {
    console.log(`input`, this);
  }

  private updateCarNameInputHandler(): void {
    console.log(`input`, this);
  }
  private updateCarColorInputHandler(): void {
    console.log(`input`, this);
  }

  private async createBtnClickHandler(): Promise<void> {
    const nameInput = this.children[0].getNode().querySelector(`#create-car-name`) as HTMLInputElement;
    const carName = nameInput.value;
    const colorInput = this.children[0].getNode().querySelector(`#create-car-color`) as HTMLInputElement;
    const carColor = colorInput.value;
    try {
      await updateServerState({ name: carName, color: carColor });
    } catch {
      throw new Error();
    }
    this.getGarageState(this.children[2]);
    nameInput.value = '';
    colorInput.value = '#ffffff';
    const createButton = this.children[0].getNode().querySelector(`.${classes.createBtn}`) as HTMLButtonElement;
    createButton.disabled = true;
  }

  private async updateBtnClickHandler(): Promise<void> {
    const nameInput = this.children[0].getNode().querySelector(`#update-car-name`) as HTMLInputElement;
    const carName = nameInput.value;
    const colorInput = this.children[0].getNode().querySelector(`#update-car-color`) as HTMLInputElement;
    const carColor = colorInput.value;
    const CarId = Number(nameInput.getAttribute('car-id'));
    try {
      await updateCar({ id: CarId, name: carName, color: carColor });
    } catch {
      throw new Error();
    }
    this.getGarageState(this.children[2]);
    nameInput.value = '';
    colorInput.value = '#ffffff';
    const updateBtn = document.querySelector(`#updateBtn`) as HTMLButtonElement;
    updateBtn.disabled = true;
  }

  private raceBtnClickHandler(): void {
    console.log(`start race`, this);
  }

  private resetBtnClickHandler(): void {
    console.log(`stop race`, this);
  }

  private generateBtnClickHandler(): void {
    console.log(`generate 100 cars`, this);
  }

  private createFormWrapper(): string {
    return `
      <div class="${classes.formWrapper}">
        <div class="${classes.form}">
          <form action="" class="${classes.carForm}" id="create-car">
            <input class="${classes.formNameInput}" type="text" id="create-car-name" name="car-name" minlength="3" placeholder="Enter your new car Name"><br>
            <input type="color" id="create-car-color" name="car-color" value="#ffffff">
            <button type="button" class="${classes.createBtn} ${classes.button}" id="createBtn" disabled>Create</button>
          </form>
        </div>
        <div class="${classes.form}">
          <form action="" class="${classes.carForm}" id="update-car">
            <input class="${classes.formNameInput}" type="text" id="update-car-name" name="car-name" minlength="3" placeholder="Enter car to edit Name"><br>
            <input type="color" id="update-car-color" name="car-color" value="#ffffff">
            <button type="button" class="${classes.updateBtn} ${classes.button}" disabled id="updateBtn">Update</button>
          </form>
        </div>
      </div>
      <div class="${classes.garageMenuButtons}">
        <button class="${classes.raceBtn} ${classes.button}">Start Race</button>
        <button class="${classes.resetBtn} ${classes.button}" disabled>Reset</button>
        <button class="${classes.generateBtn} ${classes.button}">Generate cars</button>
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
