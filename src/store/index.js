import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from 'firebase';

Vue.use(Vuex);

// FIXME
// declaration modules are here because I have an issue in build with an import store`s modules
// Module parse failed: Unexpected token 
// You may need an appropriate loader to handle this file type.
// >import ads form './modules/ads'

class User {
    constructor(id) {
        this.id = id;
    }
}

const userModule = {
    state: {
        user: null
    },
    actions: {
        async registerUser({commit}, {email, password}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid));
                commit('setLoading', false);
            } catch(error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }
        },
        async loginUser({commit}, {email, password}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const user = await fb.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid));
                commit('setLoading', false);
            } catch(error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }
        },
        autoLoginUser({commit}, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser({commit}) {
            fb.auth().signOut();
            commit('setUser', null);
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        isUserLoggedIn(state) {
            return state.user !== null;
        }
    }
}


class Ad {
    constructor(title, description, ownerId, imageSrc='', promo=false, id = null) {
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.imageSrc = imageSrc;
        this.promo = promo;
        this.id = id;
    }
}

const adsModule = {
    state: {
        ads: []
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload);
        },
        loadAds(state, payload) {
            state.ads = payload;
        }
    },
    actions: {
        async fetchAds({commit}) {
            commit('clearError');
            commit('setLoading', true);

            const resultAds = [];

            try {
                const fbVal = await fb.database().ref('ads').once('value');
                const ads = fbVal.val();
                Object.keys(ads).forEach(key => {
                    const ad = ads[key];
                    resultAds.push(
                        new Ad(
                            ad.title,
                            ad.description,
                            ad.ownerId,
                            ad.imageSrc,
                            ad.promo,
                            key
                        )
                    );
                })
                commit('loadAds', resultAds);
                commit('setLoading', false);
            } catch(error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },
        async createAd({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const newAd = new Ad(
                    payload.title, 
                    payload.description, 
                    getters.user.id, 
                    payload.imageSrc, 
                    payload.promo
                );
                const ad = await fb.database().ref('ads').push(newAd);
                commit('setLoading', false);
                commit('createAd', {
                    ...newAd,
                    id:ad.key
                })                
            } catch(error) {
                commit('setError', error.message);
                commit('setLoading', false);
            }
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds(state) {
            return state.ads
        },
        adById(state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}


const sharedModule = {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearError(state) {
            state.error = null;
        }
    },
    actions: {
        setLoading({commit}, payload) {
            commit('setLoading', payload);
        },
        setError({commit}, payload) {
            commit('setError', payload);
        },
        clearError({commit}) {
            commit('clearError');
        }
    },
    getters: {
        loading(state) {
            return state.loading;
        },
        error(state) {
            return state.error;
        }
    }
}


export default new Vuex.Store({
    modules: {
        ads: adsModule,
        user: userModule,
        shared: sharedModule
    }
})