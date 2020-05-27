<template>
  <b-container class="bv-example-row mt-5">
    <b-row>
      <b-col>
        <h3>
          <b-icon icon="graph-down"></b-icon>Graphs
        </h3>
      </b-col>
      <b-col class="text-right">
        <router-link class="btn btn-primary" to="/create">
          <b-icon icon="plus"></b-icon>Add new graph
        </router-link>
      </b-col>
    </b-row>
    <hr />
    <table class="table table-striped table-inverse table-bordered">
      <thead class="thead-inverse">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created at</th>
          <th width="5%">Actions</th>
        </tr>
      </thead>
      <tbody v-if="graphs.length > 0">
        <tr v-for="(graph,index) in graphs" :key="graph.id">
          <td>{{graph.name}}</td>
          <td>{{graph.description}}</td>
          <td>{{graph.created_at}}</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-sm btn-light" @click="remove(index)">
                <b-icon icon="trash"></b-icon>
              </button>
              <button class="btn btn-sm btn-light">
                <b-icon icon="pencil"></b-icon>
              </button>
              <button class="btn btn-sm btn-light">
                <b-icon icon="eye"></b-icon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tr v-else>
        <td colspan="5" class="text-center bg-light">There is no data !</td>
      </tr>
    </table>
  </b-container>
</template>

<script>
import { Getdata, Updatedata } from "../storage.js";
export default {
  name: "home",
  data() {
    return {
      graphs: Getdata()
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
          this.$delete(this.graphs, index);
          this.$vToastify.success("The data has been deleted successfully");
          Updatedata(this.graphs);
        }
      });
    }
  }
};
</script>