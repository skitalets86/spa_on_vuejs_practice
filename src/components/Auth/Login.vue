<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" >
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat >
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" validation>
                            <v-text-field
                                label="Email"
                                name="email"
                                prepend-icon="mdi-account"
                                type="email"
                                :rules="emailRules"
                                v-model="email"
                            ></v-text-field>
                            <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                :counter="6"
                                :rules="passwordRules"
                                v-model="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn 
                            color="primary" 
                            @click="onSubmit" 
                            :disabled="!valid || loading"
                            :loading="loading"
                        >Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || 'Password must be less than 6 characters',
            ],
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
        onSubmit() {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password
                }

                this.$store.dispatch('loginUser', user)
                    .then(() => {
                        this.$router.push('/');
                    })
                    .catch(() => {});
            }
        }
    },
    created() {
        if (this.$route.query['loginError']) {
            this.$store.dispatch('setError', 'Please log in to access this page')
        }
    }
}
</script>
