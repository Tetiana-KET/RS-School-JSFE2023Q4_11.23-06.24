import { ResponseCallback } from '../../types';

type Options = Record<string, string>;

class Loader {
    private _baseLink: string;
    private _options: Options;

    constructor(baseLink: string, options: Options) {
        this._baseLink = baseLink;
        this._options = options;
    }

    getResp<D>(
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback: ResponseCallback<D> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: string) {
        const urlOptions = { ...this._options, ...options };
        let url = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<D>(method: string, endpoint: string, callback: ResponseCallback<D>, options: Options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: D) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
