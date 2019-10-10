<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form ref="form" v-model="valid" validation>
                    <v-text-field
                        label="Ad title"
                        name="title"
                        type="text"
                        required
                        :rules="[v => !!v || 'Title is required']"
                        v-model="title"
                    ></v-text-field>
                    <v-textarea
                        label="Description"
                        name="description"
                        type="text"
                        required
                        :rules="[v => !!v || 'Description is required']"
                        v-model="description"
                        multi-line
                    ></v-textarea>
                </v-form>
                <v-layout row class="mt-3">
                    <v-flex xs12>
                        <v-btn class="warning">
                            Upload
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                        
                    </v-flex>
                </v-layout>
                <v-layout row class="mt-3">
                    <v-flex xs12>
                        <img src="" height="100" alt="">
                    </v-flex>
                </v-layout>
                <v-layout row class="mt-3">
                    <v-flex xs12>
                         <v-switch
                            v-model="promo"
                            label="Add to promo?"
                            color="primary"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row class="mt-3">
                    <v-flex xs12>
                         <v-spacer></v-spacer>
                         <v-btn 
                            :disabled="!valid"
                            class="success" 
                            @click="createdAd()">Create Ad</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            description: '',
            promo: false,
            valid: false,
        }
    },
    methods: {
        createdAd() {
            if(this.$refs.form.validate()) {
                const ad = {
                    title: this.title,
                    description: this.description,
                    promo: this.promo
                }
                // eslint-disable-next-line
                console.log(ad);
            }
        }
    }
}
</script>
