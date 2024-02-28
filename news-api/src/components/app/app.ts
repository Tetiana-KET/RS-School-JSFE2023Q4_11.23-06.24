import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    readonly _controller: AppController;
    readonly _view: AppView;

    constructor() {
        this._controller = new AppController();
        this._view = new AppView();
    }

    start() {
        const sourcesButtonsWrap = document.querySelector('.sources');
        if (sourcesButtonsWrap) {
            sourcesButtonsWrap.addEventListener('click', (e) =>
                this._controller.getNews(e, (data) => this._view.drawNews(data))
            );
        }

        this._controller.getSources((data) => this._view.drawSources(data));
    }
}

export default App;
