import classes from './Garage.module.css';
import { Component } from '../../components/Component';
import GarageRace from './GarageRace';

export default class GarageView extends Component {
  constructor() {
    const formWrapper = new Component({ tagName: 'div', classNames: [classes.settings] });
    const titleWrapper = new Component({ tagName: 'div', classNames: [classes.titleWrapper] });
    const garageRaceComponent = new GarageRace();
    const paginationWrapper = new Component({ tagName: 'div', classNames: [classes.paginationWrapper] });
    super({ tagName: 'section', classNames: [classes.garage] });
    formWrapper.getNode().innerHTML = this.createFormWrapper();
    titleWrapper.getNode().innerHTML = this.createGarageTitle(1, 1);
    paginationWrapper.getNode().innerHTML = this.createPagination();
    this.append(formWrapper);
    this.append(titleWrapper);
    this.append(garageRaceComponent);
    this.append(paginationWrapper);
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
  private createGarageTitle(page: number, totalCars: number): string {
    return `
      <div class="${classes.carsCount}">
        <h2>Cars in Garage: ( ${totalCars} )</h2>
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
