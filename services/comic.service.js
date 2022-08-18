import axios from 'axios';
import baseService from './base.service';

export default {
    async getComics(search, sort, limit, offset) {

        const key = `comics${search ?? ''}${sort ?? ''}${limit ?? ''}${offset ?? ''}`;
        const cache = localStorage.getItem(key);
        if (cache) {
            debugger;
            return JSON.parse(cache);
        }

        const baseUrl = `https://gateway.marvel.com/v1/public/comics?limit=${limit}&offset=${offset}`;
        const result = await axios.get(baseUrl + `${search ? `&titleStartsWith=${search}` : ''}${baseService.getDefaultParameters(sort)}`);
        localStorage.setItem(key, JSON.stringify(result));
        return result;
    }
}