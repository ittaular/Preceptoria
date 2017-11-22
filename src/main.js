import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import createUser from './components/createUser.vue'
import createStudent from './components/createStudent.vue'
import Student from './components/Student.vue'
import tableNote from './components/tableNote.vue'
import createFoul from './components/createFoul.vue'
import createPreceptory from './components/createPreceptory.vue'
import seeNote from './components/seeNote.vue'
import seePreceptory from './components/seePreceptory.vue'
import tableFoul from './components/tableFoul.vue'
import seeFoul from './components/seeFoul.vue'
import tableUser from './components/tableUser.vue'
import assignStudent from './components/assignStudent.vue'
import listSacraments from './components/listSacraments.vue'
import createConfession from './components/createConfession.vue'
import home from './components/home.vue'
import myStudent from './components/myStudent.vue'


Vue.filter('to-lowercase', function (value) {
    return value.toLowerCase();
});

Vue.config.productionTip = false
Vue.use(VueRouter);
import userService from './Service/user'
const router = new VueRouter({
    routes: [{
        path: '/createUser',
        name: 'createUser',
        component: createUser,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/createStudent',
        name: 'createStudent',
        component: createStudent,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/tableNote',
        name: 'tableNote',
        component: tableNote,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/createFoul',
        name: 'createFoul',
        component: createFoul,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_TEACHER") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/createPreceptory',
        name: 'createPreceptory',
        component: createPreceptory,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_TEACHER") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/seeNote',
        name: 'seeNote',
        component: seeNote,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_VISIT") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/seePreceptory',
        name: 'seePreceptory',
        component: seePreceptory,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/tableFoul',
        name: 'tableFoul',
        component: tableFoul,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_TEACHER") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/seeFoul',
        name: 'seeFoul',
        component: seeFoul,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_TEACHER") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/tableUser',
        name: 'tableUser',
        component: tableUser,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/assignStudent',
        name: 'assignStudent',
        component: assignStudent,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/listSacraments',
        name: 'listSacraments',
        component: listSacraments,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/Student',
        name: 'Student',
        component: Student,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/createConfession',
        name: 'createConfession',
        component: createConfession,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_ADMIN") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/myStudent',
        name: 'myStudent',
        component: myStudent,
        beforeEnter: (to, from, next) => {
            let identity = userService.getIdentity();
            if (identity.role == "ROLE_TEACHER") {
                next();
            } else {
                next({ path: '/home' });
            }
        }
    }, {
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/*',
        name: 'home',
        component: home
    }]
});

new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: (h) => h(App),
    router
}).$mount('#app');
