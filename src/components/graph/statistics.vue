<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <h4>Statistics</h4>
      </b-col>
      <b-col class="text-right">
        <router-link class="btn btn-primary" to="/">
          <b-icon icon="arrow-left"></b-icon>Back
        </router-link>
      </b-col>
    </b-row>
    <hr />
    <h5>
      Number of nodes :
      <span class="text-primary">{{filtersnodes.length}}</span>
    </h5>
    <h5>
      Number of relations :
      <span class="text-primary">{{filtersrelations.length}}</span>
    </h5>
    <h5>
      <b-icon icon="clock"></b-icon>Created at :
      <span class="text-primary">{{filtersgraphs[0].created_at}}</span>
    </h5>
    <h5>
      <b-icon icon="clock"></b-icon>Updated at :
      <span class="text-primary">{{filtersgraphs[0].updated_at}}</span>
    </h5>
    <hr />
    <h5>Node table</h5>

    <table class="table table-bordered">
      <thead class="thead-inverse">
        <tr>
          <th>Node Id</th>
          <th>Node tooltip</th>
          <th>Node neighbors</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="node in filtersnodes" :key="node.id">
          <td>{{node.id}}</td>
          <td>{{node.tooltip}}</td>
          <td>
            <span v-for="relation in filtersrelations" :key="relation.id">
              <div v-if="relation.sid === node.id">{{relation.tid}}</div>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>
<script>
import { Getdata, Getnode, Getrelation } from "../storage.js";
export default {
  name: "statistics",
  data() {
    return {
      filtersgraphs: Getdata().filter(data => data.id == this.$route.params.id),
      filtersnodes: Getnode().filter(
        data => data.graph_id == this.$route.params.id
      ),
      filtersrelations: Getrelation().filter(
        data => data.graph_id == this.$route.params.id
      )
    };
  },

  methods: {}
};
</script>