import axios from 'axios';
import baseService from './base.service';

export default {
    async getCharacters(search, sort, limit, offset) {

        const key = `characters${search ?? ''}${sort ?? ''}${limit ?? ''}${offset ?? ''}`;
        const cache = localStorage.getItem(key);
        if (cache) {
            return JSON.parse(cache);
        }

        const baseUrl = `https://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}`;
        const result = await axios.get(baseUrl + `${search ? `&nameStartsWith=${search}` : ''}${baseService.getDefaultParameters(sort)}`);
        localStorage.setItem(key, JSON.stringify(result));
        return result;
    },
    async getCharacter(id) {
        const key = `character${id}`;
        const cache = localStorage.getItem(key);
        if (cache) {
            return JSON.parse(cache);
        }

        const result = await (await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}${baseService.getDefaultParameters2()}`)).data.data.results[0];
        localStorage.setItem(key, JSON.stringify(result));
        return result;
    }
}