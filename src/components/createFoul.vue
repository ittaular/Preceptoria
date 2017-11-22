<template>
    <div class="container ">
        <div class="col-lg-12">
            <form class="form-horizontal" action=" " method="post" id="reg_form">
                <br>
                <br>
                <fieldset>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Falta</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-alert"></i>
                                </span>
                                <input name="foul" placeholder="Falta" class="form-control" type="text" :value="Foul.foul" @input="Foul.foul = $event.target.value">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Nivel de Falta</label>
                        <div class="col-md-6 selectContainer">
                            <select class="form-control" name="size" v-model="Foul.level">
                                <option value="Leve">Falta leve</option>
                                <option value="Grave">Falta Grave</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Comentario</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-pencil"></i>
                                </span>
                                <textarea class="form-control" name="comment" placeholder="Comentario" :value="Foul.comment" @input="Foul.comment = $event.target.value"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Fecha</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class='input-group date' id='datetimepicker3'>
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                                <input placeholder="MM/DD/YYYY" id="time" type='text' class="form-control" v-model="Foul.date" />
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
import FoulService from '../Service/foul'

export default {
    props: ['student'],
    name: 'createFoul',
    data() {
        return {
            Foul: {
                level: null,
                comment: null,
                date: null,
                foul: null,
                student: null
            },
            fouls: [],
            errorMessage: '',
        }
    },
    methods: {
        guardar() {
            let temp = '';
            this.Foul.student = this.student._id;
            var input = document.getElementById('time').value;
            this.Foul.date = input;
            FoulService.saveFoul(this.Foul).then(response => {
                this.errorMessage = response.body.message;
                if (!this.errorMessage) {
                    temp = this.Foul.level;
                    this.Foul = {
                        level: null,
                        comment: null,
                        date: null,
                        foul: null,
                        student: null
                    };
                    $(document).ready(function() {
                        $('#reg_form').data('bootstrapValidator').resetForm();
                    });
                }
                if (temp == 'Leve') {
                    FoulService.getConfessionsByStudent(this.student._id).then(response => {
                        this.fouls = response.body.fouls;
                        let cont = 0;
                        for (let i = 0; i < this.fouls.length; i++) {
                            if (this.fouls[i].level == 'Leve') {
                                cont++;
                            }
                        }
                        if (cont % 3 == 0) {
                            this.Foul = {
                                level: 'Grave',
                                comment: 'Falta grave creada por la acumulacion de 3 faltas leves.',
                                date: input,
                                foul: 'Tres faltas leves cometidas',
                                student: this.student._id
                            };
                            FoulService.saveFoul(this.Foul).then(response => {
                                this.errorMessage = response.body.message;
                                if (!this.errorMessage) {
                                    this.Foul = {
                                        level: null,
                                        comment: null,
                                        date: null,
                                        foul: null,
                                        student: null
                                    };
                                    $(document).ready(function() {
                                        $('#reg_form').data('bootstrapValidator').resetForm();
                                    });
                                }

                            }, error => {
                                this.errorMessage = error.body.message;
                            });
                        }
                    }), error => {
                        this.errorMessage = error.body.message;
                    };
                } 
            }, error => {
                this.errorMessage = error.body.message;
            });
        }
    },
    mounted() {
        $(document).ready(function() {
            $('#datetimepicker3').datetimepicker({
                format: 'MM/DD/YYYY'
            });
        });
        $(document).ready(function() {
            $('#reg_form').bootstrapValidator({
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    level: {
                        validators: {
                            notEmpty: {
                                message: 'Indique el nivel de falta.'
                            }
                        }
                    },
                    comment: {
                        validators: {
                            stringLength: {
                                min: 10,
                                max: 200,
                                message: 'Por favor, introduzca al menos 10 caracteres y no más de 200.'
                            },
                            notEmpty: {
                                message: 'Indique su comentario.'
                            }
                        }
                    },
                    foul: {
                        validators: {
                            notEmpty: {
                                message: 'Indique la falta.'
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

</style>

