import './news.css';
import { Source } from '../sources/sources';

export interface NewsItem {
    author: string | null;
    source: Source;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
}

class News {
    draw(data: NewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    if (idx % 2) {
                        const newsItem = newsClone.querySelector('.news__item');
                        if (newsItem) {
                            newsItem.classList.add('alt');
                        }
                    }

                    const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');

                    if (newsMetaPhoto instanceof HTMLElement) {
                        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                    }

                    const authorElement = newsClone.querySelector('.news__meta-author');
                    if (authorElement) {
                        authorElement.textContent = item.author || item.source.name;
                    }

                    const dateElement = newsClone.querySelector('.news__meta-date');
                    if (dateElement) {
                        dateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                    }

                    const titleElement = newsClone.querySelector('.news__description-title');
                    if (titleElement) {
                        titleElement.textContent = item.title;
                    }

                    const sourceElement = newsClone.querySelector('.news__description-source');
                    if (sourceElement) {
                        sourceElement.textContent = item.source.name;
                    }

                    const contentElement = newsClone.querySelector('.news__description-content');
                    if (contentElement) {
                        contentElement.textContent = item.description;
                    }

                    const readMoreAnchor = newsClone.querySelector('.news__read-more a');
                    if (readMoreAnchor) {
                        readMoreAnchor.setAttribute('href', item.url);
                    }

                    fragment.append(newsClone);
                }
            });

            const newsContainer = document.querySelector('.news');
            if (newsContainer) {
                newsContainer.innerHTML = '';
                newsContainer.appendChild(fragment);
            } else {
                throw new Error("Container '.news' not found");
            }
        } else {
            throw new Error();
        }
    }
}

export default News;
