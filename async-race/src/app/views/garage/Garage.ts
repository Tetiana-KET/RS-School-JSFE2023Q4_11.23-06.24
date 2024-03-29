import classes from './Garage.module.css';
import { Component } from '../../components/Component';
import { createCar, deleteCar, updateCar } from '../../utils/InteractionAPI';
import { createCarsInGarage, updateGarageTitle } from '../../utils/RenderingUI';
import Car from '../carTrack/CarTrack';
import { createFormWrapper, createGarageTitle } from './garage.templates';
import CarModelGenerator from '../../utils/carModelGenerator';
import { CreatedCarOptions } from '../../interfaces/car.interface';

export default class GarageView extends Component {
  private formWrap: Component<HTMLDivElement>;
  private titleWrap: Component<HTMLDivElement>;
  private garageRaceContainer: Component<HTMLDivElement>;
  private paginationWrap: Component<HTMLDivElement>;
  private CARS_LIMIT: number = 7;
  private currentPage: number = 1;
  private CarModelGenerator = new CarModelGenerator();

  constructor() {
    super({ tagName: 'section', classNames: [classes.garage] });
    this.titleWrap = new Component({ tagName: 'div', classNames: [classes.titleWrapper] });
    this.paginationWrap = new Component({ tagName: 'div', classNames: [classes.paginationWrapper] });
    this.garageRaceContainer = new Component({ tagName: 'div', classNames: [classes.garageRaceContainer] });
    this.formWrap = new Component({ tagName: 'div', classNames: [classes.settings] });
    this.formWrap.getNode().innerHTML = this.createFormWrapper();
    this.titleWrap.getNode().innerHTML = this.createGarageTitle(this.currentPage);
    this.paginationWrap.getNode().innerHTML = this.createPagination();
    this.appendElements(this.formWrap, this.titleWrap, this.garageRaceContainer, this.paginationWrap);
    this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    this.generateBtnAddListener();
  }

  private createBtnAddListener(): void {
    // create NEW CAR
    const carNameInput = this.formWrap.getNode().querySelector('#create-car-name');
    carNameInput?.addEventListener('input', this.createCarNameInputHandler.bind(this));

    const carColorInput = this.formWrap.getNode().querySelector('#create-car-color');
    carColorInput?.addEventListener('input', this.createCarColorInputHandler.bind(this));

    const createBtn = this.formWrap.getNode().querySelector(`.${classes.createBtn}`);
    createBtn?.addEventListener('click', this.createBtnClickHandler);
  }

  private updateBtnAddListener(): void {
    // UPDATE CAR
    this.formWrap.getNode().querySelector(`.${classes.updateBtn}`)?.addEventListener('click', this.updateBtnClickHandler.bind(this));
  }

  private generateBtnAddListener(): void {
    const generateBtn = this.formWrap.getNode().querySelector(`.${classes.generateBtn}`);
    generateBtn?.addEventListener('click', this.generateBtnClickHandler.bind(this));
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

  private async createGarageView(garageContainer: HTMLElement, currentPage: number, CARS_LIMIT: number): Promise<void> {
    const [carsInGarage, total] = await createCarsInGarage(garageContainer, currentPage, CARS_LIMIT);
    this.createBtnAddListener();
    this.updateBtnAddListener();
    const container = garageContainer;
    container.innerHTML = '';

    carsInGarage.forEach(carData => {
      const car = new Car({ ...carData, onDeleteClick: this.onDeleteCar, onStartClick: this.onStartCar, onStopClick: this.onStopCar });
      const carElement = car.getElement();
      container?.append(carElement);
    });
    updateGarageTitle(total);
  }

  private onDeleteCar = async (input: { id: number }): Promise<void> => {
    await deleteCar(input.id);
    await this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
  };

  private onStartCar = async (input: { id: number }): Promise<void> => {
    console.log(`car with id="${input.id}" Started`);
  };

  private onStopCar = async (input: { id: number }): Promise<void> => {
    console.log(`car with id="${input.id}" Stopped`);
  };

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

  private createBtnClickHandler = async (): Promise<void> => {
    const nameInput = this.children[0].getNode().querySelector(`#create-car-name`) as HTMLInputElement;
    const carName = nameInput.value;
    const colorInput = this.children[0].getNode().querySelector(`#create-car-color`) as HTMLInputElement;
    const carColor = colorInput.value;
    try {
      await createCar({ name: carName, color: carColor });
    } catch {
      throw new Error();
    }
    this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    nameInput.value = '';
    colorInput.value = '#ffffff';
    const createButton = this.children[0].getNode().querySelector(`.${classes.createBtn}`) as HTMLButtonElement;
    createButton.disabled = true;
  };

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
    this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
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
    console.log(`generate 100 cars`, this.garageRaceContainer.getNode());
    this.hundredCarGeneration();

    this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
  }

  private async hundredCarGeneration(): Promise<void> {
    const carsInfoArray = [...Array(100)].map(() => this.CarModelGenerator.generateRandomCar());
    const promises = carsInfoArray.map((carInfo: CreatedCarOptions) => createCar(carInfo));
    await Promise.all(promises);
  }

  private createFormWrapper(): string {
    return createFormWrapper(classes);
  }

  private createGarageTitle(page: number): string {
    return createGarageTitle(page, classes);
  }

  private createPagination(): string {
    return `
      <button type="button" class="${(classes.prevPage, classes.button)}" disabled>Previous</button>
      <button type="button" class="${(classes.nextPage, classes.button)}">Next</button>`;
  }
}
