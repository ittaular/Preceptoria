import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://ittplataform.herokuapp.com/api/';
var identity;
var token;

export default {
    login(user, gethash = null) {
        user.gethash = gethash;
        return Vue.http.post(url + 'login', user);
    },

    register(newUser, isTeacher = null){
        newUser.isTeacher= isTeacher;
        return Vue.http.post(url + 'register', newUser);
    },

    getUsers(){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'users');
    },

    updateUser(updateUser, id){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.put(url + 'update-user/'+id,updateUser);
    },

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity) {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    },

    getToken() {
        let token = localStorage.getItem('token');
        if (token) {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

}

