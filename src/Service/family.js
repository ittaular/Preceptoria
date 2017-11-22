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
    getFamilyInfo(StudentID){
        this.getToken();        
        Vue.http.headers.common.Authorization = this.token;        
        return Vue.http.get(url+'family/'+StudentID);
    },
    createFamily(Family){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;        
        return Vue.http.post(url+'family',Family);
	},
	updateFamily(Family){
        this.getToken();
        Vue.http.headers.common.Authorization = this.token;        
		return Vue.http.put(url+'update-family/'+Family._id, Family);
	}
}
