<template>
    <div class="container ">
    <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#reg_form" @click="ahora()">Datos Estudiante</a></li>
        <li><a data-toggle="tab" href="#reg_form3" @click="ahora()">Datos Familiares</a></li>
        <li><a data-toggle="tab" href="#reg_form1" @click="ahora()" v-show="role=='papa' || role=='ambosPadres'">Datos del Padre</a></li>
        <li><a data-toggle="tab" href="#reg_form1" @click="ahora()" v-show="role=='encargado'">Datos del Encargado</a></li>
        <li><a data-toggle="tab" href="#reg_form2" @click="ahora()" v-show="role=='mama' || role=='ambosPadres'">Datos de la Madre</a></li>
    </ul>  
        <div class="col-lg-12 tab-content">
            <br>
            <form class="form-horizontal tab-pane fade in active" action=" " method="post" id="reg_form" >

                <fieldset>
                    <!-- Form Name -->
                    <legend class=" text-center">
                        <h2>Crear Estudiante</h2>
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
                                <input name="name" placeholder="Nombre" class="form-control" type="text" :value="Student.name" @input="Student.name = $event.target.value">
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
                                <input name="lastname" placeholder="Apellido" class="form-control" type="text" :value="Student.lastname" @input="Student.lastname = $event.target.value">
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
                                <input name="email" placeholder="Correo Electrónico" class="form-control" type="text" :value="Student.email" @input="Student.email = $event.target.value">
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
                                <input name="phone" placeholder="2222-0202" class="form-control" type="text" :value="Student.phone" @input="Student.phone = $event.target.value">
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
                                <input name="internalID" placeholder="00000" class="form-control" type="text" :value="Student.internalID" @input="Student.internalID = $event.target.value">
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
                                <input name="course" placeholder="Curso" class="form-control" type="text" :value="Student.course" @input="Student.course = $event.target.value">
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
                                <input name="identity" placeholder="0801-1999-99999" class="form-control" type="text" :value="Student.identity" @input="Student.identity = $event.target.value">
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
                                <input name="home" placeholder="Dirección" class="form-control" type="text" :value="Student.home" @input="Student.home = $event.target.value">
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
                                <input placeholder="MM/DD/YYYY" id="time" type='text' class="form-control" v-model="Student.birthday" />
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Católico</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="isCatholic" value="true" v-model="isCatholic" >Si</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="isCatholic" value="false" v-model="isCatholic">No</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group" v-if="isCatholic == 'true'">
                        <label class="col-md-4 control-label">Bautismo</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="baptism" value="true" v-model="Catholic.baptism">Si</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="baptism" value="false" v-model="Catholic.baptism">No</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group" v-if="Catholic.baptism == 'true' && isCatholic == 'true'">
                        <label class="col-md-4 control-label">Primera Comunión</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="firstCommunion" value="true" v-model="Catholic.firstCommunion">Si</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="firstCommunion" value="false" v-model="Catholic.firstCommunion">No</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group" v-if="Catholic.firstCommunion == 'true' && isCatholic == 'true'">
                        <label class="col-md-4 control-label">Confirma</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="confirmation" value="true" v-model="Catholic.confirmation">Si</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="confirmation" value="false" v-model="Catholic.confirmation">No</label>
                            </div>
                        </div>
                    </div>
                    <!-- Button -->
                </fieldset>
            </form>
            <form class="form-horizontal tab-pane fade in active" action=" " method="post" id="reg_form3" v-show="ready">

                <fieldset>
                    <!-- Form Name -->
                    <legend class=" text-center">
                        <h2>Crear Familia</h2>
                    </legend>
                    <br>
                    <!-- Text input-->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Estado civil</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-home"></i>
                                </span>
                                <input name="stateCivil" placeholder="Estado civil" class="form-control" type="text" :value="Family.stateCivil" @input="Family.stateCivil = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Estado actual</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-home"></i>
                                </span>
                                <input name="stateActual" placeholder="Estado actual" class="form-control" type="text" :value="Family.stateActual" @input="Family.stateActual = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Relaciones familiares</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-home"></i>
                                </span>
                                <input name="familyRelations" placeholder="Relaciones familiares" class="form-control" type="text" :value="Family.familyRelations" @input="Family.familyRelations = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Vicios</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-glass"></i>
                                </span>
                                <input name="vices" placeholder="Vicios" class="form-control" type="text" :value="Family.vices" @input="Family.vices = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Observaciones</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-pencil"></i>
                                </span>
                                <textarea class="form-control" name="observations" placeholder="Observaciones" :value="Family.observations" @input="Family.observations = $event.target.value"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Tiene computadora</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="computer" value="true" v-model="Family.computer">Si</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="computer" value="false" v-model="Family.computer">No</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Tiene internet</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="internet" value="true" v-model="Family.internet">Si</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="internet" value="false" v-model="Family.internet">No</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Tiene TV por cable</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="tv" value="true" v-model="Family.cableTV">Si</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="tv" value="false" v-model="Family.cableTV">No</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Asiste a la iglesia</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="iglesia" value="true" v-model="Family.wentMisa">Si</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="iglesia" value="false" v-model="Family.wentMisa">No</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Vive con</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="role" value="ambosPadres" v-model="role">Ambos padres</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="role" value="papa" v-model="role">Solo padre</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="role" value="mama" v-model="role">Solo madre</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="role" value="encargado" v-model="role">Solo encargado</label>
                            </div>
                        </div>
                    </div>

                </fieldset>
            </form>

            <form class="form-horizontal tab-pane fade in active" action=" " method="post" id="reg_form1" v-show="ready">

                <fieldset>
                    <!-- Form Name -->
                    <legend class=" text-center" v-if="role=='encargado'">
                        <h2>Crear Encargado</h2>
                    </legend>
                    <legend class=" text-center" v-else>
                        <h2>Crear Padre</h2>
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
                                <input name="name" placeholder="Nombre" class="form-control" type="text" :value="Father.name" @input="Father.name = $event.target.value">
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
                                <input name="lastname" placeholder="Apellido" class="form-control" type="text" :value="Father.lastname" @input="Father.lastname = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Celular</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-phone"></i>
                                </span>
                                <input name="celphone" placeholder="9999-9999" class="form-control" type="text" :value="Father.celphone" @input="Father.celphone = $event.target.value">
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
                                <input name="phone" placeholder="2222-2222" class="form-control" type="text" :value="Father.phone" @input="Father.phone = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Trabajo</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-briefcase"></i>
                                </span>
                                <input name="work" placeholder="Trabajo" class="form-control" type="text" :value="Father.work" @input="Father.work = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Dirección de trabajo</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-pushpin"></i>
                                </span>
                                <input name="workAddress" placeholder="Dirección" class="form-control" type="text" :value="Father.workAddress" @input="Father.workAddress = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Labor que desempeña</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-user"></i>
                                </span>
                                <input name="workPerformed" placeholder="Labor" class="form-control" type="text" :value="Father.workPerformed" @input="Father.workPerformed = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Antiguedad</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-briefcase"></i>
                                </span>
                                <input name="antiquity" placeholder="Antiguedad" class="form-control" type="text" :value="Father.antiquity" @input="Father.antiquity = $event.target.value">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Religión</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-book"></i>
                                </span>
                                <input name="religion" placeholder="Religión" class="form-control" type="text" :value="Father.religion" @input="Father.religion = $event.target.value">
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>

            <form class="form-horizontal tab-pane fade in active" action=" " method="post" id="reg_form2" v-show="ready">

                <fieldset>
                    <!-- Form Name -->
                    <legend class=" text-center">
                        <h2>Crear Madre</h2>
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
                                <input name="name" placeholder="Nombre" class="form-control" type="text" :value="Mother.name" @input="Mother.name = $event.target.value">
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
                                <input name="lastname" placeholder="Apellido" class="form-control" type="text" :value="Mother.lastname" @input="Mother.lastname = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Celular</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-phone"></i>
                                </span>
                                <input name="celphone" placeholder="9999-9999" class="form-control" type="text" :value="Mother.celphone" @input="Mother.celphone = $event.target.value">
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
                                <input name="phone" placeholder="2222-2222" class="form-control" type="text" :value="Mother.phone" @input="Mother.phone = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Trabajo</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-briefcase"></i>
                                </span>
                                <input name="work" placeholder="Trabajo" class="form-control" type="text" :value="Mother.work" @input="Mother.work = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Dirección de trabajo</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-pushpin"></i>
                                </span>
                                <input name="workAddress" placeholder="Dirección" class="form-control" type="text" :value="Mother.workAddress" @input="Mother.workAddress = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Labor que desempeña</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-user"></i>
                                </span>
                                <input name="workPerformed" placeholder="Labor" class="form-control" type="text" :value="Mother.workPerformed" @input="Mother.workPerformed = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Antiguedad</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-briefcase"></i>
                                </span>
                                <input name="antiquity" placeholder="Antiguedad" class="form-control" type="text" :value="Mother.antiquity" @input="Mother.antiquity = $event.target.value">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Religión</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-book"></i>
                                </span>
                                <input name="religion" placeholder="Religión" class="form-control" type="text" :value="Mother.religion" @input="Mother.religion = $event.target.value">
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
            <!-- Button -->
            <br>
            <div class="form-group text-center">
                <label class="col-md-4 control-label"></label>
                <div class="col-md-4">
                    <button type="submit" class="btn btn-warning" data-toggle="modal" data-target="#myModal" @click.prevent="guardar">Crear
                            <span class="glyphicon glyphicon-send"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Usuario</h5>
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
import parentService from '../Service/parent'
import studentService from '../Service/student'
import catholicService from '../Service/catholic'
import familyService from '../Service/family'

export default {

    name: 'createUser',
    data() {
        return {
            Student: {
                name: null,
                lastname: null,
                internalID: null,
                email: null,
                phone: null,
                picture: null,
                course: null,
                identity: null,
                birthday: null,
                home: null,
                catholic: null,
                fatherUser: null,
                father: null,
                mother: null,
                familyInformation: null
            },
            Catholic: {
                baptism: 'false',
                firstCommunion: 'false',
                confirmation: 'false'
            },
            Father: {
                name: null,
                lastname: null,
                phone: null,
                celphone: null,
                work: null,
                workAddress: null,
                workPerformed: null,
                antiquity: null,
                religion: null,
                isMother:false,
                role: 'FATHER'
            },
            Mother: {
                name: null,
                lastname: null,
                phone: null,
                celphone: null,
                work: null,
                workAddress: null,
                workPerformed: null,
                antiquity: null,
                religion: null,
                isMother:true,
                role: 'MOTHER'
                
            },
            Family: {
                stateCivil: null,
                stateActual: null,
                familyRelations: null,
                observations: null,
                computer: 'false',
                internet: 'false',
                cableTV: 'false',
                wentMisa: 'false',
                vices: ''             
            },
            errorMessage: '',
            isCatholic: 'false',
            role: 'ambosPadres',
            ready: false,
            juju: ''
        }
    },
    methods: {
        guardar() {
            if (this.Catholic.confirmation == 'true') {
                this.Catholic.baptism = 'true';
                this.Catholic.firstCommunion = 'true';
            } else {
                if (this.Catholic.firstCommunion == 'true') {
                    this.Catholic.baptism = 'true';
                    this.Catholic.confirmation == 'false';
                } else {
                    if (this.Catholic.baptism == 'true') {
                        this.Catholic.confirmation == 'false';
                        this.Catholic.firstCommunion = 'false';
                    }
                }
            }
            if (this.isCatholic == 'false') {
                this.Catholic.firstCommunion = 'false';
                this.Catholic.confirmation == 'false';
                this.Catholic.baptism = 'false';
            }
            var input = document.getElementById('time').value;
            this.Student.birthday = input;
            if (this.isCatholic == 'true') {
                this.createCatholic();
            }else{
                if(this.role=='papa'){
                    this.createParent2(this.Father);
                }
                if(this.role=='mama'){
                    this.createParent2(this.Mother);
                }
                if(this.role=='encargado'){
                    this.Father.role = 'OTHER';
                    this.createParent2(this.Father);
                }
                if(this.role=='ambosPadres'){
                    this.Father.role = 'FATHER';
                    this.Mother.role = 'MOTHER';
                    this.createParent(this.Father);
                    this.createParent(this.Mother);
                }
            } 
        },
        createCatholic(){
            catholicService.saveCatholic(this.Catholic).then(response=>{
                this.errorMessage = response.body.message;
                if (!this.errorMessage) {
                    this.Catholic = response.body.catholic;
                    this.Student.catholic = response.body.catholic._id;
                    if(this.role=='papa'){
                        this.createParent2(this.Father);
                    }
                    if(this.role=='mama'){
                        this.createParent2(this.Mother);
                    }
                    if(this.role=='encargado'){
                        this.Father.role = 'OTHER';
                        this.createParent2(this.Father);
                    }
                    if(this.role=='ambosPadres'){
                        this.createParent(this.Father);
                        this.createParent(this.Mother);
                    }
                }
            }), error=>{
                this.errorMessage = this.error;
                console.log(this.error);
            };
        },
        createParent(User){
            parentService.saveParent(User).then(response=>{
                this.errorMessage = response.body.message;
                if(!this.errorMessage){
                    var esto = response.body.parent;
                    if(User.isMother){
                        this.Mother = esto;
                        this.Student.mother = response.body.parent._id;            
                        this.createFamily();
                    }else{
                        this.Student.father = response.body.parent._id;
                        this.Father = esto;
                    }
                }

            }), error=>{
                this.errorMessage = this.error;
                console.log(this.error);
            };            
        },
        createParent2(User){
            parentService.saveParent(User).then(response=>{
                this.errorMessage = response.body.message;
                if(!this.errorMessage){
                    var esto = response.body.parent;
                    if(User.role=='MOTHER'){
                        this.Mother = esto;
                        this.Student.mother = response.body.parent._id;            
                        this.createFamily();
                    }else{
                        this.Student.father = response.body.parent._id;
                        this.Father = esto;
                        this.createFamily();                    
                    }
                }
            }), error=>{
                this.errorMessage = this.error;
                console.log(this.error);
            };            
        },
        createFamily(){
            familyService.createFamily(this.Family).then(response=>{
                this.errorMessage = response.body.message;
                if(!this.errorMessage){
                    this.Family = response.body.family;
                    this.Student.familyInformation = response.body.family._id;
                    this.createStudent();
                }
            }), error=>{
                this.errorMessage = this.error;
                this.ready=false;
                console.log(this.error);
            }; 
        },
        createStudent(){
            studentService.createStudent(this.Student).then(response=>{
                this.errorMessage = response.body.message;
                if(!this.errorMessage){
                    this.Student = response.body.student;
                    this.juju = '';
                    this.clean(); 
                    this.CleanInput();
                }
            }), error=>{
                this.errorMessage = this.error;
                console.log(this.error);
            };
                  
        },
        ahora(){
            this.ready = true;
        },
        clean(){
            this.Student ={
                name: null,
                lastname: null,
                internalID: null,
                email: null,
                phone: null,
                picture: null,
                course: null,
                identity: null,
                birthday: null,
                home: null,
                catholic: null,
                fatherUser: null,
                father: null,
                mother: null,
                familyInformation: null
            };
            this.Catholic={
                baptism: 'false',
                firstCommunion: 'false',
                confirmation: 'false'
            };
            this.Father={
                name: null,
                lastname: null,
                phone: null,
                celphone: null,
                work: null,
                workAddress: null,
                workPerformed: null,
                antiquity: null,
                religion: null,
                isMother:false,
                role: 'FATHER'
            };
            this.Mother={
                name: null,
                lastname: null,
                phone: null,
                celphone: null,
                work: null,
                workAddress: null,
                workPerformed: null,
                antiquity: null,
                religion: null,
                isMother:true,
                role: 'MOTHER'
                
            };
            this.Family= {
                stateCivil: null,
                stateActual: null,
                familyRelations: null,
                observations: null,
                computer: 'false',
                internet: 'false',
                cableTV: 'false',
                wentMisa: 'false',
                vices: ''             
            };
        },
        CleanInput(){
            $(document).ready(function() {
                $('#reg_form').data('bootstrapValidator').resetForm();
            });
            $(document).ready(function() {
                $('#reg_form1').data('bootstrapValidator').resetForm();
            });
            $(document).ready(function() {
                $('#reg_form2').data('bootstrapValidator').resetForm();
            });
            $(document).ready(function() {
                $('#reg_form3').data('bootstrapValidator').resetForm();
            });
        }
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
            $('#reg_form1').bootstrapValidator({
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
                    celphone: {
                        validators: {
                            stringLength: {
                                min: 9,
                                max: 9,
                                message: 'Indique correctamente el celular.'
                            },
                            notEmpty: {
                                message: 'Indique su número de celular.'
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
                    work: {
                        validators: {

                            notEmpty: {
                                message: 'Indique su lugar de trabajo.'
                            }
                        }
                    },
                    workAddress: {
                        validators: {
                            notEmpty: {
                                message: 'Indique la dirección del trabajo.'
                            }
                        }
                    },
                    workPerformed: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su labor en el trabajo'
                            }
                        }
                    },
                    antiquity: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su antiguedad en el trabajo.'
                            }
                        }
                    },
                    religion: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su religión.'
                            }
                        }
                    }
                }
            }).on('success.form.bv', function(e) {
                $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#reg_form1').data('bootstrapValidator').resetForm();

                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');
            });
        });

        $(document).ready(function() {
            $(document).ready(function() {
                $('#datetimepicker3').datetimepicker({
                    format: 'MM/DD/YYYY'
                });
            });
            $('#reg_form2').bootstrapValidator({
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
                    celphone: {
                        validators: {
                            stringLength: {
                                min: 9,
                                max: 9,
                                message: 'Indique correctamente el celular.'
                            },
                            notEmpty: {
                                message: 'Indique su número de celular.'
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
                    work: {
                        validators: {

                            notEmpty: {
                                message: 'Indique su lugar de trabajo.'
                            }
                        }
                    },
                    workAddress: {
                        validators: {
                            notEmpty: {
                                message: 'Indique la dirección del trabajo.'
                            }
                        }
                    },
                    workPerformed: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su labor en el trabajo'
                            }
                        }
                    },
                    antiquity: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su antiguedad en el trabajo.'
                            }
                        }
                    },
                    religion: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su religión.'
                            }
                        }
                    }
                }
            }).on('success.form.bv', function(e) {
                $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#reg_form2').data('bootstrapValidator').resetForm();

                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');
            });
        });

        $(document).ready(function() {
            $('#reg_form3').bootstrapValidator({
                // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    stateCivil: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su Estado civil.'
                            }
                        }
                    },
                    stateActual: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su Estado actual.'
                            }
                        }
                    },
                    familyRelations: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su Relaciones familiares.'
                            }
                        }
                    },
                    observations: {
                        validators: {
                            stringLength: {
                                min: 10,
                                max: 200,
                                message: 'Por favor, introduzca al menos 10 caracteres y no más de 200.'
                            },
                            notEmpty: {
                                message: 'Indique sus observaciones.'
                            }
                        }
                    },
                    vices: {
                        validators: {

                            notEmpty: {
                                message: 'Indique sus vicios.'
                            }
                        }
                    }
                }
            }).on('success.form.bv', function(e) {
                $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#reg_form3').data('bootstrapValidator').resetForm();

                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');
            });
        });
    },
    beforeUpdate(){
        if(this.juju==''){
            this.juju = document.getElementById('time').value;
        }        
    },
    updated(){
        document.getElementById('time').value = this.juju;
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

.form-control:read-write {
    z-index: 0;
}

</style>