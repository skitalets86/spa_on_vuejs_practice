<template>
    <v-app>
        <v-navigation-drawer app temporary>
            <!-- -->
        </v-navigation-drawer>
        <div>
            <v-app-bar app color="deep-purple accent-4" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>Ad application</v-toolbar-title>

                <div class="flex-grow-1"></div>

                <v-toolbar-items>
                    <v-btn text>Link 1</v-btn>
                </v-toolbar-items>
            </v-app-bar>
        </div>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app> 
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    //
  }),
};
</script>
