<template>
  <b-container class="bv-example-row mt-5">
    <b-row>
      <b-col>
        <h4>
          <b-icon icon="graph-down"></b-icon>Graphs
        </h4>
      </b-col>
      <b-col class="text-right">
        <router-link class="btn btn-primary" to="/create">
          <b-icon icon="plus"></b-icon>Add new graph
        </router-link>
      </b-col>
    </b-row>
    <hr/>
     <input type="text" v-model="search" class="form-control mb-3 col-4 float-right" placeholder="Search..."/>
    <table class="table table-striped table-inverse table-bordered table-hover">
      <thead class="thead-inverse">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created at</th>
          <th width="5%">Actions</th>
        </tr>
      </thead>
      <tbody >
 
        <tr v-for="(item,index) in filteredResources" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.created_at}}</td>
          <td>
            <div class="btn-group">

              <button v-b-tooltip.hover title="Delete" class="btn btn-sm btn-light" @click="remove(index)">
                <b-icon icon="trash"></b-icon>
              </button>
            
              <router-link v-b-tooltip.hover title="Update" class="btn btn-sm btn-light" :to="'/graphs/'+ item.id +'/edit'">
                <b-icon icon="pencil"></b-icon>
              </router-link>
              
              <router-link v-b-tooltip.hover title="Statistics" class="btn btn-sm btn-light" :to="'/graphs/'+ item.id +'/statistics'">
                <b-icon icon="bar-chart"></b-icon>
              </router-link>
              
              <router-link v-b-tooltip.hover title="View" class="btn btn-sm btn-light" :to="'/graphs/' + item.id">
                <b-icon icon="eye"></b-icon>
              </router-link>

            </div>
          </td>
        </tr>
      </tbody>
    
    </table>
  </b-container>
</template>

<script>
import { Getdata, Updatedata } from "../storage.js";
export default {
  name: "home",
  data() {
    return {
      search :'',
      data: Getdata()
    };
  },
  methods: {
    remove: function(index) {
      this.$swal({
        title: "Are you sure to delete this?",
        icon: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.$delete(this.data, index);
          this.$vToastify.success("The data has been deleted successfully");
          Updatedata(this.data);
        }
      });
    }
  },

 computed: {
    filteredResources (){
      if(this.search){
      return this.data.filter((item)=>{
        return item.name.startsWith(this.search) + item.description.startsWith(this.search);
      })
      }else{
        return this.data;
      }
    }
  }

};
</script>