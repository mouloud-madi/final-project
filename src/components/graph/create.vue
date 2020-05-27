<template>
  <b-container class="bv-example-row mt-5">
    <b-row>
      <b-col>
        <h3>Add new graph</h3>
      </b-col>
      <b-col class="text-right">
        <router-link class="btn btn-primary" to="/">
          <b-icon icon="arrow-left"></b-icon>Back
        </router-link>
      </b-col>
    </b-row>
    <hr />

    <b-row class="justify-content-center">
      <b-col cols="8">
        <form v-on:submit.prevent="Addgraph">
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
                <b-icon icon="file-arrow-down"></b-icon> Save
              </button>
              <router-link to="/" class="btn btn-danger ml-1">
                <b-icon icon="x-circle"></b-icon> Cancel
              </router-link>
            </b-col>
          </b-row>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {Getdata,Updatedata} from '../storage.js'
import moment from 'moment'
export default {
  name: "create",
  data() {
    return {
      graphs: Getdata(),
      id :'',
      name : '',
      description : '',
      created_at : '',
      updated_at : '',

    };
  },
  methods: {
     Addgraph :function(){
      this.graphs.unshift(
        { 
         id: new Date().getTime(),
         name:this.name,
         description:this.description,
         created_at:moment().format('l'),
         updated_at:'',
        });
        this.$vToastify.success("The data has been added successfully");
        Updatedata(this.graphs)
        this.$router.push({name:'home'});
      },

  }
};
</script>