import classes from './GarageRace.module.css';
import { Component } from '../../components/Component';
import { PaginationOptions } from '../../interfaces/pagination.interface';

export default class GarageRace extends Component {
  private readonly paginationOptions: PaginationOptions = {
    page: 1,
    limit: 7,
  };
  constructor() {
    super({ tagName: 'div', classNames: [classes.garageRace] });
  }
}
