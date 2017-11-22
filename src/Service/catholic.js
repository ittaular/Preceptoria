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

    getCatholic(idCatholic) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'catholic/' + idCatholic);
    },

    saveCatholic(newCatholic) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.post(url + 'catholic', newCatholic);
    },

    updateCatholic(updateCatholic, idCatholic) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.put(url + 'update-catholic/' + idCatholic, updateCatholic);
    },

    getBaptism() {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'getBaptism/');
    },

    getFirstCommunion() {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'getFirstCommunion/');
    },

    getConfirmation() {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'getConfirmation/');
    }

}