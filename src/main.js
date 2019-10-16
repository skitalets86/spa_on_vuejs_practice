import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify';
import * as fb from 'firebase';
import 'vuetify/dist/vuetify.min.css';
import local_settings from '../config-local'


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    vuetify,
    el: '#app',
    store,
    router,
    render: h => h(App),
    created() {
        fb.initializeApp(
            local_settings
        )

        fb.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('autoLoginUser', user)
            }
        })
    }
})