import { Component } from './components/Component';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
// import { WinnersView } from './views/winners';

class SiteWrapperComponent extends Component {
  constructor() {
    const headerComponent = new Header();
    const mainComponent = new Component({ tagName: 'main', classNames: ['main'] });
    const footerComponent = new Footer();
    // const winnersViewComponent = WinnersView();
    // super({ className: 'site-wrapper' , children:[headerComponent, mainComponent, footerComponent, winnersViewComponent]});
    super({ tagName: 'div', classNames: ['site-wrapper'], children: [headerComponent, mainComponent, footerComponent] });
  }
}

export const SiteWrapper = (): SiteWrapperComponent => new SiteWrapperComponent();
