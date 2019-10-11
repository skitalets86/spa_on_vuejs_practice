import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// FIXME
// declaration modules are here because I have an issue in build with an import store`s modules
// Module parse failed: Unexpected token 
// You may need an appropriate loader to handle this file type.
// >import ads form './modules/ads'

const adsModule = {
    state: {
        ads: [
            {
                title: 'First',
                description: 'Hello, I am description',
                promo: false,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                id: '123'
            },
            {
                title: 'Second',
                description: 'Hello, I am description',
                promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                id: '1234'
            },
            {
                title: 'Third',
                description: 'Hello, I am description',
                promo: true,
                imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                id: '12345'
            }
        ]
    },
    mutations: {},
    actions: {},
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
        }
    }
}

export default new Vuex.Store({
    modules: {
        ads: adsModule
    }
})