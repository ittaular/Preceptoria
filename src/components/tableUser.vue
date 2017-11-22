<template>
    <div class="container ">
        <div class="col-lg-12">
            <h2 class="text-center">Usuarios</h2>
            <div class="input-group col-md-4 box" >
                <span class=" input-group-addon">Nombre</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <table class="table table-hover " style="border-collapse:collapse;">
                        <thead>
                            <tr class="backform">
                                <th>#</th>
                                <th>Rol</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user,i) in filteredUsers" v-if="!seeInformation && !temp " data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.role}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.email}}</td>
                            </tr>
                            <tr v-for="(user,i) in filteredUsers" v-if="(seeInformation || temp)&& i<=index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.role}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.email}}</td>
                            </tr>
                            <tr id="esto" class="accordian-body collapse" v-if="seeInformation">
                                <td colspan="5">
                                    <alterUser :user="SelectedUser" />
                                </td>
                            </tr>
                            <tr v-for="(user,i) in filteredUsers" v-if="(seeInformation || temp) && i>index" data-toggle="collapse" data-target="#esto" class="accordion-toggle" v-on:click="seeI(i)">
                                <th scope="row">{{i+1}}</th>
                                <td>{{user.role}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.lastname}}</td>
                                <td>{{user.email}}</td>
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
import UserService from '../service/user';
import alterUser from '../components/alterUser.vue';

export default {
    name: 'tableUser',
    data() {
        return {
            user: {},
            users: [],
            seeInformation: false,
            temp: false,
            filterText: '',
            SelectedUser: null
        }
    },
    components: {
        alterUser
    },
    methods: {
        listUser() {
            UserService.getUsers().then(response => {
                this.users = response.body.user;
            }), error => {
                console.log(this.error);
            };
        },
        seeI(index) {
            this.index = index;
            this.seeInformation = !this.seeInformation;
            this.SelectUSer(index);
        },
        SelectUSer(i) {
            this.SelectedUser = this.filteredUsers[i];

        }
    },
    filters: {
        toUppercase(value) {
            return value.toUpperCase();
        }
    },
    computed: {
        filteredUsers() {
            return this.users.filter((element) => {
                return element.name.match(this.filterText);
            });
        }
    },
    beforeMount() {
        this.listUser();
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
</style>

