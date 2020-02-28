<template >
  <v-row>
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" sm="8">
         <v-data-table
    :headers="headers"
    :items="codes"
    class="elevation-2 ml-5"
  >
  
    <template v-slot:top>
    
    
      <v-toolbar flat color="white" class="px-0" dense>
        <h1 class="title"> Instrument de mesure</h1>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="900px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="" v-on="on">ajouter piece</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.CodeInterne" label="Code Interne"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Designation" label="Designation"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">annuler</v-btn>
              <v-btn color="blue darken-1" text @click="save">enregistre</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-divider></v-divider>

    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reinitialiser</v-btn>
    </template>
  </v-data-table>

      </v-col>
    </v-row>
</template>

<script>
  import axios from "axios"

  export default {
    data: () => ({
      dialog: false,
      apiBase : "http://127.0.0.1:8000/",
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },  {
          text: 'Code Interne',
          align: 'start',
          sortable: false,
          value: 'CodeInterne',
        },
        { text: 'Designation', value: 'Designation' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      codes: [],
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {
        Designation: '',
        CodeInterne: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'ajouter piece' : 'supprimer piece '
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
       this.getPieceGenerale()
    },

    methods: {
      getPieceGenerale(){
        axios.get(this.apiBase+"pieceGenerale").then(res => {
                this.codes = res.data
        }) 
      },

      editItem (item) {
        this.editedIndex = this.codes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
         axios.delete(this.apiBase+"pieceGenerale/"+ item.id)
         const index = this.codes.indexOf(item)
        confirm('vous étes sur de supprimer cet element !!') && this.codes.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
             axios.put(this.apiBase+"pieceGenerale/"+ this.editedItem.id,
              this.editedItem
             )
          Object.assign(this.codes[this.editedIndex], this.editedItem)
        } else {
           axios.post(this.apiBase+"pieceGenerale/",{
               "CodeInterne" : this.editedItem.CodeInterne, "Designation" : this.editedItem.Designation
             })
             this.getPieceGenerale()
        }
        this.close()
      },
    },
  }

</script>