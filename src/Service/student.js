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
    getStudent(StudentID) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'student/' + StudentID);
    },
    getCatholicStudent(catholicID) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'student/catholic/' + catholicID);
    },
    getStudents(page) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'students/' + page);
    },
    getStudentByInternal(internalID) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'studentsbyInternalId/' + internalID);
    },
    getImage(image) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url + 'get-image-student/' + image);
    },
    createStudent(Student) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.post(url + 'student', Student);
    },
    createImageStudent(image) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.post(url + 'upload-image-student/' + image);
    },
    updateStudent(Student) {
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.put(url + 'update-student/' + Student._id, Student);
    }
}
