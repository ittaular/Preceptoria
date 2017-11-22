import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://ittplataform.herokuapp.com/api/';
var token;

export default{
    getToken() {
        let token = localStorage.getItem('token');
        if (token) {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    },

    getPreceptory(preceptoryID){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url+'preceptory/'+preceptroryID);
    },
    getPreceptorybyStudent(StudentID){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url+'preceptoryStudent/'+StudentID);
        
    },
    getPreceptorybyUser(UserID){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.get(url+'preceptoryUser/'+UserID);
    },
    createPreceptory(Preceptory){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
        return Vue.http.post(url+'preceptory',Preceptory);
	},
	updatePreceptory(Preceptory){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;
		return Vue.http.put(url+'update-preceptory/'+Preceptory._id, Preceptory);
	}
}
