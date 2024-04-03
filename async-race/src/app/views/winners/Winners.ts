import classes from './Winners.module.css';
import { Component } from '../../components/Component';
import { Pagination } from '../../components/pagination/Pagination';
import { createWinnersList, togglePaginationBtnsState, updatePageTitle } from '../../utils/RenderingUI';
import { createPageTitle } from '../../components/pageTitle';
import createScoreTableTemplate from '../../components/scoreTable/ScoreTableTemplate';
import { getWinnerCar } from '../../utils/InteractionAPI';
import WinnerLine from '../../components/scoreTable/ScoreTableWinnerLine';
import { eventBus } from '../../utils/eventBus';

export default class WinnersView extends Component {
  private titleWrap: Component<HTMLDivElement>;
  private winnersTableContainer: Component<HTMLDivElement>;
  private rowNum: number = 1;
  private WINNES_PER_PAGE: number = 10;
  private currentPage: number = 1;
  private lastPage: number = 1;
  private paginationWrap: Pagination;

  constructor() {
    super({ tagName: 'section', classNames: [classes.winners], attributes: { id: 'winnersSection' } });
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
    this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE);
    this.setPaginationPageNum();
    this.togglePagination();

    // event listener to handle car deletion event
    eventBus.subscribe('carDeleted', async () => {
      this.rowNum = 1;
      this.winnersTableContainer.destroyChildren();
      this.winnersTableContainer.getNode().innerHTML = createScoreTableTemplate();
      await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE);
      this.setPaginationPageNum();
    });

    // event listener to handle new Winner event
    eventBus.subscribe('newWinnerSet', async () => {
      this.winnersTableContainer.destroyChildren();
      this.winnersTableContainer.getNode().innerHTML = createScoreTableTemplate();
      await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE);
      this.setPaginationPageNum();
    });
    this.addListenerToSortBtns();
  }

  private addListenerToSortBtns(): void {
    const sortByWins = this.winnersTableContainer.getNode().querySelector(`#winsCount span`) as HTMLSpanElement;
    const sortByTime = this.winnersTableContainer.getNode().querySelector(`#timeValue span`) as HTMLSpanElement;
    sortByWins.addEventListener('click', async () => {
      if (sortByWins.getAttribute('data-sorted') === 'ASC') {
        sortByWins.setAttribute('data-sorted', 'DESC');
        await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE, 'wins', 'DESC');
      } else if (sortByWins.getAttribute('data-sorted') === 'DESC') {
        sortByWins.setAttribute('data-sorted', 'ASC');
        await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE, 'wins', 'ASC');
      } else {
        sortByWins.setAttribute('data-sorted', 'ASC');
        sortByTime.removeAttribute('data-sorted');
        await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE, 'wins', 'ASC');
      }
      togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
    });
    sortByTime.addEventListener('click', async () => {
      if (sortByTime.getAttribute('data-sorted') === 'ASC') {
        sortByTime.setAttribute('data-sorted', 'DESC');
        await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE, 'time', 'DESC');
      } else if (sortByWins.getAttribute('data-sorted') === 'DESC') {
        sortByTime.setAttribute('data-sorted', 'ASC');
        await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE, 'time', 'ASC');
      } else {
        sortByTime.setAttribute('data-sorted', 'ASC');
        sortByWins.removeAttribute('data-sorted');
        await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE, 'time', 'ASC');
      }
      togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
    });
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
  private togglePagination(): void {
    const nextBtn = this.paginationWrap.getNode().querySelector('#winnerNextBtn') as HTMLButtonElement;
    const lastBtn = this.paginationWrap.getNode().querySelector('#winnerLastPageBtn') as HTMLButtonElement;
    if (this.lastPage === 1) {
      nextBtn.setAttribute('disabled', 'true');
      lastBtn.setAttribute('disabled', 'true');
    } else if (this.lastPage > 1) {
      nextBtn.removeAttribute('disabled');
      lastBtn.removeAttribute('disabled');
    }
  }

  private updateLastPage(winnersCount: number): number {
    return Math.ceil(winnersCount / this.WINNES_PER_PAGE);
  }

  private async createWinnerView(currentPage: number, WINNERS_PER_PAGE: number, sortBy: string = 'time', order: string = 'ASC'): Promise<void> {
    const [winners, winnersCount] = await createWinnersList(currentPage, WINNERS_PER_PAGE, sortBy, order);
    const container = this.winnersTableContainer.getNode().querySelector(`tbody`) as HTMLTableSectionElement;
    container.innerHTML = '';
    if (currentPage === 1) {
      this.rowNum = 1;
    } else {
      this.rowNum = Number(`${currentPage - 1}1`);
    }
    for (const winnerData of winners) {
      const { id } = winnerData;
      try {
        const winnerInfo = await getWinnerCar(id);

        const row = new WinnerLine(winnerData, winnerInfo, this.rowNum);
        const rowElement = row.getElement();
        container?.append(rowElement);
      } catch (error) {
        console.error('Error fetching winner car:', error);
      }

      this.rowNum += 1;
    }
    this.lastPage = this.updateLastPage(winnersCount);
    updatePageTitle(winnersCount, currentPage, 'winners', this.lastPage);
    this.togglePagination();
  }

  // click first page pagination button
  private onFirstClick = async (): Promise<void> => {
    this.currentPage = 1;

    this.winnersTableContainer.destroyChildren();
    this.winnersTableContainer.getNode().innerHTML = createScoreTableTemplate();

    await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE);
    this.addListenerToSortBtns();
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
  };

  // click prev page pagination button
  private onPrevClick = async (): Promise<void> => {
    this.currentPage -= 1;

    this.winnersTableContainer.destroyChildren();
    this.winnersTableContainer.getNode().innerHTML = createScoreTableTemplate();

    await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE);
    this.addListenerToSortBtns();
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
  };

  // click next page pagination button
  private onNextClick = async (): Promise<void> => {
    this.currentPage += 1;

    this.winnersTableContainer.destroyChildren();
    this.winnersTableContainer.getNode().innerHTML = createScoreTableTemplate();

    await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE);
    this.addListenerToSortBtns();
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
  };

  // click last page pagination button
  private onLastClick = async (): Promise<void> => {
    this.currentPage = this.lastPage;

    this.winnersTableContainer.destroyChildren();
    this.winnersTableContainer.getNode().innerHTML = createScoreTableTemplate();

    await this.createWinnerView(this.currentPage, this.WINNES_PER_PAGE);
    this.addListenerToSortBtns();
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'winner');
  };

  private setPaginationPageNum(): void {
    const pageNumElement = this.paginationWrap.getNode().querySelector(`#winnerPageNum`) as HTMLElement;
    pageNumElement.textContent = this.currentPage.toString();
  }
}
