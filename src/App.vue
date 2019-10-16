<template>
    <v-app>
        <v-navigation-drawer app temporary v-model="drawer">
            <v-list>
                <v-list-item 
                    v-for="link of links" 
                    :key="link.title"
                    :to="link.url">
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item 
                    @click="onLogout()"
                    v-if="isUserLoggedIn">
                    <v-list-item-icon>
                        <v-icon>mdi-exit-to-app</v-icon>    
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="'Logout'"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <div>
            <v-app-bar app color="deep-purple accent-4" dark>
                <v-app-bar-nav-icon 
                    @click="drawer = !drawer"
                    class="hidden-md-and-up">
                </v-app-bar-nav-icon>
                <v-toolbar-title>
                    <router-link to="/" tag="span" class="pointer">Ad application</router-link>
                </v-toolbar-title>

                <div class="flex-grow-1"></div>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn 
                        v-for="link in links" 
                        :key="link.title" 
                        :to="link.url" 
                        text>
                        <v-icon left>{{ link.icon }}</v-icon>
                        {{ link.title }}
                    </v-btn>
                    <v-btn 
                        @click="onLogout()" 
                        text
                        v-if="isUserLoggedIn">
                        <v-icon left>mdi-exit-to-app</v-icon>
                        Logout
                    </v-btn>
                </v-toolbar-items>
            </v-app-bar>
        </div>
        <v-content>
            <router-view></router-view>
        </v-content>
        <template v-if="error">
            <v-snackbar
                color="error"
                :multi-line="true"
                :timeout="5000"
                @input="closeError"
                :value="true"
            >
                {{ error }}
                <v-btn
                    dark
                    text
                    @click="closeError"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </template>
    </v-app> 
</template>

<script>
export default {
    name: 'App',
    components: {},
    data: () => ({
        drawer: false
    }),
    computed: {
        error() {
            return this.$store.getters.error
        },
        isUserLoggedIn() {
            return this.$store.getters.isUserLoggedIn
        },
        links() {
            if (this.isUserLoggedIn) {
                return [
                    {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders'},
                    {title: 'New ad', icon: 'mdi-file-plus', url: '/new'},
                    {title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list'}
                ]
            }

            return [
                {title: 'Login', icon: 'mdi-lock', url: '/login'},
                {title: 'Registration', icon: 'mdi-face', url: '/registration'}
            ]
        }
    },
    methods: {
        closeError() {
            this.$store.dispatch('clearError')
        },
        onLogout() {
            this.$store.dispatch('logoutUser');
            this.$router.push('/');
        }
    }
};
</script>
<style lang="sass" scoped>
    .pointer
        cursor: pointer
</style>