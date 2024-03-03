import { main } from '@components/tags';
import { movieService } from '@services/movie.service';

import { BaseComponent } from './components/base-component';
import { Header } from './components/header/header';
import { MovieListPage } from './pages/movie-list';

class PageWrapperComponent extends BaseComponent {
  constructor() {
    const headerComponent = Header();
    const movieListPageComponent = MovieListPage(movieService);
    super({ className: 'page-wrapper' }, headerComponent, main({ className: 'main' }, movieListPageComponent));
  }
}

export const PageWrapper = () => new PageWrapperComponent();
