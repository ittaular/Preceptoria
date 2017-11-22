<template>
    <div class="container ">
        <div class="col-lg-12">
            <h2 class="text-center">Nueva Falta</h2>
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
                                    <createFoul :student="SelectedStudent" />
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
import createFoul from '../components/createFoul.vue';

export default {
    name: 'tableFoul',
    data() {
        return {
            student: {},
            students: [],
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
    components: {
        createFoul
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

