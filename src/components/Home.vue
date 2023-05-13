<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="row mt-5 ">
        <div class="col-md-6">
          <div class="row mb-3 d-flex align-items-center">
            <div class="col-md-4 col-sm-12">
              <label>Full Name (TH)</label>
            </div>
            <div class="col-md-8 col-sm-12">
              <input type="text" class="form-control" placeholder="Full Name (TH)" v-model="info.nameOrigin">
            </div>
            <div class="col-md-4 col-sm-12 mt-2">
              <label>Number of distance</label>
            </div>
            <div class="col-md-8 col-sm-12 mt-2">
              <div class="row">
                <div class="col-7">
                  <div v-if="info.choicePercent != ''">
                    <select class="form-select text-center" disabled v-model="info.choiceDistance">
                      <option value="">Number of distance</option>
                      <option value="MoreThanEqual">>=</option>
                      <option value="MoreThan">></option>
                      <option value="Equal">=</option>
                      <option value="LessThan">&lt; </option>
                      <option value="LessThanEqual">&lt;=</option>
                    </select>
                  </div>
                  <div v-else>
                    <select class="form-select text-center" v-model="info.choiceDistance">
                      <option value="">Number of distance</option>
                      <option value="MoreThanEqual">>=</option>
                      <option value="MoreThan">></option>
                      <option value="Equal">=</option>
                      <option value="LessThan">&lt; </option>
                      <option value="LessThanEqual">&lt;=</option>
                    </select>
                  </div>
                </div>
                <div class="col-5">
                  <div v-if="info.choicePercent != '' || info.choiceDistance == ''">
                    <input class="form-control text-center" disabled placeholder="Distance" type="number" min="1"
                      max="100" v-model="info.distance">
                  </div>
                  <div v-else>
                    <input class="form-control text-center" placeholder="Distance" type="number" min="1" max="100"
                      v-model="info.distance">
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12 mt-2">
              <label>Percentage of distance</label>
            </div>
            <div class="col-md-8 col-sm-12 mt-2">
              <div class="row">
                <div class="col-7">
                  <div v-if="info.choiceDistance != ''">
                    <select class="form-select text-center" disabled v-model="info.choicePercent">
                      <option value="">Percentage of distance</option>
                      <option value="MoreThanEqual">> =</option>
                      <option value="MoreThan">></option>
                      <option value="Equal">=</option>
                      <option value="LessThan">&lt;</option>
                      <option value="LessThanEqual">&lt; =</option>
                    </select>
                  </div>
                  <div v-else>
                    <select class="form-select text-center" v-model="info.choicePercent">
                      <option value="">Percentage of distance</option>
                      <option value="MoreThanEqual">> =</option>
                      <option value="MoreThan">></option>
                      <option value="Equal">=</option>
                      <option value="LessThan">&lt;</option>
                      <option value="LessThanEqual">&lt; =</option>
                    </select>
                  </div>
                </div>
                <div class="col-5">
                  <div v-if="info.choiceDistance != '' || info.choicePercent == ''">
                    <input class="form-control text-center" disabled placeholder="Percentage" type="number" min="1"
                      max="100" v-model="info.choicePercent">
                  </div>
                  <div v-else>
                    <input class="form-control text-center" placeholder="Percentage" type="number" min="1" max="100"
                      v-model="info.percent">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row d-flex align-items-center">
            <div class="col-md-3 col-sm-12">
              <label>Translation Process</label>
            </div>
            <div class="col-md-9 col-sm-12">
              <select class="form-select" v-model="info.logic">
                <option value="">Translation Process</option>
                <option value="NameThai2rom">Thai2Rom</option>
                <option value="NameTltk">Tltk</option>
                <option value="NameGoogle">Google</option>
                <option value="AllLogic">Thai2Rom + Tltk + Google</option>
              </select>
            </div>
          </div>
        </div>
        <div class="com-12 my-3 text-center">
          <button type="button" class="btn btn-warning mx-5" style="width: 20%;" @click="SubmitFrom">Search</button>
          <button type="button" class="btn btn-warning mx-5" style="width: 20%;" @click="Clear">Clear</button>
        </div>
      </div>

      <Vue3EasyDataTable class="customize-table" :headers="headers" :items="nameTramslete" :loading="loading" border-cell
        theme-color="#1d90ff" table-class-name="customize-table" header-text-direction="center"
        body-text-direction="center">
        <template #loading>
          <div>
            <img class="img-fluid" src="../assets/loading.svg" alt="" style="width: 100px;">
          </div>
        </template>
        <template #empty-message>
          <div>
            <img class="img-fluid" src="../assets/nodata.png" alt="" style="width: 100px;">
            <p class="text-center"> Data Not Found</p>
          </div>
        </template>
      </Vue3EasyDataTable>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css';
export default {
  name: "HomePage",
  components: {
    Header,
    Vue3EasyDataTable
  },
  data() {
    const headers = [
      { text: "No.", value: "no" },
      { text: "Full Name (EN)", value: "name" },
      { text: "Distance", value: "distance" },
    ];

    return {
      loading: false,
      nameTramslete: "",
      info: {
        logic: "",
        nameOrigin: "ครองขวัญ รัศมีโชติ",
        choiceDistance: "",
        distance: null,
        percent: null,
        choicePercent: "",
      },
      headers,
      BackgroundColor: 'background-color: black;'
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    Clear() {
      this.nameTramslete = ""
    },
    SubmitFrom() {
      this.loading = true
      // console.log(this.info)
      this.nameTramslete = ""
      var headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
      let apiURL = "http://localhost:3000/search"
      axios.post(apiURL, this.info, { headers: headers }).then((res) => {
        // this.info.nameOrigin = null
        // this.info.logic = ""
        this.nameTramslete = res.data
        console.log(this.nameTramslete);
        this.loading = false

      }).catch(error => {
        this.loading = false
        // this.nameTramslete = error.response.data
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: black;
  --easy-table-header-background-color: rgb(146, 208, 80);

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #ffff;

  --easy-table-body-row-font-color: black;
  --easy-table-body-row-background-color: #ffff;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: black;
  --easy-table-body-row-hover-background-color: #ffff;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: rgb(146, 208, 80);
  --easy-table-footer-font-color: black;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  ;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>