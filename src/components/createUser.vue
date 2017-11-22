<template>
    <div class="container ">
        <div class="col-lg-12">
            <br>
            <form class="form-horizontal" action=" " method="post" id="reg_form">
                <fieldset>
                    <legend class=" text-center">
                        <h2>Nuevo Usuario</h2>
                    </legend>
                    <br>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Nombre</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-user"></i>
                                </span>
                                <input name="name" placeholder="Nombre" class="form-control" type="text" :value="User.name" @input="User.name = $event.target.value">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Apellido</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-user"></i>
                                </span>
                                <input name="lastname" placeholder="Apellido" class="form-control" type="text" :value="User.lastname" @input="User.lastname = $event.target.value">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Correo</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-envelope"></i>
                                </span>
                                <input name="email" placeholder="Correo Electrónico" class="form-control" type="text" :value="User.email" @input="User.email = $event.target.value">
                            </div>
                        </div>
                    </div>
                    <div class="form-group has-feedback">
                        <label for="password" class="col-md-4 control-label">Contraseña</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-lock"></i>
                                </span>
                                <input class="form-control" id="userPw" type="password" placeholder="Contraseña" name="password" :value="User.password" @input="User.password = $event.target.value" data-minLength="5" data-error="some error" required/>
                                <span class="glyphicon form-control-feedback"></span>
                                <span class="help-block with-errors"></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group has-feedback">
                        <label for="confirmPassword" class="col-md-4 control-label">Confirmar contraseña</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-lock"></i>
                                </span>
                                <input class="form-control {$borderColor}" id="userPw2" type="password" placeholder="Confirmar contraseña" name="confirmPassword" :value="password" @input="password = $event.target.value" data-match="#confirmPassword" data-minLength="5" data-match-error="some error 2" required/>
                                <span class="glyphicon form-control-feedback"></span>
                                <span class="help-block with-errors"></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Teléfono</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-earphone"></i>
                                </span>
                                <input name="phone" placeholder="2222-0202" class="form-control" type="text" :value="User.phone" @input="User.phone = $event.target.value">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Role de Usuario</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class="radio">
                                <label><input type="radio" name="optradio" value="true" v-model="isTeacher">Preceptor</label>
                            </div>
                            <div class="radio">
                                <label><input type="radio" name="optradio" value="" v-model="isTeacher">Padre de Familia</label>
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
import userService from '../Service/user'

export default {
    name: 'createUser',
    data() {
        return {
            User: {
                name: null,
                lastname: null,
                email: null,
                password: null,
                phone: null,
                role: null,
                image: null
            },
            isTeacher: '',
            errorMessage: '',
            password: ''
        }
    },
    methods: {
        guardar() {
            userService.register(this.User, this.isTeacher).then(response => {
                this.errorMessage = response.body.message;
                if (!this.errorMessage) {
                    this.User = {
                        name: null,
                        lastname: null,
                        email: null,
                        password: null,
                        phone: null,
                        role: null,
                        image: null
                    };
                    this.password = '';
                    $(document).ready(function() {
                        $('#reg_form').data('bootstrapValidator').resetForm();
                    });
                }
            }, error => {
                this.errorMessage = error.body.message;
            });
        }
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
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su contraseña.'
                            },
                            stringLength: {
                                min: 5,
                                message: 'Indique una contraseña mayor que 5 caracteres.'
                            },
                            identical: {
                                field: 'confirmPassword',
                                message: 'Confirme su contraseña abajo - escriba la misma contraseña por favor.'
                            }
                        }
                    },
                    confirmPassword: {
                        validators: {
                            notEmpty: {
                                message: 'Indique su confirmación de contraseña.'
                            },
                            identical: {
                                field: 'password',
                                message: 'La contraseña y su confirmación no son iguales.'
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

