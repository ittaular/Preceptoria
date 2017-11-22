<template>
    <div class="container ">
        <div class="col-lg-12">
            <div class="input-group col-md-4 box" id="filtro">
                <span class=" input-group-addon" id="span">Nombre</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" v-model="filterText">
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <table class="table table-hover " style="border-collapse:collapse;">
                        <thead>
                            <tr class="backform">
                                <th>#</th>
                                <th>Rol</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user,i) in filteredUsers" v-if="!seeInformation && !temp " data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.role}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.email}}</td>
                            </tr>
                            <tr v-for="(user,i) in filteredUsers" v-if="(seeInformation || temp)&& i<=index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.role}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.email}}</td>
                            </tr>
                            <tr id="esto" class="accordian-body collapse" v-if="seeInformation">
                                <td colspan="5">
                                    <div class="form-group text-center">
                                        <label class="col-md-4 control-label"></label>
                                        <div class="col-md-4">
                                            <button type="submit" class="btn btn-warning" data-toggle="modal" data-target="#myModal" @click.prevent="guardar">Asignar
                                                <span class="glyphicon glyphicon-send"></span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(user,i) in filteredUsers" v-if="(seeInformation || temp) && i>index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.role}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.email}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
        </div>
        <div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="errorMessage">
                            <div class="alert alert-danger" role="alert">
                                <strong>Error! </strong> {{errorMessage}}
                            </div>
                        </div>
                        <div v-else>
                            <div class="alert alert-success" role="alert">
                                <strong>Bien hecho! </strong> Guardado exitosamente
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../service/user';
import UserStudentService from '../service/user_student';

export default {
    props: ['student'],
    name: 'assignUser',
    data() {
        return {
            user: {},
            users: [],
            students: [],
            seeInformation: false,
            temp: false,
            filterText: '',
            SelectedUser: null,
            errorMessage: '',
            user_student: {
                user: null,
                student: null
            }
        }
    },
    methods: {
        guardar() {
            let cont = 0;
            UserStudentService.getStudentsbyUser(this.SelectedUser._id).then(response => {
                this.students = response.body.students;
                for (let i = 0; i < this.students.length; i++) {
                    if (this.students[i].student._id == this.student._id) {
                        cont = 1;
                        break;
                    } 
                }
                if (cont == 1) {
                    this.errorMessage = 'Este alumno ya fue asignado anteriormente.';
                } else {
                    this.user_student.user = this.SelectedUser._id;
                    this.user_student.student = this.student._id;
                    UserStudentService.saveUserStudent(this.user_student).then(response => {
                    }), error => {
                        this.errorMessage = this.error;
                    };
                }
            }), error => {
                this.errorMessage = this.error;
            };
        },
        listUser() {
            UserService.getUsers().then(response => {
                this.users = response.body.user;
            }), error => {
                console.log(this.error);
            };
        },
        seeI(index) {
            this.index = index;
            this.seeInformation = !this.seeInformation;
            this.SelectUSer(index);
        },
        SelectUSer(i) {
            this.SelectedUser = this.filteredUsers[i];

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

