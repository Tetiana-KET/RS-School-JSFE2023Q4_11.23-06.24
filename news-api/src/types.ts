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

export enum NewsCategory {
    Business = 'business',
    Entertainment = 'entertainment',
    General = 'general',
    Science = 'science',
    Sports = 'sports',
    Technology = 'technology',
}

export interface SourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: NewsCategory;
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

export interface Source {
    name: string;
    id: string;
}

export type Options = Record<string, string>;

export type LoadRequestInput = {
    method: string;
    endpoint: string;
};
