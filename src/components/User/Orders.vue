<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Orders</h1>
                <v-list subheader two-line flat>
                    <v-list-item-group multiple>
                        <v-list-item
                            v-for="order in orders"
                            :key="order.id"
                        >
                            <v-list-item-action>
                                <v-checkbox
                                    :input-value="order.done"
                                    @change="markDone(order)"
                                    color="success"
                                    :disabled="order.done"
                                ></v-checkbox>
                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title>{{ order.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn class="primary" :to="'/ad/ + order.adID'">Open</v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            orders: [
                {
                    id: 'frt1',
                    name: 'Liudmyla',
                    phone: '380-95-140-45-54',
                    adID: '123',
                    done: false
                }
            ]
        }
    },
    methods: {
        markDone(order) {
            order.done = true
        }
    }
}
</script>
