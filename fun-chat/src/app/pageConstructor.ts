import { Component } from './components/Component';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';

class SiteWrapperComponent extends Component {
  constructor() {
    const headerComponent = new Header();
    const mainComponent = new Component({ tagName: 'main', classNames: ['main'], children: [] });
    const footerComponent = new Footer();

    super({ tagName: 'div', classNames: ['site-wrapper'], children: [headerComponent, mainComponent, footerComponent] });
  }
}

export const SiteWrapper = (): SiteWrapperComponent => new SiteWrapperComponent();
