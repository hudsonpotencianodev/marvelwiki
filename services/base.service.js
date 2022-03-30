const publickey = '0ceccf50400e4315b7b1cde8d56f7165';
const privatekey = '2f60c976588700156116cab4a6c6fd6aa7bad26f';
const MD5 = require("crypto-js/md5");

export default {
    GetTimestamp() {
        return new Date().getTime();
    },
    getDefaultParameters(sort) {
        const ts = this.GetTimestamp();
        return `&orderBy=${sort ? sort : ''}&ts=${ts}&apikey=${publickey}&hash=${MD5(ts + privatekey + publickey)}`
    }
}