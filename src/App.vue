<template>
  <v-app id="inspire" style="background:#f1f1f1">
    <v-navigation-drawer
      v-model="drawer" class="elevation-2"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
        
          <v-list-item
            :key="item.text"
            link exact
            :to="{name:item.path}" 
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </template>
      </v-list>
    </v-navigation-drawer>
    

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary darken-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Vege</span>
      </v-toolbar-title>
     
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
       
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height"
      >
          <router-view></router-view>
      </v-container>
    </v-content>
  
   
    <v-dialog
      v-model="dialog"
      width="800px"
    >   
      
    </v-dialog>
    
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'mdi-home', text: 'Acceuil',path:'acceuil' },
        { icon: 'mdi-file', text: 'Instrument de mesure',path:'about' },
        { icon: 'mdi-file', text: 'Liste de suivi des instrument ',path:'liste' }
      ],
    }),
  }
</script>