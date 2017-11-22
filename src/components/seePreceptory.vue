<template>
    <div class="container ">
        <div class="col-lg-12">
            <h2 class="text-center">PRECEPTORIAS</h2>
            <div class="input-group col-md-4 box" id="filtro">
                <span class=" input-group-addon" id="span">Nombre</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" v-model="filterText">
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <table class="table table-hover " style="border-collapse:collapse">
                        <thead>
                            <tr class="backform">
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user,i) in filteredUsers" v-if="!seeInformation && !temp " data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.phone}}</td>
                            </tr>
                            <tr v-for="(user,i) in filteredUsers" v-if="(seeInformation || temp)&& i<=index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.phone}}</td>
                            </tr>
                            <tr id="esto" class="accordian-body collapse" v-if="seeInformation">
                                <td colspan="5">
                                <!--><!-->
                                    <div class="panel panel-info">
                                        <div class="panel-heading" >
                                            <div class="input-group col-md-4 box" id="filtro2">
                                                <span class=" input-group-addon" id="span">Nombre Estudiante</span>
                                                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" v-model="filterText2">
                                            </div>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div >
                                                    <form class="form-horizontal">
                                                        <fieldset>
                                                            <table class="table table-hover " style="border-collapse:collapse">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Estudiante</th>
                                                                        <th>Fecha</th>
                                                                        <th>Hora</th>
                                                                        <th>Padre</th>
                                                                        <th>Madre</th>
                                                                        <th>Preceptor</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(preceptory,i) in filteredPreceptory" data-toggle="collapse " data-target="#esto " class="accordion-toggle ">
                                                                        <td>{{i+1}}</td>
                                                                        <td>{{preceptory.student.name}}</td>
                                                                        <td>{{preceptory.fecha}}</td>
                                                                        <td>{{preceptory.hora}}</td>
                                                                        <td v-if="preceptory.father">Asistió</td>
                                                                        <td v-if="!preceptory.father">No Asistió</td>
                                                                        <td v-if="preceptory.mother">Asistió</td>
                                                                        <td v-if="!preceptory.mother">No Asistió</td> 
                                                                        <td v-if="preceptory.presented">Asistió</td>
                                                                        <td v-if="!preceptory.presented">No Asistió</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </fieldset>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(user,i) in filteredUsers " v-if="(seeInformation || temp) && i>index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.phone}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
import UserStudentService from '../service/user_student';
import PreceptoryService from '../Service/preceptory';
import StudentService from '../service/student';
import UserService from '../service/user';

export default {
    name: 'seePreceptory',
    data() {
        return {
            Preceptory: {
                date: null,
                presented: null,
                mother: null,
                father: null,
                student: null,
                teacher: null
            },
            errorMessage: '',
            student: {},
            students: [],
            users:[],
            preceptories: [],
            seeInformation: false,
            temp: false,
            filterText: '',
            filterText2: '',
            SelectedUser: null,
            identity: ''
            
        }
    },
    methods: {
        getIdentity() {
            let identity = JSON.parse(localStorage.getItem('identity'));
            if (identity) {
                this.identity = identity;
            } else {
                this.identity = null;
            }
            return this.identity;
        },
        listUser() {
            UserService.getUsers().then(response => {
                this.users = response.body.user;
                this.filtrar();
            }), error => {
                console.log(this.error);
            };
        },
        filtrar(){
            var temp = [];
            for(let i = 0; i < this.users.length; i++){
                if(this.users[i].role == "ROLE_TEACHER"){
                    temp.push(this.users[i]);
                }
            }
            this.users=temp;
        },
        listStudent() {
            StudentService.getStudents(this.page).then(response=>{
                this.students = response.body.student;
                this.total_students = response.body.total_items;
            }), error=>{
                console.log(this.error);
            };
        },
        seeI(index) {
            this.index = index;
            this.seeInformation = !this.seeInformation;
            this.SelectUser(index);
        },
        SelectUser(i) {
            this.SelectedUser = this.users[i];
            PreceptoryService.getPreceptorybyUser(this.SelectedUser._id).then(response => {
                this.preceptories = response.body.preceptory;
                this.cutDate();
            }), error => {
                console.log(this.error);
            };
        },
        cutDate() {
            for (let i = 0; i < this.preceptories.length; i++) {
                let date = this.preceptories[i].date;
                let first ='';
                let second = '';
                let temp =0;
                for (let j = 0; j < date.length; j++) {                              
                    if(date[j]=='T'){
                        temp =1;
                    }
                    if(temp == 0){
                        first += date[j];
                    }else{
                        second += date[j+1];
                    }
                    if(j == 17){
                        break;
                    }
                    
                }
                this.preceptories[i].fecha = first;
                this.preceptories[i].hora =second;
            }
        }
    },
    filters: {
        toUppercase(value) {
            return value.toUpperCase();
        }
    },
    computed: {
        filteredUsers() {
            return this.users.filter((element) => {
                return element.name.match(this.filterText);
            });
        },
        filteredPreceptory() {
            return this.preceptories.filter((element) => {
                return element.student.name.match(this.filterText2);
            });
        }
    },
    beforeMount() {
        this.listUser();
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 15px 10px;
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
}

.form-control {
    z-index: 0;
}

#filtro {
    margin-top: 15px;
    margin-bottom: 15px;
}

#span {
    background: #42bfc2;
    color: #FFFFFF;
}

.backform {
    background-color: #42bfc2;
    color: #FFFFFF;
}
</style>


