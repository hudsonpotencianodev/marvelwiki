import axios from 'axios';
import baseService from './base.service';

export default {
    async getCharacters(search, sort, limit, offset) {
        const baseUrl = `https://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}`;
        return axios.get(baseUrl + `${search ? `&nameStartsWith=${search}` : ''}${baseService.getDefaultParameters(sort)}`);
    }
}