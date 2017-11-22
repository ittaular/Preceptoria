<template>
    <div class="container ">
        <div class="col-lg-12">
            <legend class=" text-center">
                <h2>Estudiantes sin Sacramentos</h2>
            </legend>
            <div class="input-group col-md-4 box" id="filtro">

                <div class="col-md-12 selectContainer">
                    <select class="form-control" name="size" v-model="selection">
                        <option value="B">Bautismo</option>
                        <option value="P">Primera Comunión</option>
                        <option value="C">Confirmación</option>
                    </select>
                </div>
                <span class=" input-group-addon" id="span">
                    <button id="botton" @click.prevent="seleccion">Filtrar</button>
                </span>
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <table class="table table-hover">
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
                            <tr v-for="(student,i) in students">
                                <th scope="row">{{i+1}}</th>
                                <td>{{student.internalID}}</td>
                                <td>{{student.name}}</td>
                                <td>{{student.lastname}}</td>
                                <td>{{student.course}}</td>
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
import StudentService from '../service/student';
import CatholicService from '../service/catholic';

export default {
    name: 'listSacraments',
    data() {
        return {
            student: {},
            students: [],
            selection: '',
            find: []
        }
    },
    methods: {
        seleccion() {
            if (this.selection == 'B') {
                this.students = [];
                CatholicService.getBaptism().then(response => {
                    this.find = response.body.find;
                    for (let i = 0; i < this.find.length; i++) {
                        StudentService.getCatholicStudent(this.find[i]._id).then(response => {
                            if (response.body.student != '') {
                                this.students.push(response.body.student[0]);
                            }
                        }), error => {
                            console.log(this.error);
                        };
                    }
                }), error => {
                    console.log(this.error);
                };
            } else if (this.selection == 'P') {
                this.students = [];
                CatholicService.getFirstCommunion().then(response => {
                    this.find = response.body.find;
                    for (let i = 0; i < this.find.length; i++) {
                        StudentService.getCatholicStudent(this.find[i]._id).then(response => {
                            if (response.body.student != '') {
                                this.students.push(response.body.student[0]);
                            }
                        }), error => {
                            console.log(this.error);
                        };
                    }
                }), error => {
                    console.log(this.error);
                };
            } else if (this.selection == 'C') {
                this.students = [];
                CatholicService.getConfirmation().then(response => {
                    this.find = response.body.find;
                    for (let i = 0; i < this.find.length; i++) {
                        StudentService.getCatholicStudent(this.find[i]._id).then(response => {
                            if (response.body.student != '') {
                                this.students.push(response.body.student[0]);
                            }
                        }), error => {
                            console.log(this.error);
                        };
                    }
                }), error => {
                    console.log(this.error);
                };
            }
        }
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

#botton {
    background: #42bfc2;
    color: #FFFFFF;
    border: none;
}

.backform {
    background-color: #42bfc2;
    color: #FFFFFF;
}
</style>

