import { Component } from './components/Component';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { MainContent } from './pages/view/mainContent/MainContent';

class SiteWrapperComponent extends Component<'div'> {
  constructor() {
    const headerComponent = new Header();
    const mainComponent = new MainContent();
    const footerComponent = new Footer();

    super('div', { className: 'site-wrapper', id: 'siteWrapper' });
    this.appendChildren([headerComponent, mainComponent, footerComponent]);
  }
}

export const SiteWrapper = (): SiteWrapperComponent => new SiteWrapperComponent();
