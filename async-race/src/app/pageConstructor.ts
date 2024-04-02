import { Component } from './components/Component';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import createModalTemplate from './components/modal/modal';
import GarageView from './views/garage/Garage';
import WinnersView from './views/winners/Winners';

class SiteWrapperComponent extends Component {
  constructor() {
    const garageViewComponent = new GarageView();
    const winnersViewComponent = new WinnersView();
    const headerComponent = new Header();
    const modal = createModalTemplate();
    const mainComponent = new Component({ tagName: 'main', classNames: ['main'], children: [garageViewComponent, winnersViewComponent, modal] });
    const footerComponent = new Footer();

    super({ tagName: 'div', classNames: ['site-wrapper'], children: [headerComponent, mainComponent, footerComponent] });
  }
}

export const SiteWrapper = (): SiteWrapperComponent => new SiteWrapperComponent();
