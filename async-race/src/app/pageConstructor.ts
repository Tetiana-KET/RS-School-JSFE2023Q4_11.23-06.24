import { Component } from './components/Component';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import GarageView from './views/garage/Garage';

class SiteWrapperComponent extends Component {
  constructor() {
    const garageViewComponent = new GarageView();
    const headerComponent = new Header();
    const mainComponent = new Component({ tagName: 'main', classNames: ['main'], children: [garageViewComponent] });
    const footerComponent = new Footer();

    super({ tagName: 'div', classNames: ['site-wrapper'], children: [headerComponent, mainComponent, footerComponent] });
  }
}

export const SiteWrapper = (): SiteWrapperComponent => new SiteWrapperComponent();
