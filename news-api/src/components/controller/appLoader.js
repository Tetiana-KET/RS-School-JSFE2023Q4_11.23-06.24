import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL, {
            apiKey: '1f794da8a2eb4f83a68b9dc33fbeeff7',
        });
    }
}

export default AppLoader;
