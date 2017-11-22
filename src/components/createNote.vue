<template>
    <div class="container ">
        <div class="col-lg-12">
            <br>
            <br>
            <form class="form-horizontal" action=" " method="post" id="reg_form">
                <fieldset>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Clase</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-education"></i>
                                </span>
                                <input name="class" placeholder="Clase" class="form-control" type="text" :value="Note.class" @input="Note.class = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Primer Parcial</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-th-list"></i>
                                </span>
                                <input name="firstParcial" placeholder="Primer parcial" class="form-control" type="text" :value="Note.firstPartial" @input="Note.firstPartial = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Segundo Parcial</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-th-list"></i>
                                </span>
                                <input name="secondPartial" placeholder="Segundo parcial" class="form-control" type="text" :value="Note.secondPartial" @input="Note.secondPartial = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Tercer Parcial</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-th-list"></i>
                                </span>
                                <input name="thirdPartial" placeholder="Tercer parcial" class="form-control" type="text" :value="Note.thirdPartial" @input="Note.thirdPartial = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Cuarto Parcial</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-th-list"></i>
                                </span>
                                <input name="fourthPartial" placeholder="Cuarto parcial" class="form-control" type="text" :value="Note.fourthPartial" @input="Note.fourthPartial = $event.target.value">
                            </div>
                        </div>
                    </div>

                    <br>
                    <div class="form-group text-center">
                        <label class="col-md-4 control-label"></label>
                        <div class="col-md-4">
                            <button type="submit" class="btn btn-warning" data-toggle="modal" data-target="#myModal" @click.prevent="guardar">Crear
                                <span class="glyphicon glyphicon-send"></span>
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
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
import NoteService from '../Service/note'

export default {
    props: ['student'],
    name: 'createNote',
    data() {
        return {
            Note: {
                class: null,
                firstPartial: 0,
                secondPartial: 0,
                thirdPartial: 0,
                fourthPartial: 0,
                student: null
            },
            errorMessage: '',
        }
    },
    methods: {
        guardar() {
            var x1 = this.Note.firstPartial;
            var x2 = this.Note.secondPartial;
            var x3 = this.Note.thirdPartial;
            var x4 = this.Note.fourthPartial;
            if (!isNaN(x1) && !isNaN(x2) && !isNaN(x3) && !isNaN(x4)) {
                this.Note.student = this.student._id;
                NoteService.saveNote(this.Note).then(response => {
                    this.errorMessage = response.body.message;
                    if (!this.errorMessage) {
                        this.Note = {
                            class: null,
                            firstPartial: 0,
                            secondPartial: 0,
                            thirdPartial: 0,
                            fourthPartial: 0,
                            student: null
                        };
                        $(document).ready(function() {
                            $('#reg_form').data('bootstrapValidator').resetForm();
                        });
                    }
                }, error => {
                    this.errorMessage = error.body.message;
                });
            } else {
                this.errorMessage = 'Ingrese valores númericos en los campos necesarios.';
            }
        },
    },
    mounted() {
        $(document).ready(function() {
            $('#reg_form').bootstrapValidator({
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    class: {
                        validators: {
                            notEmpty: {
                                message: 'Indique la clase.'
                            }
                        }
                    },
                    firstParcial: {
                        validators: {
                            stringLength: {
                                min: 1,
                                max: 3,
                                message: 'Indique correctamente la nota.'
                            },
                            notEmpty: {
                                message: 'Indique primer parcial.'
                            }
                        }
                    },
                    secondPartial: {
                        validators: {
                            stringLength: {
                                min: 1,
                                max: 3,
                                message: 'Indique correctamente la nota.'
                            },
                            notEmpty: {
                                message: 'Indique segundo parcial.'
                            }
                        }
                    },
                    thirdPartial: {
                        validators: {
                            stringLength: {
                                min: 1,
                                max: 3,
                                message: 'Indique correctamente la nota.'
                            },
                            notEmpty: {
                                message: 'Indique tercer parcial.'
                            },
                        }
                    },
                    fourthPartial: {
                        validators: {
                            stringLength: {
                                min: 1,
                                max: 3,
                                message: 'Indique correctamente la nota.'
                            },
                            notEmpty: {
                                message: 'Indique cuarto parcial.'
                            }
                        }
                    }
                }
            }).on('success.form.bv', function(e) {
                $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#reg_form').data('bootstrapValidator').resetForm();
                e.preventDefault();
                var $form = $(e.target);
                var bv = $form.data('bootstrapValidator');
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
</style>

