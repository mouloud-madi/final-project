<template>
   <b-container class="bv-example-row mt-5">
    <b-row>
      <b-col>
      <h4> <b-icon icon="graph-down"></b-icon>Graphs</h4>
      </b-col>
      <b-col class="text-right">
        <router-link class="btn btn-primary" to="/">
          <b-icon icon="arrow-left"></b-icon>Back
        </router-link>
      </b-col>
    </b-row>
    <hr>
    <d3-network :net-nodes="nodes" :net-links="links" :options="options"></d3-network>
  </b-container>
</template>

<script>
import D3Network from 'vue-d3-network';
import {Getnode,Getrelation} from "../storage.js";
export default {
  name : "view",
   components: {
    D3Network
  },
  data () {
    return {
      nodes: Getnode().filter(data => data.graph_id == this.$route.params.id),
      links: Getrelation().filter(data => data.graph_id == this.$route.params.id),
      options:
      {
        force: 5000,
        nodeSize: 30,
        nodeLabels: true,
        linkWidth:5
      }
    }
  },
   
}
</script>
 