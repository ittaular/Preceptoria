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

    getUserStudent(idUserStudent) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'user_student/' + idUserStudent);
    },

    saveUserStudent(newUserStudent) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.post(url + 'user_student', newUserStudent);
    },

    getUsersbyStudent(idStudent) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'users_student/' + idStudent);
    },

    getStudentsbyUser(idUser) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'students_user/' + idUser);
    }

} 