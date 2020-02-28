<template>
  <v-row>
      <v-col cols="12" sm="8">
         <v-data-table
         :items-per-page="5"
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
<v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.code" label="Code Interne"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.designation" label="Designation"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.lecture" label="Lecture"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.precision" label="Precision"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.type" label="Type"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.nserie" label="N°serie"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.marque" label="Marque"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.section" label="Section"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.postetravail" label="Poste de travail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.datemisenservice" label="Date mis en service"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.frequencedecalibrage" label="Frequence de calibrage"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.date1calibrage" label="Date de 1er calibrage"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.dateduderniercalibrage" label="Date du dernier calibrage"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.prochaincalibrage" label="Prochain calibrage"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.signateurcontrolleur" label="Signateur controlleur"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.signateurchefdequipe" label="Signateur chef d'equipe"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.postetravail" label="Poste de travail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.nsemaine" label="N°semaine"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.remarque" label="Remarque"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.ncertificat" label="N°certificat"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.documentation" label="Documentation"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field outlined hide-details v-model="editedItem.instructiondecalibrage" label="Instruction de callibrage"></v-text-field>
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

       <v-col cols="12" sm="4">
          <v-card>
            <v-card-actions>
              <span class="title">Deatils</span>
            </v-card-actions>
            <v-divider></v-divider>
            
    <v-list one-line class="pa-0" style="height:calc(100vh - 200px);overflow:auto"> 


    <template v-for="item in 15">
      <div :key="item">
       <v-list-item class="pa-1" >
        <v-list-item-content class="pa-0">
          <v-list-item-title class="caption font-weight-bold">1400 Main Street</v-list-item-title>
          <v-list-item-subtitle class="caption">Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
         </div>
    </template>
        
    </v-list>
          </v-card>
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
       this.getPieceSpecfique()
    },

    methods: {
      getPieceSpecfique() {
        axios.get(this.apiBase+"PieceSpecfique").then(res => {
                this.codes = res.data
        }) 
      },
      editItem (item) {
        this.editedIndex = this.codes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
         axios.delete(this.apiBase+"PieceSpecfique/"+ item.id)
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
             axios.put(this.apiBase+"PieceSpecfique/"+ this.editedItem.id,
              this.editedItem
             )
          Object.assign(this.codes[this.editedIndex], this.editedItem)
        } else {
           axios.post(this.apiBase+"PieceSpecfique/", this.editedItem)
             this.getPieceSpecfique()
        }
        this.close()
      },
    },
  }

</script>