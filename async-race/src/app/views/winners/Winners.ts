import classes from './Winners.module.css';
import { Component } from '../../components/Component';
import { Pagination } from '../../components/pagination/Pagination';
import { togglePaginationBtnsState } from '../../utils/RenderingUI';
import { createPageTitle } from '../../components/pageTitle';
import createScoreTableTemplate from '../../components/scoreTable/ScoreTableTemplate';

export default class WinnersView extends Component {
  private titleWrap: Component<HTMLDivElement>;
  private winnersTableContainer: Component<HTMLDivElement>;

  private WINNES_PER_PAGE: number = 10;
  private currentPage: number = 1;
  private lastPage: number = 1;
  private paginationWrap: Pagination;

  constructor() {
    super({ tagName: 'section', classNames: [classes.winners], children: [] });
    this.titleWrap = new Component({ tagName: 'div', classNames: [classes.titleWrapper] });
    this.titleWrap.getNode().innerHTML = this.createWinnersTitle(this.currentPage);
    this.winnersTableContainer = new Component({ tagName: 'div', classNames: [classes.winnersTableContainer] });
    this.paginationWrap = new Pagination({
      onFirstClick: this.onFirstClick,
      onPrevClick: this.onPrevClick,
      onNextClick: this.onNextClick,
      onLastClick: this.onLastClick,
      pageName: 'winner',
    });
    this.appendElements(this.titleWrap, this.winnersTableContainer, this.paginationWrap);
    this.setPaginationPageNum();
  }

  private appendElements(
    titleWrapper: Component<HTMLElement>,
    winnersTableContainer: Component<HTMLElement>,
    paginationWrapper: Component<HTMLElement>
  ): void {
    const container = winnersTableContainer;
    container.getNode().innerHTML = createScoreTableTemplate();
    this.append(titleWrapper);
    this.append(winnersTableContainer);
    this.append(paginationWrapper);
  }

  private createWinnersTitle(page: number): string {
    return createPageTitle(page, classes, 'winners');
  }

  // click first page pagination button
  private onFirstClick = async (): Promise<void> => {
    this.currentPage = 1;
    // await this.createWinnersView();
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
  };

  // click prev page pagination button
  private onPrevClick = async (): Promise<void> => {
    this.currentPage -= 1;
    // await this.createWinnersView();
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
  };

  // click next page pagination button
  private onNextClick = async (): Promise<void> => {
    this.currentPage += 1;
    // await this.createWinnersView();
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
  };

  // click last page pagination button
  private onLastClick = async (): Promise<void> => {
    this.currentPage = this.lastPage;
    // await this.createWinnersView();
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
  };

  private setPaginationPageNum(): void {
    const pageNumElement = this.paginationWrap.getNode().querySelector(`#winnerPageNum`) as HTMLElement;
    pageNumElement.textContent = this.currentPage.toString();
  }
}
