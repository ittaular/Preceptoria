<template>
  <div>
    <div>
      <div class="input-group col-md-4 box" id="filtro">
        <span class=" input-group-addon" id="span">Nombre</span>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" v-model="filterText">
      </div>
      <div class="panel panel-default" >
          <div class="panel-body">
              <table class="table table-hover" style="border-collapse:collapse;">
                  <thead >
                      <tr>
                          <th>#</th>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Curso</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(student,i) in filteredStudents" v-if="!seeInformation" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                          <th scope="row">{{i+1}}</th>
                          <td>{{student.internalID}}</td>
                          <td>{{student.name}}</td>
                          <td>{{student.lastname}}</td>
                          <td>{{student.course}}</td>
                      </tr>
                      <tr v-for="(student,i) in filteredStudents" v-if="seeInformation && i<=index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                          <th scope="row">{{i+1}}</th>
                          <td>{{student.internalID}}</td>
                          <td>{{student.name}}</td>
                          <td>{{student.lastname}}</td>
                          <td>{{student.course}}</td>
                      </tr>
                      <tr id="esto" class="accordian-body collapse">
                        <createStudent/>
                      </tr>
                      <tr v-for="(student,i) in filteredStudents" v-if="seeInformation && i>index"  data-toggle="collapse" data-target="#datos" class="accordion-toggle" v-on:click="seeF(i)">
                          <th scope="row">{{i+1}}</th>
                          <td>{{student.internalID}}</td>
                          <td>{{student.name}}</td>
                          <td>{{student.lastname}}</td>
                          <td>{{student.course}}</td>
                      </tr>
                  </tbody>
              </table>
              <nav aria-label="...">
                <ul class="pagination pagination-sm">
                    <li class="page-item">
                        <a class="page-link glyphicon glyphicon-chevron-left" href="#" tabindex="-1" @click="PrevPage()"></a>
                    </li>
                    <li class="page-item" v-if="(page-1)>0" @click="nuevo(1)"><a class="page-link" href="#">{{page-1}}</a></li>
                    <li class="page-item"><a class="page-link" href="#" @click="nuevo(2)">{{page}}</a></li>
                    <li class="page-item" v-if="(page+1)<((total_students/15)+1)"><a class="page-link" href="#" @click="nuevo(3)">{{page+1}}</a></li>
                    <li class="page-item">
                        <a class=" page-link glyphicon glyphicon-chevron-right" href="#" @click="NextPage()"></a>
                    </li>
                </ul>
              </nav>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentService from '../service/student'
import createStudent from './createStudent.vue';
export default {
  name: 'TC',
  data () {
    return {
      student: {},
      students : [],
      error: 'Problema con el cargado',
      seeInformation: false,
      index:-1,
      page: 1,
      total_students:0,
      filterText: '',
      SelectedStudent: null
    }
  },
    components:{
      createStudent
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
  methods:{
    listStudent(){
      StudentService.getStudents(this.page).then(response=>{
        this.students = response.body.student;
        this.total_students = response.body.total_items;
      }), error=>{
        console.log(this.error);
      };
    },
    seeI(index){
      this.index = index;
      this.seeInformation = !this.seeInformation;
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
    SelectStudent(student){
        this.SelectedStudent = student;
        console.log(this.SelectedStudent);
    }
  },
  beforeMount(){
    this.listStudent();
  }
}

</script>

<style scoped>
#filtro {
    margin-top: 15px;
    margin-bottom: 15px;
}
#span{
    background : #42bfc2; 
    color: #FFFFFF;   
}
</style>