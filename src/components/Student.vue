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
                  <thead class="cabecera">
                      <tr>
                          <th>#</th>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Curso</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(student,i) in filteredStudents" v-if="!seeFamily && !seeInformation && !seeFouls && !seeEdi && !seePrec && !seeSacr">
                          <th scope="row">{{i+1}}</th>
                          <td>{{student.internalID}}</td>
                          <td>{{student.name}}</td>
                          <td>{{student.lastname}}</td>
                          <td>{{student.course}}</td>
                          <td>
                            <ul class="nav navbar-nav">
                                <li class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" @click="SelectStudent(student)"><span class="glyphicon glyphicon-user pull-right"></span></a>
                                <ul class="dropdown-menu pull-left">
                                    <li><a data-toggle="collapse" data-target="#datos" class="accordion-toggle" v-on:click="seeI(i)">Datos<span class="glyphicon glyphicon-user pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#editar" class="accordion-toggle" v-on:click="seeEdit(i)">Editar<span class="glyphicon glyphicon-pencil pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#familia,#familia2" class="accordion-toggle"  v-on:click="seeFam(i)">Familia<span class="glyphicon glyphicon-home pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#faltas" class="accordion-toggle"  v-on:click="seeFou(i)">Faltas<span class="glyphicon glyphicon-list-alt pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#preceptores" class="accordion-toggle"  v-on:click="seePre(i)">Preceptores<span class="glyphicon glyphicon-education pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#sacramentos" class="accordion-toggle"  v-on:click="seeSac(i)">Sacramentos<span class="glyphicon glyphicon-heart-empty pull-right"></span></a></li>
                                </ul>
                                </li>
                            </ul> 
                          </td>
                      </tr>
                      <tr v-for="(student,i) in filteredStudents" v-if="(seeFamily || seeInformation || seeFouls || seeEdi || seePrec || seeSacr) && i<=index">
                          <th scope="row">{{i+1}}</th>
                          <td>{{student.internalID}}</td>
                          <td>{{student.name}}</td>
                          <td>{{student.lastname}}</td>
                          <td>{{student.course}}</td>
                          <td>
                            <ul class="nav navbar-nav">
                                <li class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" @click="SelectStudent(student)"><span class="glyphicon glyphicon-user pull-right"></span></a>
                                <ul class="dropdown-menu pull-right">
                                    <li><a data-toggle="collapse" data-target="#datos" class="accordion-toggle" v-on:click="seeI(i)">Datos<span class="glyphicon glyphicon-user pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#editar" class="accordion-toggle" v-on:click="seeEdit(i)">Editar<span class="glyphicon glyphicon-pencil pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#familia,#familia2" class="accordion-toggle"  v-on:click="seeFam(i)">Familia<span class="glyphicon glyphicon-home pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#faltas" class="accordion-toggle"  v-on:click="seeFou(i)">Faltas<span class="glyphicon glyphicon-list-alt pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#preceptores" class="accordion-toggle"  v-on:click="seePre(i)">Preceptores<span class="glyphicon glyphicon-education pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#sacramentos" class="accordion-toggle"  v-on:click="seeSac(i)">Sacramentos<span class="glyphicon glyphicon-heart-empty pull-right"></span></a></li>
                                </ul>
                                </li>
                            </ul> 
                          </td>
                      </tr>
                      
                      <tr v-if="SelectedStudent!=null && seeFamily">
                        <th></th>
                        <td COLSPAN = 1></td>
                        <td COLSPAN = 3>
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#menu2">Datos Familiares</a></li>
                                <li><a data-toggle="tab" href="#home" v-show="SelectedStudent.mother != null" >Madre</a></li>
                                <li  v-if="SelectedStudent.father!=null"><a data-toggle="tab" href="#menu1" v-show="SelectedStudent.father.role == null">Padre</a></li>
                                <li  v-if="SelectedStudent.father!=null"><a data-toggle="tab" href="#menu1" v-show="SelectedStudent.father.role == 'FATHER'">Padre</a></li>
                                <li  v-if="SelectedStudent.father!=null"><a data-toggle="tab" href="#menu1" v-show="SelectedStudent.father.role == 'OTHER'">Encargado</a></li>
                            </ul>
                            <div class="tab-content">
                                <div id="menu2" class="tab-pane fade in active">
                                    <form v-if="SelectedStudent.familyInformation != null" class="datos">
                                        <div class="form-group col-md-6">
                                            <label class="col-md-4 control-label">Estado Civil</label>
                                            <div class="inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="stateCivil" v-bind:placeholder="SelectedStudent.familyInformation.stateCivil"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="col-md-4 control-label">Estado Actual</label>
                                            <div class="inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="stateActual" v-bind:placeholder="SelectedStudent.familyInformation.stateActual"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="col-md-4 control-label">Relaciones Familiares</label>
                                            <div class="inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-heart"></i>
                                                    </span>
                                                    <input name="familyRelations" v-bind:placeholder="SelectedStudent.familyInformation.familyRelations"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="col-md-4 control-label">Vicios</label>
                                            <div class="inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-glass"></i>
                                                    </span>
                                                    <input name="vices" v-bind:placeholder="SelectedStudent.familyInformation.vices"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>                                     
                                        <div class="form-group col-md-12">
                                            <label class="col-md-2 control-label">Observaciones</label>
                                            <div class="inputGroupContainer">
                                                <div class="input-group col-md-8">
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" readonly>{{SelectedStudent.familyInformation.observations}}</textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-12">
                                            <label class="col-md-2 control-label">Recursos</label>                                        
                                            <label class="checkbox-inline">
                                                <div v-if="SelectedStudent.familyInformation.computer">
                                                    <input type="checkbox" value="" checked="checked" disabled >Comp
                                                </div>
                                                <div v-if="!SelectedStudent.familyInformation.computer">
                                                    <input type="checkbox" value=""  disabled >COMPU
                                                </div>
                                            </label>
                                            <label class="checkbox-inline">
                                                <div v-if="SelectedStudent.familyInformation.cableTV">
                                                    <input type="checkbox" value="" checked="checked" disabled >TV por Cable
                                                </div>
                                                <div v-if="!SelectedStudent.familyInformation.cableTV">
                                                    <input type="checkbox" value=""  disabled >TV por Cable
                                                </div>
                                            </label>
                                            <label class="checkbox-inline">
                                                <div v-if="SelectedStudent.familyInformation.internet">
                                                    <input type="checkbox" value="" checked="checked" disabled >Internet
                                                </div>
                                                <div v-if="!SelectedStudent.familyInformation.internet">
                                                    <input type="checkbox" value=""  disabled >Internet
                                                </div>
                                            </label>                                        
                                            <label class="checkbox-inline">
                                                <div v-if="SelectedStudent.familyInformation.wentMisa">
                                                    <input type="checkbox" value="" checked="checked" disabled >Asiste a Misa
                                                </div>
                                                <div v-if="!SelectedStudent.familyInformation.wentMisa">
                                                    <input type="checkbox" value=""  disabled >Asiste a Misa
                                                </div>
                                            </label>
                                        </div>
                                    </form>
                                </div>
                                <div id="menu1" class="tab-pane fade">
                                    <form v-if="SelectedStudent.father != null" class="datos">
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Nombre</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="FatherName" v-bind:placeholder="SelectedStudent.father.name"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Apellido</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="FatherName" v-bind:placeholder="SelectedStudent.father.lastname"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Teléfono</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-earphone"></i>
                                                    </span>
                                                    <input name="telefono" v-bind:placeholder="SelectedStudent.father.phone"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Celular</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-phone"></i>
                                                    </span>
                                                    <input name="movil" v-bind:placeholder="SelectedStudent.father.celphone"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Trabajo</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-briefcase"></i>
                                                    </span>
                                                    <input name="job" v-bind:placeholder="SelectedStudent.father.work" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                                                            <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Dirección de trabajo</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-pushpin"></i>
                                                    </span>
                                                    <input name="workAddres" v-bind:placeholder="SelectedStudent.father.workAddress" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                                                            <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Labor que desempeña</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="workPerformed" v-bind:placeholder="SelectedStudent.father.workPerformed" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Antigüedad</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-briefcase"></i>
                                                    </span>
                                                    <input name="antiquity" v-bind:placeholder="SelectedStudent.father.antiquity" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>                                    <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Religión</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-book"></i>
                                                    </span>
                                                    <input name="religion" v-bind:placeholder="SelectedStudent.father.religion" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div id="home" class="tab-pane fade ">
                                    <form v-if="SelectedStudent.mother != null" class="datos">
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Nombre</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="motherName" v-bind:placeholder="SelectedStudent.mother.name"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Apellido</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="motherName" v-bind:placeholder="SelectedStudent.mother.lastname"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Teléfono</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-earphone"></i>
                                                    </span>
                                                    <input name="telefono" v-bind:placeholder="SelectedStudent.mother.phone"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Celular</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-phone"></i>
                                                    </span>
                                                    <input name="movil" v-bind:placeholder="SelectedStudent.mother.celphone"  class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Trabajo</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-briefcase"></i>
                                                    </span>
                                                    <input name="job" v-bind:placeholder="SelectedStudent.mother.work" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                                                            <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Dirección de trabajo</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-pushpin"></i>
                                                    </span>
                                                    <input name="workAddres" v-bind:placeholder="SelectedStudent.mother.workAddress" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                                                            <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Labor que desempeña</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="workPerformed" v-bind:placeholder="SelectedStudent.mother.workPerformed" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Antigüedad</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-briefcase"></i>
                                                    </span>
                                                    <input name="antiquity" v-bind:placeholder="SelectedStudent.mother.antiquity" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>                                    <!--><!-->
                                        <div class="form-group col-md-12 col-md-offset-1">
                                            <label class="col-md-2 control-label">Religión</label>
                                            <div class="col-md-6  inputGroupContainer">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-book"></i>
                                                    </span>
                                                    <input name="religion" v-bind:placeholder="SelectedStudent.mother.religion" class="form-control" type="text" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </td>
                        <td COLSPAN =1  ></td>
                      </tr>
                      <tr v-if="SelectedStudent!=null && seeInformation">
                        <th></th>
                        <td COLSPAN = 1></td>
                        <td COLSPAN = 1>
                            <div class="container col-md-6 col-md-offset-2">
                                <div class="card hovercard">
                                    <div class="cardheader">
                                    </div>
                                    <div class="avatar" v-if="SelectedStudent.picture != 'null'">
                                        <img alt="" v-bind:src="SelectedStudent.picture">
                                    </div>
                                    <div class="avatar" v-else>
                                        <img alt="" src="http://i2.wp.com/arqa.com/wp-content/uploads/2015/06/new-mistery.png">
                                    </div>
                                    <div class="info">
                                        <div class="title">
                                            <a target="_blank">{{SelectedStudent.name}} {{SelectedStudent.lastname}}</a>
                                        </div>
                                        <div class="desc">Correo: {{SelectedStudent.email}}</div>
                                        <div class="desc">Teléfono: {{SelectedStudent.phone}}</div>
                                        <div class="desc">Curso: {{SelectedStudent.course}}</div>
                                    </div>
                                    <div class="bottom">
                                        <a class="btn btn-primary btn-twitter btn-sm">
                                            <i class="fa fa-twitter"></i>
                                        </a>
                                        <a class="btn btn-danger btn-sm" rel="publisher">
                                            <i class="fa fa-google-plus"></i>
                                        </a>
                                        <a class="btn btn-primary btn-sm" rel="publisher" >
                                            <i class="fa fa-facebook"></i>
                                        </a>
                                        <a class="btn btn-danger btn-sm" rel="publisher" >
                                            <i class="fa fa-behance"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>    
                        </td>
                        <td COLSPAN = 3></td>                        
                      </tr>
                      <tr v-if="SelectedStudent!=null && seeFouls">
                        <th></th>
                        <td COLSPAN = 1></td>
                        <td COLSPAN = 3>
                            <div>
                                <div class="col-md-8 col-md-offset-2">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="table-container">
                                                <table class="table table-filter">
                                                    <tbody>
                                                        <tr v-for="foul in fouls">
                                                            <td>
                                                                <a class="star">
                                                                    <i class="glyphicon glyphicon-star"></i>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <div class="media">
                                                                    <div class="media-body">
                                                                        <span class="media-meta pull-right" id="leve" v-if="foul.level == 'leve'">(Leve)</span>
                                                                        <span class="media-meta pull-right" id="grave" v-if="foul.level == 'grave'">(Grave)</span>                                                                    
                                                                        <h4 class="title">
                                                                            {{foul.foul}}
                                                                            <span class="pull-right pendiente">{{foul.date}}</span>
                                                                        </h4>
                                                                        <p class="summary">{{foul.comment}}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr v-if="fouls.length==0">
                                                            <td>
                                                                <a class="star">
                                                                    <i class="glyphicon glyphicon-star"></i>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <div class="media">
                                                                    <div class="media-body">
                                                                        <h4 class="title">
                                                                            Historial
                                                                        </h4>
                                                                        <p class="summary">El estudiante no tiene faltas registradas</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td>
                        <td COLSPAN = 1></td>
                      </tr>
                      <tr v-if="SelectedStudent!=null && seeSacr">
                        <th></th>
                        <td COLSPAN = 1></td>
                        <td COLSPAN = 3>
                            <div>
                                <div class="col-md-8 col-md-offset-2">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="table-container">
                                                <table class="table table-filter">
                                                    <tbody>
                                                        <tr v-if="SelectedStudent.catholic != null">
                                                            <td>
                                                                <a class="star">
                                                                    <i class="glyphicon glyphicon-star"></i>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <div class="media">
                                                                    <div class="media-body">
                                                                        <h4 class="title">
                                                                            Sacramentos:
                                                                        </h4>
                                                                        <p class="summary" v-if="SelectedStudent.catholic.baptism">Bautismo</p>
                                                                        <p class="summary" v-if="SelectedStudent.catholic.firstCommunion">Primera Comunión</p>
                                                                        <p class="summary" v-if="SelectedStudent.catholic.confirmation">Confirma</p>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr v-else>
                                                            <td>
                                                                <a class="star">
                                                                    <i class="glyphicon glyphicon-star"></i>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <div class="media">
                                                                    <div class="media-body">
                                                                        <h4 class="title">
                                                                            Sacramentos
                                                                        </h4>
                                                                        <p class="summary">El estudiante no tiene sacramentos registrados</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td COLSPAN = 1></td>
                        
                      </tr>
                      <tr v-if="SelectedStudent!=null && seePrec">
                        <th></th>
                        <td COLSPAN = 1></td>
                        <td COLSPAN = 3>
                            <div>
                                <div class="col-md-8 col-md-offset-2">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="table-container">
                                                <table class="table table-filter">
                                                    <thead v-if="preceptores.length > 0" class="cabecera">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Nombre</th>
                                                            <th>Apellido</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>                                                        
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(precep,i) in preceptores">
                                                            <th scope="row">{{i+1}}</th>
                                                            <td>{{precep.user.name}}</td>
                                                            <td>{{precep.user.lastname}}</td>
                                                            <td>{{precep.user.email}}</td>
                                                            <td>{{precep.user.phone}}</td>                                                        
                                                        </tr>
                                                        <tr v-if="preceptores.length == 0">
                                                            <td>
                                                                <a class="star">
                                                                    <i class="glyphicon glyphicon-star"></i>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <div class="media">
                                                                    <div class="media-body">
                                                                        <h4 class="title">
                                                                            Historial
                                                                        </h4>
                                                                        <p class="summary">El estudiante no tiene preceptores registrados</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td COLSPAN = 1></td>
                        
                      </tr>
                      <tr v-show="seeEdi">
                        <td COLSPAN =5  >
                            <form class="form-horizontal tab-pane fade in active" action=" " method="post" id="reg_form" >
                                <fieldset>
                                <!-- Form Name -->
                                    <legend class=" text-center">
                                        <h2>Modificar datos del Estudiante</h2>
                                    </legend>
                                    <br>
                                                <!-- Text input-->
                                    <div class="form-group">
                                        <label class="col-md-4 control-label">Nombre</label>
                                        <div class="col-md-6  inputGroupContainer">
                                            <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <i class="glyphicon glyphicon-user"></i>
                                                    </span>
                                                    <input name="name" placeholder="Nombre" class="form-control" type="text" :value="student.name" @input="student.name = $event.target.value">
                                                </div>
                                            </div>
                                        </div>
                                                <!-- Text input-->
                                        <div class="form-group">
                                            <label class="col-md-4 control-label">Apellido</label>
                                                <div class="col-md-6  inputGroupContainer">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="glyphicon glyphicon-user"></i>
                                                        </span>
                                                        <input name="lastname" placeholder="Apellido" class="form-control" type="text" :value="student.lastname" @input="student.lastname = $event.target.value">
                                                    </div>
                                                </div>
                                        </div>
                                                <!-- Text input-->
                                            <div class="form-group">
                                                <label class="col-md-4 control-label">Correo</label>
                                                <div class="col-md-6  inputGroupContainer">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="glyphicon glyphicon-envelope"></i>
                                                        </span>
                                                        <input name="email" placeholder="Correo Electrónico" class="form-control" type="text" :value="student.email" @input="student.email = $event.target.value">
                                                    </div>
                                                </div>
                                            </div>
                                                <!-- Text input-->
                                            <div class="form-group">
                                                <label class="col-md-4 control-label">Teléfono</label>
                                                <div class="col-md-6  inputGroupContainer">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="glyphicon glyphicon-earphone"></i>
                                                        </span>
                                                        <input name="phone" placeholder="2222-0202" class="form-control" type="text" :value="student.phone" @input="student.phone = $event.target.value">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-md-4 control-label">ID interno</label>
                                                <div class="col-md-6  inputGroupContainer">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="glyphicon glyphicon-user"></i>
                                                        </span>
                                                        <input name="internalID" placeholder="00000" class="form-control" type="text" :value="student.internalID" @input="student.internalID = $event.target.value">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-md-4 control-label">Curso</label>
                                                <div class="col-md-6  inputGroupContainer">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="glyphicon glyphicon-education"></i>
                                                        </span>
                                                        <input name="course" placeholder="Curso" class="form-control" type="text" :value="student.course" @input="student.course = $event.target.value">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-md-4 control-label">Identidad</label>
                                                <div class="col-md-6  inputGroupContainer">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="glyphicon glyphicon-user"></i>
                                                        </span>
                                                        <input name="identity" placeholder="0801-1999-99999" class="form-control" type="text" :value="student.identity" @input="student.identity = $event.target.value">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-md-4 control-label">Fecha de nacimiento</label>
                                                <div class="col-md-6  inputGroupContainer">
                                                    <div class='input-group date' id='datetimepicker3'>
                                                        <span class="input-group-addon">
                                                                <span class="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                        <input placeholder="MM/DD/YYYY" id="time" type='text' class="form-control" v-model="student.birthday" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-md-4 control-label">Dirección</label>
                                                <div class="col-md-6  inputGroupContainer">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="glyphicon glyphicon-home"></i>
                                                        </span>
                                                        <input name="home" placeholder="Dirección" class="form-control" type="text" :value="student.home" @input="student.home = $event.target.value">
                                                    </div>
                                                </div>
                                            </div>
                                            <!--Complemento para editar católico-->
                                            <div v-if=" SelectedStudent != null">
                                                <div class="form-group" v-if="student.catholic">
                                                    <label class="col-md-4 control-label" >Católico</label>
                                                    <div class="col-md-6  inputGroupContainer">
                                                        <div class="radio">
                                                            <label><input type="radio" name="catolico" value="true" :checked="true">Si</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group" v-if="student.catholic">
                                                    <label class="col-md-4 control-label">Bautismo</label>
                                                    <div class="col-md-6  inputGroupContainer">
                                                        <div class="radio">
                                                            <label><input type="radio" name="baptism" value="true" :checked="student.catholic.baptism" v-model="student.catholic.baptism" >Si</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio" name="baptism" value="false" :checked="!student.catholic.baptism" v-model="student.catholic.baptism">No</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group" v-if="student.catholic.baptism =='true'">
                                                    <label class="col-md-4 control-label">Primera Comunión</label>
                                                    <div class="col-md-6  inputGroupContainer">
                                                        <div class="radio">
                                                            <label><input type="radio" name="eucaristia" value="true" :checked="student.catholic.firstCommunion" v-model="student.catholic.firstCommunion" >Si</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio" name="eucaristia" value="false" :checked="!student.catholic.firstCommunion" v-model="student.catholic.firstCommunion">No</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group" v-if="student.catholic.firstCommunion == 'true' && student.catholic.baptism == 'true'">
                                                    <label class="col-md-4 control-label">Confirma</label>
                                                    <div class="col-md-6  inputGroupContainer">
                                                        <div class="radio">
                                                            <label><input type="radio" name="confirma" value="true" :checked="student.catholic.confirmation" v-model="student.catholic.confirmation">Si</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio" name="confirma" value="false" :checked="!student.catholic.confirmation" v-model="student.catholic.confirmation">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Button -->
                                    </fieldset>
                                    <div class="form-group text-center">
                                        <label class="col-md-4 control-label"></label>
                                        <div class="col-md-4">
                                            <button class="btn btn-warning" @click="upStudent()">Guardar Cambios
                                                    <span class="glyphicon glyphicon-send"></span>
                                            </button>
                                        </div>
                                    </div>
                            </form>
                        </td>   
                        <td COLSPAN =1  ></td>
                                                 
                      </tr>
                      <tr v-for="(student,i) in filteredStudents" v-if="(seeFamily || seeInformation || seeFouls || seeEdi || seePrec || seeSacr) && i>index">
                          <th scope="row">{{i+1}}</th>
                          <td>{{student.internalID}}</td>
                          <td>{{student.name}}</td>
                          <td>{{student.lastname}}</td>
                          <td>{{student.course}}</td>
                          <td>
                            <ul class="nav navbar-nav">
                                <li class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" @click="SelectStudent(student)"><span class="glyphicon glyphicon-user pull-right"></span></a>
                                <ul class="dropdown-menu pull-right">
                                    <li><a data-toggle="collapse" data-target="#datos" class="accordion-toggle" v-on:click="seeI(i)">Datos<span class="glyphicon glyphicon-user pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#editar" class="accordion-toggle" v-on:click="seeEdit(i)">Editar<span class="glyphicon glyphicon-pencil pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#familia,#familia2" class="accordion-toggle"  v-on:click="seeFam(i)">Familia<span class="glyphicon glyphicon-home pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#faltas" class="accordion-toggle"  v-on:click="seeFou(i)">Faltas<span class="glyphicon glyphicon-list-alt pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#preceptores" class="accordion-toggle"  v-on:click="seePre(i)">Preceptores<span class="glyphicon glyphicon-education pull-right"></span></a></li>
                                    <li class="divider"></li>
                                    <li><a data-toggle="collapse" data-target="#sacramentos" class="accordion-toggle"  v-on:click="seeSac(i)">Sacramentos<span class="glyphicon glyphicon-heart-empty pull-right"></span></a></li>
                                </ul>
                                </li>
                            </ul> 
                          </td>
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
    </div>
  </div>
</template>

<script>
import StudentService from '../service/student'
import FoulsService from '../service/foul'
import PrecepService from '../service/user_student'
import CatholicService from '../service/catholic'

export default {
  name: 'student',
  data () {
    return {
      student: {},
      students : [],
      fouls: [],
      preceptores: [],
      seeFamily: false,
      seeInformation: false,
      seeFouls:false,
      seePrec: false,
      seeSacr: false,
      seeEdi: false,
      index:-1,
      page: 1,
      total_students:0,
      filterText: '',
      SelectedStudent: null,
      errorMessage: '',
      available: false
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
  methods:{
    upStudent(){
        if(this.student.catholic.baptism == 'false'){
            this.student.catholic.firstCommunion = 'false';
            this.student.catholic.confirmation = 'false';
        }
        if(this.student.catholic.firstCommunion == 'false'){
            this.student.catholic.confirmation = 'false';
        }
        this.SelectedStudent.catholic.baptism = this.student.catholic.baptism;
        this.SelectedStudent.catholic.firstCommunion = this.student.catholic.firstCommunion;
        this.SelectedStudent.catholic.confirmation = this.student.catholic.confirmation;
        StudentService.updateStudent(this.SelectedStudent).then(response=>{
            if(!response.body.message){
                this.listStudent();
                this.seeEdi = false;
                this.errorMessage ='';
            }else{
                this.listStudent();                
                this.errorMessage = response.body.message;
            }
        }), error=>{
            console.log(this.error);
        };
        //
        CatholicService.updateCatholic(this.student.catholic, this.student.catholic._id).then(response=>{
            if(!response.body.message){
                this.listStudent();
            }else{
                this.errorMessage = response.body.message;
            }    
        }), error=>{
            console.log(this.errorMessage);    
        };
        //
        console.log(this.student);
    },
    getFouls(){
        FoulsService.getConfessionsByStudent(this.SelectedStudent._id).then(response=>{
            this.fouls = response.body.fouls;
            this.cutDate();
        }), error=>{
            console.log(this.error);
        };
    },
    getPreceptor(){
        PrecepService.getUsersbyStudent(this.SelectedStudent._id).then(response=>{
            this.preceptores = response.body.users;
        }), error=>{
            console.log(this.error);
        };
    },
    listStudent(){
      StudentService.getStudents(this.page).then(response=>{
        this.students = response.body.student;
        this.total_students = response.body.total_items;
      }), error=>{
        console.log(this.error);
      };
    },
    seeFam(index){
      this.index = index;
      this.seeFamily = !this.seeFamily;  
      if(this.seeFamily){
        this.seeInformation= false;
        this.seeFouls=false;
        this.seePrec= false;
        this.seeSacr= false;
        this.seeEdi= false;
      }           
    },
    seeI(index){
      this.index = index;
      this.seeInformation = !this.seeInformation;
      if(this.seeInformation){
        this.seeFamily= false;
        this.seeFouls=false;
        this.seePrec= false;
        this.seeSacr= false;
        this.seeEdi= false;
      }      
    },
    seePre(index){
      this.index = index;
      this.seePrec = !this.seePrec;
      if(this.seePrec){
        this.seeFamily= false;
        this.seeInformation= false;
        this.seeFouls=false;
        this.seeSacr= false;
        this.seeEdi= false;
      }     
    },
    seeSac(index){
      this.index = index;
      this.seeSacr = !this.seeSacr;
      if(this.seeSacr){
        this.seeFamily= false;
        this.seeInformation= false;
        this.seeFouls=false;
        this.seePrec= false;
        this.seeEdi= false;
      }     
    },
    seeEdit(index){
      this.index = index;
      this.seeEdi = !this.seeEdi;
      if(this.seeEdi){
        this.seeFamily= false;
        this.seeInformation= false;
        this.seeFouls=false;
        this.seePrec= false;
        this.seeSacr= false;
      }     
    },
    seeFou(index){
      this.index = index;
      this.seeFouls = !this.seeFouls;
      if(this.seeFouls){
        this.seeFamily= false;
        this.seeInformation= false;
        this.seePrec= false;
        this.seeSacr= false;
        this.seeEdi= false;
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
    SelectStudent(student){
        this.SelectedStudent = student;
        this.student = this.SelectedStudent;
        this.getFouls();
        this.getPreceptor();      
    },
    cutDate() {
            for (let i = 0; i < this.fouls.length; i++) {
                let date = this.fouls[i].date;
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
                this.fouls[i].date = first;
            }
        },
  },
  beforeMount(){
    this.listStudent();
  },
  mounted() {
        $(document).ready(function() {
            $('#reg_form').bootstrapValidator({
                // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    name: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su nombre.'
                            }
                        }
                    },
                    lastname: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su apellido.'
                            }
                        }
                    },
                    email: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su correo electrónico.'
                            },
                            emailAddress: {
                                message: 'Indique un correo electrónico válido.'
                            }
                        }
                    },
                    phone: {
                        validators: {
                            stringLength: {
                                min: 9,
                                max: 9,
                                message: 'Indique correctamente el teléfono.'
                            },
                            notEmpty: {
                                message: 'Indique su número de teléfono.'
                            }
                        }
                    },
                    internalID: {
                        validators: {
                            stringLength: {
                                min: 5,
                                max: 5,
                                message: 'Indique correctamente el ID interno.'
                            },
                            notEmpty: {
                                message: 'Indique su ID interno.'
                            }
                        }
                    },
                    course: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su curso.'
                            }
                        }
                    },
                    identity: {
                        validators: {
                            stringLength: {
                                min: 15,
                                max: 15,
                                message: 'Indique correctamente el número de identidad.'
                            },
                            notEmpty: {
                                message: 'Indique su número de identidad.'
                            }
                        }
                    },
                    home: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su dirección.'
                            }
                        }
                    }
                }
            }).on('success.form.bv', function(e) {
                $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#reg_form').data('bootstrapValidator').resetForm();

                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');

            });
        });
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

#span {
    background: #42bfc2;
    color: #FFFFFF;
}

.backform {
    background-color: #42bfc2;
    color: #FFFFFF;
}

.cabecera{
    background: #42BFC2;
    color: #FFFFFF;
}
#filtro {
    margin-top: 15px;
    margin-bottom: 15px;
}

#span{
    background : #42bfc2; 
    color: #FFFFFF;   
}

#leve{
    color: #F0AD4E;
}

#grave{
    color: #FF0900;
}

.datos{
    margin-top: 15px;
    margin-bottom: 15px;
}

.card {
    padding-top: 20px;
    margin: 10px 0 20px 0;
    background-color: rgba(214, 224, 226, 0.2);
    border-top-width: 0;
    border-bottom-width: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.card .card-heading {
    padding: 0 20px;
    margin: 0;
}

.card .card-heading.simple {
    font-size: 20px;
    font-weight: 300;
    color: #777;
    border-bottom: 1px solid #e5e5e5;
}

.card .card-heading.image img {
    display: inline-block;
    width: 46px;
    height: 46px;
    margin-right: 15px;
    vertical-align: top;
    border: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.card .card-heading.image .card-heading-header {
    display: inline-block;
    vertical-align: top;
}

.card .card-heading.image .card-heading-header h3 {
    margin: 0;
    font-size: 14px;
    line-height: 16px;
    color: #262626;
}

.card .card-heading.image .card-heading-header span {
    font-size: 12px;
    color: #999999;
}

.card .card-body {
    padding: 0 20px;
    margin-top: 20px;
}

.card .card-media {
    padding: 0 20px;
    margin: 0 -14px;
}

.card .card-media img {
    max-width: 100%;
    max-height: 100%;
}

.card .card-actions {
    min-height: 30px;
    padding: 0 20px 20px 20px;
    margin: 20px 0 0 0;
}

.card .card-comments {
    padding: 20px;
    margin: 0;
    background-color: #f8f8f8;
}

.card .card-comments .comments-collapse-toggle {
    padding: 0;
    margin: 0 20px 12px 20px;
}

.card .card-comments .comments-collapse-toggle a,
.card .card-comments .comments-collapse-toggle span {
    padding-right: 5px;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-comments .media-heading {
    font-size: 13px;
    font-weight: bold;
}

.card.people {
    position: relative;
    display: inline-block;
    width: 170px;
    height: 300px;
    padding-top: 0;
    margin-left: 20px;
    overflow: hidden;
    vertical-align: top;
}

.card.people:first-child {
    margin-left: 0;
}

.card.people .card-top {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 170px;
    height: 150px;
    background-color: #ffffff;
}

.card.people .card-top.green {
    background-color: #53a93f;
}

.card.people .card-top.blue {
    background-color: #427fed;
}

.card.people .card-info {
    position: absolute;
    top: 150px;
    display: inline-block;
    width: 100%;
    height: 101px;
    overflow: hidden;
    background: #ffffff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.card.people .card-info .title {
    display: block;
    margin: 8px 14px 0 14px;
    overflow: hidden;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    color: #404040;
}

.card.people .card-info .desc {
    display: block;
    margin: 8px 14px 0 14px;
    overflow: hidden;
    font-size: 12px;
    line-height: 16px;
    color: #737373;
    text-overflow: ellipsis;
}

.card.people .card-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    line-height: 29px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: rgba(214, 224, 226, 0.2);
}

.card.hovercard .cardheader {
    background: url("http://lorempixel.com/850/280/nature/4/");
    background-size: cover;
    height: 135px;
}

.card.hovercard .avatar {
    position: relative;
    top: -50px;
    margin-bottom: -50px;
}

.card.hovercard .avatar img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255,255,255,0.5);
}

.card.hovercard .info {
    padding: 4px 8px 10px;
}

.card.hovercard .info .title {
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 1;
    color: #262626;
    vertical-align: middle;
}

.card.hovercard .info .desc {
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;
    color: #737373;
    text-overflow: ellipsis;
}

.card.hovercard .bottom {
    padding: 0 20px;
    margin-bottom: 17px;
}

.form-control:read-write {
    z-index: 0;
}
</style>