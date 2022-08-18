import axios from 'axios';
import baseService from './base.service';

export default {
    async getResourceURI(resourceURI) {
        const key = resourceURI;
        const cache = localStorage.getItem(key);
        if (cache) {
            return JSON.parse(cache);
        }

        let result = await (await axios.get(resourceURI + baseService.getDefaultParameters2()));
        if (result) {
            result = result.data.data.results[0];
            if (result.images && result.images[0]) {
                let image = result.images[0];
                result.image = `${image.path}.${image.extension}`
            }
            if (result.thumbnail) {
                result.image = `${result.thumbnail.path}.${result.thumbnail.extension}`
            }

            result.name = result.name ? result.name : result.title;

            localStorage.setItem(key, JSON.stringify(result));

            return result;
        }
    }
}