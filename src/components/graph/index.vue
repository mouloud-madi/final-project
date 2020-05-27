<template>
  <b-container class="bv-example-row mt-5">
    <b-row>
      <b-col><h3> <b-icon icon="graph-down"></b-icon> Graphs</h3></b-col>
      <b-col class="text-right">
        <router-link class="btn btn-primary" to="/create">
          <b-icon icon="plus"></b-icon> Add new graph
        </router-link>
      </b-col>
    </b-row>
    <hr/>
  </b-container>
</template>

<script>
export default {
  name: "home"
};
</script>