<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                            v-for="ad in promoAds"
                            :key="ad.id"
                            :src="ad.imageSrc"
                        >
                            <div class="car-link">
                                <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row>
                <v-flex xs12 sm6 md4
                v-for="ad in ads"
                :key="ad.id">
                    <v-card>
                        <v-img :src="ad.imageSrc" height="200px"></v-img>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{ ad.title }}</h3>
                                <div>{{ ad.description }}</div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text :to="'/ad/' + ad.id">Open</v-btn>
                            <v-btn depressed class="primary">Buy</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-layout row>
            <v-flex xs12 class="text-center pt-5">
                <v-progress-circular
                    :size="100"
                    :width="4"
                    color="purple"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    computed: {
        promoAds() {
            return this.$store.getters.promoAds
        },
        ads() {
            return this.$store.getters.ads
        },
        loading() {
            return this.$store.getters.loading
        }
    }
}
</script>

<style lang="sass" scoped>
    .car-link
        position: absolute
        bottom: 50px
        left: 50%
        background: rgba(0,0,0,.5)
        transform: translateX(-50%)
        padding: 5px 15px
        border-top-left-radius: 5px
        border-top-right-radius: 5px
</style>
