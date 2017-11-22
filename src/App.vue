<template>
  <div id="app">
    <div class="wrapper" v-if="identity">
      <nav id="sidebar" class="navbar fixed-top navbar-light bg-faded">
        <div class="sidebar-header ">
          <h3>Instituto Tecnológico Taular</h3>
        </div>
        <ul class="list-unstyled components" v-if="identity.role == 'ROLE_ADMIN'">
          <li>
            <a href="#studentSub" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-user"></i>
              Estudiantes
            </a>
            <ul class="collapse list-unstyled" id="studentSub">
              <router-link to="/createStudent" tag="li" active-class="active" exact>
                <a>Crear Estudiante</a>
              </router-link>
              <router-link to="/Student" tag="li" active-class="active" exact>
                <a>Mostrar Estudiantes</a>
              </router-link>
            </ul>
          </li>
          <li>
            <a href="#preceptorySub" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-th-list"></i>
              Preceptoria
            </a>
            <ul class="collapse list-unstyled" id="preceptorySub">

              <router-link to="/seePreceptory" tag="li" active-class="active" exact>
                <a>Ver Preceptorias</a>
              </router-link>
            </ul>
          </li>
          <li>
            <a href="#sacramentoSub" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-book"></i>
              Sacramentos
            </a>
            <ul class="collapse list-unstyled" id="sacramentoSub">
              <router-link to="/listSacraments" tag="li" active-class="active" exact>
                <a>Filtrar sacramentos</a>
              </router-link>
              <router-link to="/createConfession" tag="li" active-class="active" exact>
                <a>Asistencia a Confesiones</a>
              </router-link>
            </ul>
          </li>
          <li>
            <a href="#notasSub" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-list-alt"></i>
              Calificaciones
            </a>
            <ul class="collapse list-unstyled" id="notasSub">
              <router-link to="/tableNote" tag="li" active-class="active" exact>
                <a>Crear nota</a>
              </router-link>
            </ul>
          </li>
          <li>
            <a href="#adminSub" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-cog"></i>
              Administración
            </a>
            <ul class="collapse list-unstyled" id="adminSub">
              <router-link to="createUser" tag="li" active-class="active" exact>
                <a>Crear Usuario</a>
              </router-link>
              <router-link to="/assignStudent" tag="li" active-class="active" exact>
                <a>Asignar Estudiantes</a>
              </router-link>
              <router-link to="/tableUser" tag="li" active-class="active" exact>
                <a>Modificar Contraseña</a>
              </router-link>
            </ul>
          </li>
        </ul>
        <ul class="list-unstyled components" v-if="identity.role == 'ROLE_TEACHER'">
          <li>
            <a href="#preceptorySub" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-th-list"></i>
              Preceptoria
            </a>
            <ul class="collapse list-unstyled" id="preceptorySub">
              <router-link to="/createPreceptory" tag="li" active-class="active" exact>
                <a>Crear Preceptorias</a>
              </router-link>
              <router-link to="/myStudent" tag="li" active-class="active" exact>
                <a>Ver Preceptorias</a>
              </router-link>
            </ul>
          </li>
          <li>
            <a href="#notasSub" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-list-alt"></i>
              Faltas Disciplinarias
            </a>
            <ul class="collapse list-unstyled" id="notasSub">
              <router-link to="/tableFoul" tag="li" active-class="active" exact>
                <a>Crear Falta Disciplinarias</a>
              </router-link>
              <router-link to="/seeFoul" tag="li" active-class="active" exact>
                <a>Ver Faltas Disciplinarias</a>
              </router-link>
            </ul>
          </li>
        </ul>
        <ul class="list-unstyled components" v-if="identity.role == 'ROLE_VISIT'">
          <li>
            <a href="#notasSub" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-list-alt"></i>
              Notas
            </a>
            <ul class="collapse list-unstyled" id="notasSub">
              <router-link to="/seeNote" tag="li" active-class="active" exact>
                <a>Ver nota</a>
              </router-link>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="back">
        <div id="content">
          <nav class="navbar navbar-default sticky-top" id="bar">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                  <li>
                    <a>{{identity.name}}</a>
                  </li>
                  <li>
                    <div class="profile-header-container">
                      <div class="profile-header-img dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="img-circle" src="http://i2.wp.com/arqa.com/wp-content/uploads/2015/06/new-mistery.png" />
                      </div>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenu2" @click.prevent="logout">
                        <a class="dropdown-item" ><span id="log" class="glyphicon glyphicon-off" ></span> Logout</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="main">
            <transition name="slide" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="top-content" v-else>
      <div class="inner-bg">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-sm-offset-3 form-box">
              <div class="form-top">
                <div class="form-top-left">
                  <h3>INICIAR SESIÓN</h3>
                  <p>Ingrese sus datos para iniciar sesión:</p>
                </div>
                <div class="form-top-right">
                  <img src="http://res.cloudinary.com/dp9zefqm7/image/upload/v1505247033/taularLogo_mmshim.png">
                </div>
              </div>
              <div class="form-bottom">
                <form role="form" action="" method="post" class="login-form">
                  <div class="form-group">
                    <label class="sr-only" for="form-username">Username</label>
                    <input type="text" name="form-username" placeholder="Correo Electrónico..." class="form-username form-control" id="form-username" :value="User.email" @input="User.email = $event.target.value">
                  </div>
                  <div class="form-group">
                    <label class="sr-only" for="form-password">Password</label>
                    <input type="password" name="form-password" placeholder="Contraseña..." class="form-password form-control" id="form-password" :value="User.password" @input="User.password = $event.target.value">
                  </div>
                  <button type="submit" class="btn" data-toggle="modal" data-target="#myModal" @click.prevent="onSubmit">Ingresar!</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                <strong>Bienvenido</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import userService from './Service/user'
import Student from './components/Student.vue'
import VueRouter from 'vue-router'
export default {
  name: 'app',
  components: {
    Student
  },
  data() {
    return {
      User: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        image: ''
      },
      identity: '',
      token: '',
      errorMessage: '',
      Users: []
    }
  },
  methods: {
    onSubmit() {
      userService.login(this.User, null).then(response => {
        let identity = response.body.user;
        this.identity = identity;
        if (!this.identity._id) {
          alert("El usuario no esta correctamente identificado");
        } else {
          localStorage.setItem('identity', JSON.stringify(identity));
          userService.login(this.User, 'true').then(response => {
            let token = response.body.token;
            this.token = token;
            if (this.token.length <= 0) {
              alert("El Token no se ha generado correctamente");
            } else {
              localStorage.setItem('token', token);
              this.$router.push('home');
              this.User = {
                name: '',
                lastname: '',
                email: '',
                password: '',
                phone: '',
                role: '',
                image: ''
              };
              this.errorMessage = response.body.message;
            }
          }, error => {
            this.errorMessage = error.body.message;
          });
        }
      }, error => {
        this.errorMessage = error.body.message;
      });
    },
    logout() {
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.clear();
      this.identity = null;
      this.token = null;
      this.$router.push('/');
    },
    prueba() {
      console.log(this.identity);
      userService.getUsers().then(response => {
        console.log(response);
        this.Users = response.body.user;
        console.log(this.Users[0].name);
      }, error => {
        this.errorMessage = error.body.message;
      });
    }
  },
  beforeMount() {
    this.identity = userService.getIdentity();
    this.token = userService.getToken();
  }
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

.slide-leave-active {
  transition: opacity 1s ease;
  opacity: 0;
  animation: slide-out 1s ease-out forwards;
}

.slide-leave {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
}

@keyframes slide-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-15px);
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}

#app {
  background-image: url(http://res.cloudinary.com/dp9zefqm7/image/upload/v1505247033/backgroundLogin_laom0d.jpg);
}

#back {
  background-image: url(http://res.cloudinary.com/dp9zefqm7/image/upload/v1505247033/backgroundLogin_laom0d.jpg);
  background-attachment: fixed;
}

.wrapper {
  font-family: 'Poppins', sans-serif;
  background: #efefef;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

i,
span {
  display: inline-block;
}

#bar {
  z-index: 1;
  margin-top: -1.5%;
  margin-left: 19.9%;
  width: 76.6%;
  position: fixed;
}

.main {
  width: 79%;
  margin-left: 20.5%;
  margin-right: 1%;
  margin-top: 8%;
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.wrapper {
  display: flex;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  height: 1000px;
  /*background: #42bfc2;**/
  background-image: url(http://res.cloudinary.com/dp9zefqm7/image/upload/v1505247033/backgroundLogin_laom0d.jpg);
  color: #fff;
  transition: all 0.3s;
  position: fixed;
}

#sidebar.active {
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

#sidebar.active .sidebar-header h3,
#sidebar.active .CTAs {
  display: none;
}

#sidebar.active .sidebar-header strong {
  display: block;
}

#sidebar ul li a {
  text-align: left;
}

#sidebar.active ul li a {
  padding: 20px 10px;
  text-align: center;
  font-size: 0.85em;
}

#sidebar.active ul li a i {
  margin-right: 0;
  display: block;
  font-size: 1.8em;
  margin-bottom: 5px;
}

#sidebar.active ul ul a {
  padding: 10px !important;
}

#sidebar.active a[aria-expanded="false"]::before,
#sidebar.active a[aria-expanded="true"]::before {
  top: auto;
  bottom: 5px;
  right: 50%;
  -webkit-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
}

#sidebar .sidebar-header {
  padding: 20px;
  background-image: url(http://res.cloudinary.com/dp9zefqm7/image/upload/v1505247033/backgroundLogin_laom0d.jpg);
}

#sidebar .sidebar-header strong {
  display: none;
  font-size: 1.8em;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #42bfc2;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #fff;
  background: #42bfc2;
}

#sidebar ul li a i {
  margin-right: 10px;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
  color: #fff;
  background: #42bfc2;
}

a[data-toggle="collapse"] {
  position: relative;
}

a[aria-expanded="false"]::before,
a[aria-expanded="true"]::before {
  content: '\e259';
  display: block;
  position: absolute;
  right: 20px;
  font-family: 'Glyphicons Halflings';
  font-size: 0.6em;
}

a[aria-expanded="true"]::before {
  content: '\e260';
}


ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386D5;
}

a.article,
a.article:hover {
  background: #42bfc2 !important;
  color: #fff !important;
}

#content {
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}















/*----------------------------------------------------------*/

body {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #888;
  line-height: 30px;
  text-align: center;
}

strong {
  font-weight: 500;
}

img {
  max-width: 100%;
}

.inner-bg {
  padding: 100px 0 100px 0;
}

.form-box {
  margin-top: 35px;
}

.form-top {
  overflow: hidden;
  padding: 0 25px 15px 25px;
  background: #444;
  background: rgba(0, 0, 0, 0.35);
  -moz-border-radius: 4px 4px 0 0;
  -webkit-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
  text-align: left;
}

.form-top-left {
  float: left;
  width: 75%;
  padding-top: 25px;
}

.form-top-left h3 {
  margin-top: 0;
  color: #fff;
}

.form-top-left p {
  opacity: 0.8;
  color: #fff;
}

.form-top-right {
  float: left;
  width: 25%;
  padding-top: 5px;
  font-size: 66px;
  color: #fff;
  line-height: 100px;
  text-align: right;
  opacity: 1;
}

.form-bottom {
  padding: 25px 25px 30px 25px;
  background: #444;
  background: rgba(0, 0, 0, 0.3);
  -moz-border-radius: 0 0 4px 4px;
  -webkit-border-radius: 0 0 4px 4px;
  border-radius: 0 0 4px 4px;
  text-align: left;
}

input[type="text"],
input[type="password"],
textarea,
textarea.form-control {
  height: 50px;
  margin: 0;
  padding: 0 20px;
  vertical-align: middle;
  background: #fff;
  border: 3px solid #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 50px;
  color: #888;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  -o-transition: all .3s;
  -moz-transition: all .3s;
  -webkit-transition: all .3s;
  -ms-transition: all .3s;
  transition: all .3s;
}

textarea,
textarea.form-control {
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 30px;
}

input[type="text"]:focus,
input[type="password"]:focus,
textarea:focus,
textarea.form-control:focus {
  outline: 0;
  background: #fff;
  border: 3px solid #fff;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

input[type="text"]:-moz-placeholder,
input[type="password"]:-moz-placeholder,
textarea:-moz-placeholder,
textarea.form-control:-moz-placeholder {
  color: #888;
}

input[type="text"]:-ms-input-placeholder,
input[type="password"]:-ms-input-placeholder,
textarea:-ms-input-placeholder,
textarea.form-control:-ms-input-placeholder {
  color: #888;
}

input[type="text"]::-webkit-input-placeholder,
input[type="password"]::-webkit-input-placeholder,
textarea::-webkit-input-placeholder,
textarea.form-control::-webkit-input-placeholder {
  color: #888;
}

button.btn {
  height: 50px;
  margin: 0;
  padding: 0 20px;
  vertical-align: middle;
  background: #42bfc2;
  border: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 50px;
  color: #fff;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  text-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  -o-transition: all .3s;
  -moz-transition: all .3s;
  -webkit-transition: all .3s;
  -ms-transition: all .3s;
  transition: all .3s;
}

button.btn:hover {
  opacity: 0.6;
  color: #fff;
}

button.btn:active {
  outline: 0;
  opacity: 0.6;
  color: #fff;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

button.btn:focus {
  outline: 0;
  opacity: 0.6;
  background: #42bfc2;
  color: #fff;
}

button.btn:active:focus,
button.btn.active:focus {
  outline: 0;
  opacity: 0.6;
  background: #42bfc2;
  color: #fff;
}

#ju {
  height: 30px;
  margin: 0;
  padding: 0 20px;
  vertical-align: middle;
  background: #42bfc2;
  border: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 30px;
  color: #fff;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  text-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  -o-transition: all .3s;
  -moz-transition: all .3s;
  -webkit-transition: all .3s;
  -ms-transition: all .3s;
  transition: all .3s;
}


.profile-header-container {
  margin: 0 auto;
  text-align: center;
}

.profile-header-img {
  padding: 0px;
}

.profile-header-img>img.img-circle {
  width: 50px;
  height: 50px;
  border: 2px solid #42bfc2;
}

.profile-header {
  margin-top: 43px;
}


.rank-label-container {
  margin-top: -19px;
  /* z-index: 1000; */
  text-align: center;
}

#log{
  padding-left: 20px;
}
</style>
