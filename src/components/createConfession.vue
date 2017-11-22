<template>
    <div class="container ">
        <div class="col-lg-12">
            <h2 class="text-center">Control de Confesiones</h2>
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
                                <th>Curso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(student,i) in filteredStudents" v-if="!seeInformation && !temp " data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i,student)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.name}}</td>
                                <td>{{student.lastname}}</td>
                                <td>{{student.course}}</td>
                            </tr>
                            <tr v-for="(student,i) in filteredStudents" v-if="(seeInformation || temp)&& i<=index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i,student)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.name}}</td>
                                <td>{{student.lastname}}</td>
                                <td>{{student.course}}</td>
                            </tr>
                            <tr v-show="seeInformation">
                                <td colspan="4">
                                    <div class="panel panel-info">
                                        <div class="panel-heading" id="header">
                                            <center>
                                                <h3 class="panel-title">Confesiones</h3>
                                            </center>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-md-3" >
                                                    <form class="form-horizontal">
                                                        <fieldset>
                                                            <button type="button" class="btn btn-warning btn-sm" @click="Save()">
                                                                <span class="glyphicon glyphicon-plus"></span>
                                                                Agregar visita
                                                            </button>
                                                        <div class="spacing">
                                                                <div class="inputGroup Container">
                                                                    <div class='input-group date' id='datetimepicker3'>
                                                                        <span class="input-group-addon">
                                                                            <span class="glyphicon glyphicon-calendar"></span>
                                                                        </span>
                                                                        <input placeholder="MM/DD/YYYY" id="time" type='text' class="form-control" v-model="Confesion.date" />
                                                                    </div>
                                                                </div>
                                                        </div>
                                                        </fieldset>
                                                    </form>
                                                </div>
                                                <div class="col-md-7" >
                                                    <form class="form-horizontal">
                                                        <fieldset>
                                                            <table class="table table-hover table-bordered table-striped" style="border-collapse:collapse">
                                                                <thead>
                                                                    <td>
                                                                        <center>
                                                                            Fecha de visita
                                                                        </center>
                                                                    </td>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="confession in confessions">
                                                                        <td colspan="2">
                                                                            {{confession.date}}
                                                                        </td>
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
                            <tr v-for="(student,i) in filteredStudents " v-if="(seeInformation || temp) && i>index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i,student)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.name}}</td>
                                <td>{{student.lastname}}</td>
                                <td>{{student.course}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <nav aria-label="...">
                        <ul class="pagination pagination-sm">
                            <li class="page-item">
                                <a class="page-link glyphicon glyphicon-chevron-left" tabindex="-1" @click="PrevPage()"></a>
                            </li>
                            <li class="page-item" v-if="(page-1)>0" @click="nuevo(1)"><a class="page-link" >{{page-1}}</a></li>
                            <li class="page-item"><a class="page-link" @click="nuevo(2)">{{page}}</a></li>
                            <li class="page-item" v-if="(page+1)<((total_students/15)+1)"><a class="page-link" @click="nuevo(3)">{{page+1}}</a></li>
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
import confessionService from '../service/confession';
import StudentService from '../service/student';

export default {
    name: 'createConfession',
    data() {
        return {
            Confesion: {
                date: null,
                student: null
            },
            errorMessage: '',
            confessions: [],
            students: [],
            seeInformation: false,
            temp: false,
            filterText: '',
            SelectedStudent: null,
            identity: '',
            page: 1,
            total_students:0,
        }
    },
    methods: {
        listStudent(){
            StudentService.getStudents(this.page).then(response=>{
                this.students = response.body.student;
                this.total_students = response.body.total_items;
            }), error=>{
                console.log(this.error);
            };
        },
        seeI(index,Student) {
            this.index = index;
            this.seeInformation = !this.seeInformation;
            this.SelectStudent(Student);
            this.getConfessions();
        },
        SelectStudent(student){
            this.SelectedStudent = student;
        },
        getConfessions(){
            confessionService.getConfessionsByStudent(this.SelectedStudent._id).then(response=>{
                if(!response.body.message){
                    this.confessions = response.body.confessions;
                    this.cutDate();
                }else{
                    this.errorMessage = response.body.message;
                }
            }), error=>{
                console.log(this.error);
            };
        },
        Save(){
            this.Confesion.student = this.SelectedStudent;
            var valor = document.getElementById("time").value;
            var ex ='';
            document.getElementById("time").value = ex;
            this.Confesion.date = valor;
            confessionService.saveConfession(this.Confesion).then(response=>{
                if(!response.body.message){
                    this.confessions = response.body.confessions;
                    this.getConfessions();
                }else{
                    this.errorMessage = response.body.message;
                    console.log(this.errorMessage);
                }
            }), error=>{
                console.log(this.error);
            };
        },
        cutDate() {
            for (let i = 0; i < this.confessions.length; i++) {
                let date = this.confessions[i].date;
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
                this.confessions[i].date = first;
            }
        },
        NextPage(){
            var limit = this.total_students/15;
            if(this.page<limit){
                this.page++;
                this.listStudent();
            }
        },
        PrevPage(){
            if (this.page>1) {
                this.page--;
                this.listStudent();
            }
        },
        nuevo(valor){
            var limit = this.total_students/15; 
            if (valor == 1) {
                if (this.page>1) {
                    this.page--;
                }
            }
            if(valor == 3){
                if(this.page<=limit){
                    this.page++;
                }
            }
            this.listStudent();
        },
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
    },
    mounted() {
        $(document).ready(function() {
            $('#datetimepicker3').datetimepicker({
                format: 'MM/DD/YYYY'
            });
        });
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

body {
    width:100px;
	height:100px;
    background: -webkit-linear-gradient(90deg, #16222A 10%, #3A6073 90%); /* Chrome 10+, Saf5.1+ */
    background:    -moz-linear-gradient(90deg, #16222A 10%, #3A6073 90%); /* FF3.6+ */
    background:     -ms-linear-gradient(90deg, #16222A 10%, #3A6073 90%); /* IE10 */
    background:      -o-linear-gradient(90deg, #16222A 10%, #3A6073 90%); /* Opera 11.10+ */
    background:         linear-gradient(90deg, #16222A 10%, #3A6073 90%); /* W3C */
    font-family: 'Raleway', sans-serif;
}

p {
	color:;
}

.spacing {
	padding-top:7px;
	padding-bottom:7px;
}
.middlePage {
	width: 680px;
    height: 500px;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
#header{
    background:#42BFC2;
    color: #FFFFFF;
}

</style>


