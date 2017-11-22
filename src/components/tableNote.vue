<template>
    <div class="container ">
        <div class="col-lg-12">
            <h2 class="text-center">Nueva Calificación</h2>
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
                                <td>{{student.internalID}}</td>
                                <td>{{student.name}}</td>
                                <td>{{student.lastname}}</td>
                                <td>{{student.course}}</td>
                            </tr>
                            <tr v-for="(student,i) in filteredStudents" v-if="(seeInformation || temp)&& i<=index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.internalID}}</td>
                                <td>{{student.name}}</td>
                                <td>{{student.lastname}}</td>
                                <td>{{student.course}}</td>
                            </tr>
                            <tr id="esto" class="accordian-body collapse" v-if="seeInformation">
                                <td colspan="5">
                                    <createNote :student="SelectedStudent" />
                                </td>
                            </tr>
                            <tr v-for="(student,i) in filteredStudents" v-if="(seeInformation || temp) && i>index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.internalID}}</td>
                                <td>{{student.name}}</td>
                                <td>{{student.lastname}}</td>
                                <td>{{student.course}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <nav aria-label="...">
                        <ul class="pagination pagination-sm ">
                            <li class="page-item">
                                <a class="page-link glyphicon glyphicon-chevron-left" tabindex="-1" @click="PrevPage()"></a>
                            </li>
                            <li class="page-item" v-if="(page-1)>0" @click="nuevo(1)">
                                <a class="page-link">{{page-1}}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" @click="nuevo(2)">{{page}}</a>
                            </li>
                            <li class="page-item" v-if="(page+1)<((total_students/15)+1)">
                                <a class="page-link" @click="nuevo(3)">{{page+1}}</a>
                            </li>
                            <li class="page-item">
                                <a class=" page-link glyphicon glyphicon-chevron-right" @click="NextPage()"></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
import StudentService from '../service/student';
import createNote from '../components/createNote.vue';

export default {
    name: 'tableNote',
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
            SelectedStudent: null
        }
    },
    components: {
        createNote
    },
    methods: {
        listStudent() {
            StudentService.getStudents(this.page).then(response => {
                this.students = response.body.student;
                this.total_students = response.body.total_items;
            }), error => {
                console.log(this.error);
            };
        },
        seeI(index) {
            this.index = index;
            this.seeInformation = !this.seeInformation;
            this.SelectStudent(index);
        },
        NextPage() {
            var limit = this.total_students / 15;
            if (this.page < limit) {
                this.page++;
                this.listStudent();
            }
        },
        PrevPage() {
            if (this.page > 1) {
                this.page--;
                this.listStudent();
            }
        },
        nuevo(valor) {
            var limit = this.total_students / 15;
            if (valor == 1) {
                if (this.page > 1) {
                    this.page--;
                }
            }
            if (valor == 3) {
                if (this.page <= limit) {
                    this.page++;
                }
            }
            this.listStudent();
        },
        SelectStudent(i) {
            this.SelectedStudent = this.filteredStudents[i];
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
                return element.name.match(this.filterText);
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

