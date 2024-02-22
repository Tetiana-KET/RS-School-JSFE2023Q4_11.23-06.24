export type ResponseCallback<Data> = (data: Data) => void;

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            API_URL: string;
            API_KEY: string;
        }
    }
}

export interface SourcesResponse {
    status: string;
    sources?: SourceItem[];
}

export interface SourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsItemSource {
    name: string;
    id: string;
}

export interface NewsItem {
    author: string | null;
    source: NewsItemSource;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
}

export interface NewsResponse {
    status: string;
    articles: NewsItem[];
    totalResults: number;
}
