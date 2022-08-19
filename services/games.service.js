import axios from 'axios';
import baseService from './base.service';

export default {
    async getGameNews(search, sort, limit, offset) {

        const key = `games${search ?? ''}${sort ?? ''}${limit ?? ''}${offset ?? ''}`;
        const cache = localStorage.getItem(key);
        if (cache) {
            return JSON.parse(cache);
        }

        const baseUrl = `https://www.marvel.com/v1/pagination/related_content?componentId=3315616&limit=${limit}&offset=${offset}`;
        const result = await (await axios.get(baseUrl + `${search ? `&titleStartsWith=${search}` : ''}${baseService.getDefaultParameters(sort)}`)).data.data.results.data;
        localStorage.setItem(key, JSON.stringify(result));
        return result;
    },

}