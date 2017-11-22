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

    getNote(idNote) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'note/' + idNote);
    },

    saveNote(newNote) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.post(url + 'note', newNote);
    },

    updateNote(updateNote, idNote) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.put(url + 'update-note/' + idNote, updateNote);
    },

    getNotesByStudent(idStudent) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'notesbyStudent/' + idStudent);
    }

} 