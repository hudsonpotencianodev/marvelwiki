
export default {
    publickey: '0ceccf50400e4315b7b1cde8d56f7165',
    privatekey: '2f60c976588700156116cab4a6c6fd6aa7bad26f',
    MD5: require("crypto-js/md5"),
    GetTimestamp() {
        return new Date().getTime();
    },
    getDefaultParameters(sort) {
        const ts = this.GetTimestamp();
        return `&orderBy=${sort ? sort : ''}&ts=${ts}&apikey=${this.publickey}&hash=${this.MD5(ts + this.privatekey + this.publickey)}`
    },
    getDefaultParameters2(first = true) {
        const ts = this.GetTimestamp();
        return `${first ? '?' : "&"}ts=${ts}&apikey=${this.publickey}&hash=${this.MD5(ts + this.privatekey + this.publickey)}`
    },

}
//filtros
// ano
// comics
// stories
// creators
// characters
// seriesType