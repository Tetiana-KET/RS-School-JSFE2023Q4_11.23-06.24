import { Component } from '../Component';
import classes from './Pagination.module.css';

type PaginationActionsHandlers = {
  onFirstClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onLastClick: () => void;
  pageName: string;
};

export class Pagination extends Component {
  private handlers: PaginationActionsHandlers;

  private paginationWrapper: Component<HTMLDivElement>;
  private pageNum: Component<HTMLDivElement>;
  private firstPageBtn: Component<HTMLButtonElement>;
  private prevBtn: Component<HTMLButtonElement>;
  private nextBtn: Component<HTMLButtonElement>;
  private lastPageBtn: Component<HTMLButtonElement>;

  constructor(handlers: PaginationActionsHandlers) {
    super({ tagName: 'div', classNames: [classes.pagination] });
    this.handlers = handlers;
    this.pageNum = new Component({
      tagName: 'div',
      classNames: [classes.paginationBtn, classes.pageNum],
      attributes: { id: `${handlers.pageName}PageNum` },
    });
    this.firstPageBtn = new Component({
      tagName: 'button',
      text: '<<',
      classNames: [classes.paginationBtn, classes.firstPageBtn],
      attributes: { disabled: 'true', id: `${handlers.pageName}FirstPageBtn` },
    });
    this.prevBtn = new Component({
      tagName: 'button',
      text: '<',
      classNames: [classes.paginationBtn, classes.prevBtn],
      attributes: { disabled: 'true', id: `${handlers.pageName}PrevBtn` },
    });
    this.nextBtn = new Component({
      tagName: 'button',
      text: '>',
      classNames: [classes.paginationBtn, classes.nextBtn],
      attributes: { id: `${handlers.pageName}NextBtn` },
    });
    this.lastPageBtn = new Component({
      tagName: 'button',
      text: '>>',
      classNames: [classes.paginationBtn, classes.lastPageBtn],
      attributes: { id: `${handlers.pageName}LastPageBtn` },
    });
    this.paginationWrapper = new Component({
      tagName: 'div',
      classNames: [classes.paginationWrapper],
      children: [this.firstPageBtn, this.prevBtn, this.pageNum, this.nextBtn, this.lastPageBtn],
    });
    this.append(this.paginationWrapper);
    this.addEventListenersToButtons();
  }

  private addEventListenersToButtons(): void {
    this.firstPageBtn.getNode().addEventListener('click', this.clickFirstPageButtonHandler.bind(this));
    this.prevBtn.getNode().addEventListener('click', this.clickPrevPageButtonHandler.bind(this));
    this.nextBtn.getNode().addEventListener('click', this.clickNextPageButtonHandler.bind(this));
    this.lastPageBtn.getNode().addEventListener('click', this.clickLastPageButtonHandler.bind(this));
  }

  private clickFirstPageButtonHandler(): void {
    this.handlers.onFirstClick();
  }
  private clickPrevPageButtonHandler(): void {
    this.handlers.onPrevClick();
  }
  private clickNextPageButtonHandler(): void {
    this.handlers.onNextClick();
  }
  private clickLastPageButtonHandler(): void {
    this.handlers.onLastClick();
  }
}
