<template>
  <b-container class="bv-example-row mt-5">
    <b-row>
      <b-col>
        <h4>Edit graph</h4>
      </b-col>
      <b-col class="text-right">
        <router-link class="btn btn-primary" to="/">
          <b-icon icon="arrow-left"></b-icon>Back
        </router-link>
      </b-col>
    </b-row>
    <hr>

    <b-row class="justify-content-center">
      <b-col cols="8">
        <form v-on:submit.prevent="edit(filtersgraphs[0].id)">
          <b-row class="my-1">
            <b-col sm="2">
              <label for="name">
                Name
                <span class="text-danger">(*)</span> :
              </label>
            </b-col>
            <b-col sm="10">
              <b-form-input placeholder="Enter the name" v-model.trim="name"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="2">
              <label>Description :</label>
            </b-col>
            <b-col sm="10">
              <b-form-textarea placeholder="Enter the description" v-model="description"></b-form-textarea>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="2"></b-col>
            <b-col sm="10 mt-2">
              <button class="btn btn-primary" :disabled="!name || name.length < 3">
                <b-icon icon="file-arrow-down"></b-icon>Save
              </button>
              <router-link to="/" class="btn btn-danger ml-1">
                <b-icon icon="x-circle"></b-icon>Cancel
              </router-link>
            </b-col>
          </b-row>
        </form>
      </b-col>
    </b-row>

    <hr>
 
     <b-row>
      <b-col>
        <h4>Nodes</h4>
      </b-col>
      <b-col class="text-right">
        <button class="btn btn-dark" @click="$bvModal.show('bv-modal-example')">
           <b-icon icon="plus"></b-icon>Add new node
       </button>
      </b-col>
    </b-row>
    <hr>

    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>Add new nodes</template>
      <div class="d-block text-center">
        <form v-on:submit.prevent="Addnode">
          <b-row class="my-1">
            <b-col sm="4">
              <label for="tooltip">
                Tooltip
                <span class="text-danger">(*)</span> :
              </label>
            </b-col>
            <b-col sm="8">
              <b-form-input v-model.trim="tooltip" placeholder="Enter the tooltip"></b-form-input>
            </b-col>
          </b-row>
          <button
            class="btn btn-primary float-right mt-4"
            :disabled="!tooltip || tooltip.length < 3"
          >
            <b-icon icon="file-arrow-down"></b-icon>Save
          </button>
        </form>
      </div>
    </b-modal>


    <div class="row">
      <div class="col-12">
        <table class="table table-bordered">
          <thead class="thead-inverse">
            <tr>
              <th>Node Id</th>
              <th>Tooltip</th>
              <th width="5%">Actions</th>
            </tr>
          </thead>
          <tbody v-if="filtersnodes.length > 0">
            <tr v-for="(node,index) in filtersnodes" :key="node.id">
              <td>{{node.id}}</td>
              <td>{{node.tooltip}}</td>
              <td>
                <div class="btn-group">

                  <button v-b-tooltip.hover title="Delete" class="btn btn-sm btn-light" @click="removenode(index)">
                    <b-icon icon="trash"></b-icon>
                  </button>
                  
                  <button v-b-tooltip.hover title="Add relation"
                  ref="btnshow"
                   @click="showModal(node.id)"
                   class="btn btn-sm btn-light">
                    <b-icon icon="bounding-box"></b-icon>
                  </button>

                </div>
              </td>
            </tr>
          </tbody>
          <tr v-else>
            <td colspan="5" class="text-center bg-light">There is no data !</td>
          </tr>
        </table>
      </div>
    </div>


  <b-modal id="bv-modal-example2" hide-footer>
      <template v-slot:modal-title>Add relations</template>
      <div class="d-block text-center">
        <form v-on:submit.prevent="Addrelation">
          <b-row class="my-1">
            <b-col sm="4">
              <label for="tooltip">
                width
                <span class="text-danger">(*)</span> :
              </label>
            </b-col>
            <b-col sm="8">
                <select class="form-control" v-model="relation_node_ids" multiple="multiple">
                 <option  v-bind:value="filtersnode.id" v-for="filtersnode in filtersnodes" :key="filtersnode.id">
                   {{filtersnode.tooltip}}
                   </option>
               </select>
            </b-col>
          </b-row>
          <button
          :disabled="relation_node_ids.length < 1"
            class="btn btn-primary float-right mt-4">
            <b-icon icon="file-arrow-down"></b-icon>Save
          </button>
        </form>
      </div>
    </b-modal>


    <h4>Relations</h4>
    <hr>
    <div class="row">
      <div class="col-12">
        <table class="table table-bordered">
          <thead class="thead-inverse">
            <tr>
              <th>Node Id</th>
              <th>Relation with</th>
              <th width="5%">Actions</th>
            </tr>
          </thead>
          <tbody v-if="filtersrelations.length > 0">
            <tr v-for="(filtersrelation,index) in filtersrelations" :key="filtersrelation.id">
              <td>{{filtersrelation.id}}</td>
              <td>{{filtersrelation.relation_node_ids}}</td>
              <td>
                <div class="btn-group">

                  <button v-b-tooltip.hover title="Delete" class="btn btn-sm btn-light" @click="removerelation(index)">
                    <b-icon icon="trash"></b-icon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tr v-else>
            <td colspan="5" class="text-center bg-light">There is no data !</td>
          </tr>
        </table>
      </div>
    </div>


  </b-container>
</template>

<script>
import {Getdata, Updatedata, Getnode, Updatenode,Getrelation,Updaterelation} from "../storage.js";
import moment from "moment";
export default {
  name: "edit",
  data() {
    return {
      //graphes
      filtersgraphs: Getdata().filter(data => data.id == this.$route.params.id),
      graphs: Getdata(),
      id: "",
      name: "",
      description: "",
      created_at: "",
      updated_at: "",
      //nodes
      filtersnodes: "",
      nodes: Getnode(),
      graph_id: "",
      tooltip: "",
      //relations
      filtersrelations : "",
      relations : Getrelation(),
      node_id:'',
      relation_node_ids :""
    };
  },

  methods: {

   // show model add relation
    showModal: function(id) {
      this.node_id = id
      this.$root.$emit('bv::show::modal', 'bv-modal-example2', '#btnShow')
    },

    // add relation 
    Addrelation: function() {
       this.relations.unshift({
        id: new Date().getTime(),
        node_id: this.node_id,
        relation_node_ids:  this.relation_node_ids.toString(),
        graph_id : this.$route.params.id
      });
      this.$vToastify.success("The data has been added successfully");
      Updaterelation(this.relations);
      this.$bvModal.hide('bv-modal-example2')
      this.relation_node_ids = []
      this.getfiltersrelations() 
    },

    // edit name and description
    edit: function(id) {
      for (var i = 0; i < this.graphs.length; i++) {
        if (this.graphs[i].id === id) {
          this.graphs[i].name = this.name;
          this.graphs[i].description = this.description;
          this.graphs[i].updated_at = moment().format("l h:mm:ss");
        }
      }
      this.$vToastify.success("The data has been Updated successfully");
      Updatedata(this.graphs);
      this.$router.push({ name: "home" });
    },

    // add new nodes
    Addnode: function() {
      this.nodes.unshift({
        id: new Date().getTime(),
        graph_id: this.$route.params.id,
        tooltip: this.tooltip
      });
      this.$vToastify.success("The data has been added successfully");
      Updatenode(this.nodes);
      this.tooltip = "";
      this.getfiltersnodes() 
    },

    getfiltersnodes(){
        this.filtersnodes = Getnode().filter(data => data.graph_id == this.$route.params.id)
    }, 
    
    getfiltersrelations(){
        this.filtersrelations = Getrelation().filter(data => data.graph_id == this.$route.params.id)
    },

    // remove node
    removenode: function(index) {
      this.$swal({
        title: "Are you sure to delete this?",
        icon: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.$delete(this.nodes, index);
          this.$vToastify.success("The data has been deleted successfully");
          Updatenode(this.nodes);
         this.getfiltersnodes() 
        }
      });
    },
    
    // remove relations
    removerelation: function(index) {
      this.$swal({
        title: "Are you sure to delete this?",
        icon: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.$delete(this.relations, index);
          this.$vToastify.success("The data has been deleted successfully");
          Updaterelation(this.relations);
          this.getfiltersrelations() 
        }
      });
    },

  },
  created() {
   this.getfiltersnodes() 
   this.getfiltersrelations() 
    this.name = this.filtersgraphs[0].name
    this.description = this.filtersgraphs[0].description
  }, 
};
</script>

<style scoped>
.bv-example-row {
  margin-bottom: 200px;
}
</style>