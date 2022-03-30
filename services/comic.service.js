import axios from 'axios';
import baseService from './base.service';

export default {
    async getComics(search, sort, limit, offset) {
        const baseUrl = `https://gateway.marvel.com/v1/public/comics?limit=${limit}&offset=${offset}`;
        return axios.get(baseUrl + `${search ? `&titleStartsWith=${search}` : ''}${baseService.getDefaultParameters(sort)}`);
    }
}