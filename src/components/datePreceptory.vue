<template>
    <div class="container ">
        <div class="col-lg-12">
            <br>
            <form class="form-horizontal" action=" " method="post" id="reg_form">
                <fieldset>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Fecha y hora</label>
                        <div class="col-md-6  inputGroupContainer">
                            <div class='input-group date' id='datetimepicker3'>
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                                <input placeholder="MM/DD/YYYY" id="time" type='text' class="form-control" v-model="Preceptory.date" />
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
import PreceptoryService from '../Service/preceptory';

export default {
    props: ['student'],
    name: 'datePreceptory',
    data() {
        return {
            Preceptory: {
                date: null,
                presented: null,
                mother: null,
                father: null,
                student: null,
                teacher: null
            },
            errorMessage: '',
            identity: ''
        }
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
        guardar() {
            this.getIdentity();
            var input = document.getElementById('time').value;
            this.Preceptory.date = input;
            this.Preceptory.student = this.student._id;
            this.Preceptory.teacher = this.identity._id;
            console.log(this.Preceptory);
            PreceptoryService.createPreceptory(this.Preceptory).then(response => {
                this.errorMessage = response.body.message;
                if (!this.errorMessage) {
                    this.Preceptory = {
                        date: null,
                        presented: null,
                        mother: null,
                        father: null,
                        student: null,
                        teacher: null
                    };
                }
            }, error => {
                this.errorMessage = error.body.message;
            });
        }
    },
    mounted() {
        $(document).ready(function() {
            $('#datetimepicker3').datetimepicker();
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
</style>