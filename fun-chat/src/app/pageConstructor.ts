import { Component } from './components/Component';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { MainContent } from './pages/view/mainContent/MainContent';
import { WebSocketAPI } from './services/WebSocketAPI';

class SiteWrapperComponent extends Component<'div'> {
  public webSocketAPI: WebSocketAPI;
  constructor() {
    super('div', { className: 'site-wrapper', id: 'siteWrapper' });
    this.webSocketAPI = new WebSocketAPI();
    const headerComponent = new Header(this.webSocketAPI);
    const mainComponent = new MainContent(this.webSocketAPI);
    const footerComponent = new Footer();

    this.appendChildren([headerComponent, mainComponent, footerComponent]);
  }
}

export const SiteWrapper = (): SiteWrapperComponent => new SiteWrapperComponent();
