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
    <d3-network :net-nodes="nodes" :net-links="links" :options="options">
    </d3-network>
     
  </b-container>
</template>

<script>
import D3Network from 'vue-d3-network'
export default {
  name : "view",
   components: {
    D3Network
  },
  data () {
    return {
      nodes: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 }
      ],
      links: [
        { sid: 1, tid: 2,_color:'red'},
        { sid: 2, tid: 8,_color:'red'},
        { sid: 3, tid: 4,_color:'red'},
        { sid: 4, tid: 5,_color:'red'},
        { sid: 5, tid: 6,_color:'red'},
        { sid: 7, tid: 8,_color:'red'},
        { sid: 5, tid: 8,_color:'red'},
        { sid: 3, tid: 8,_color:'red'},
        { sid: 7, tid: 9,_color:'red'}
      ],
      options:
      {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth:5
      }
    }
  },
}
</script>

<style>

</style>