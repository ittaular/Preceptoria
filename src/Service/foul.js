import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://ittplataform.herokuapp.com/api/';
var token;

export default {
    getToken() {
        let token = localStorage.getItem('token');
        if (token) {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    },

    getFoul(idFoul) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'foul/' + idFoul);
    },

    saveFoul(newFoul) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.post(url + 'foul', newFoul);
    },

    getConfessionsByStudent(idStudent) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'foulsbyStudent/' + idStudent);
    }

} 