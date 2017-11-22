<template>
    <div class="container ">
        <div class="col-lg-12">
            <h2 class="text-center">Faltas</h2>
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
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Curso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(student,i) in filteredStudents" v-if="!seeInformation && !temp " data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.student.internalID}}</td>
                                <td>{{student.student.name}}</td>
                                <td>{{student.student.lastname}}</td>
                                <td>{{student.student.course}}</td>
                            </tr>
                            <tr v-for="(student,i) in filteredStudents" v-if="(seeInformation || temp)&& i<=index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.student.internalID}}</td>
                                <td>{{student.student.name}}</td>
                                <td>{{student.student.lastname}}</td>
                                <td>{{student.student.course}}</td>
                            </tr>
                            <tr id="esto" class="accordian-body collapse" v-if="seeInformation">
                                <td colspan="5">
                                    <table class="table table-hover " style="border-collapse:collapse">
                                        <thead>
                                            <tr>
                                                <th>Nivel de falta</th>
                                                <th>Falta</th>
                                                <th>Fecha</th>
                                                <th>Comentario</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(foul,i) in fouls" data-toggle="collapse " data-target="#esto " class="accordion-toggle ">
                                                <td>{{foul.level}}</td>
                                                <td>{{foul.foul}}</td>
                                                <td>{{foul.fecha}}</td>
                                                <td>{{foul.comment}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr v-for="(student,i) in filteredStudents " v-if="(seeInformation || temp) && i>index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.student.internalID}}</td>
                                <td>{{student.student.name}}</td>
                                <td>{{student.student.lastname}}</td>
                                <td>{{student.student.course}}</td>
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
import FoulService from '../Service/foul';

export default {
    name: 'seeFoul',
    data() {
        return {
            student: {},
            students: [],
            fouls: [],
            seeInformation: false,
            temp: false,
            index: -1,
            page: 1,
            total_students: 0,
            filterText: '',
            SelectedStudent: null,
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
        listStudent() {
            this.getIdentity();
            UserStudentService.getStudentsbyUser(this.identity._id).then(response => {
                this.students = response.body.students;
            }), error => {
                console.log(this.error);
            };
        },
        seeI(index) {
            this.index = index;
            this.seeInformation = !this.seeInformation;
            this.SelectStudent(index);
        },
        SelectStudent(i) {
            this.SelectedStudent = this.filteredStudents[i].student;
            FoulService.getConfessionsByStudent(this.SelectedStudent._id).then(response => {
                this.fouls = response.body.fouls;
                this.cutDate();
            }, error => {
                this.errorMessage = error.body.message;
            });
        },
        cutDate() {
            for (let i = 0; i < this.fouls.length; i++) {
                let date = this.fouls[i].date;
                let first = '';
                for (let j = 0; j < date.length; j++) {
                    if (date[j] == 'T') {
                        break;
                    }
                    first += date[j];
                }
                this.fouls[i].fecha = first;
            }
        }
    },
    filters: {
        toUppercase(value) {
            return value.toUpperCase();
        }
    },
    computed: {
        filteredStudents() {
            return this.students.filter((element) => {
                return element.student.name.match(this.filterText);
            });
        }
    },
    beforeMount() {
        this.listStudent();
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

.form-control:read-write{
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

