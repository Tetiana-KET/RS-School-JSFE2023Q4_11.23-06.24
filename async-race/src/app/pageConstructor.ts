import { Component } from './components/Component';
// import { Header } from '';
// import { Footer } from '';
// import { WinnersView } from './views/winners';

class SiteWrapperComponent extends Component {
  constructor() {
    // const headerComponent = Header();
    // const footerComponent = Footer();
    // const winnersViewComponent = WinnersView();
    // super({ className: 'site-wrapper' , children:[headerComponent, mainComponent, footerComponent, winnersViewComponent]});
    super({ tagName: 'div', classNames: ['site-wrapper'], children: [new Component({ tagName: 'main', classNames: ['main'] })] });
  }
}

export const SiteWrapper = (): SiteWrapperComponent => new SiteWrapperComponent();
