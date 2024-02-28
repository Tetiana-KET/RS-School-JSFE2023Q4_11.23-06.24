import { Options, ResponseCallback, LoadRequestInput } from '../../types';

class Loader {
    readonly _baseLink: string;
    readonly _options: Options;

    constructor(baseLink: string, options: Options) {
        this._baseLink = baseLink;
        this._options = options;
    }

    protected getResp<D>(
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback: ResponseCallback<D> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load({ method: 'GET', endpoint }, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string) {
        const urlOptions = { ...this._options, ...options };
        let url = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    protected load<D>({ method, endpoint }: LoadRequestInput, callback: ResponseCallback<D>, options: Options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: D) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
