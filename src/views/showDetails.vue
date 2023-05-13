<template>
  <div class="table-responsive">
    <strong class="py-2 px-2" style="background-color:rgb(146, 208, 80); ;">Distance Average</strong>
    <table class="table">
      <thead style="background-color: rgb(146, 208, 80); border-radius: 10px;">
        <tr v-for="data, index in avgData.AVG" :key="index">
          <th style="white-space:nowrap;" scope="col"><strong>Romanize</strong> : {{ data[0] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>Thai2rom</strong> : {{ data[1] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>Tltk</strong> : {{ data[2] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>Thai2romOnnx</strong> :{{ data[3] }} </th>
          <th style="white-space:nowrap;" scope="col"><strong>Google</strong> : {{ data[4] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>C1R1R2</strong> : {{ data[5] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>C2R1R2</strong> : {{ data[6] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>C3R1R2</strong> : {{ data[7] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>R1R2</strong> : {{ data[8] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>R1RG</strong> : {{ data[9] }}</th>
          <th style="white-space:nowrap;" scope="col"><strong>R2RG</strong> : {{ data[10] }}</th>
        </tr>
      </thead>
    </table>
    <Vue3EasyDataTable class="customize-table" :headers="headerstable" :items="nameAlldata" :loading="loading" border-cell
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
</template>

<script>
import axios from "axios";
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css';
export default {
  components: {
    Vue3EasyDataTable
  },
  data() {
    const headerstable = [
      { text: "No.", value: "No" },
      { text: "ThaiFullName", value: "ThaiFullName" },
      { text: "NameReal", value: "NameReal" },
      { text: "NameRomanize", value: "NameRomanize" },
      { text: "NameThai2rom", value: "NameThai2rom" },
      { text: "NameTltk", value: "NameTltk" },
      { text: "NameThai2romOnnx", value: "NameThai2romOnnx" },
      { text: "NameGoogle", value: "NameGoogle" },
      { text: "DistanceRomanize", value: "DistanceRomanize" },
      { text: "DistanceThai2rom", value: "DistanceThai2rom" },
      { text: "DistanceTltk", value: "DistanceTltk" },
      { text: "DistanceThai2romOnnx", value: "DistanceThai2romOnnx" },
      { text: "DistanceGoogle", value: "DistanceGoogle" },
      { text: "DistanceC1R1R2", value: "DistanceC1R1R2" },
      { text: "DistanceC2R1R2", value: "DistanceC2R1R2" },
      { text: "DistanceC3R1R2", value: "DistanceC3R1R2" },
      { text: "DistanceR1R2", value: "DistanceR1R2" },
      { text: "DistanceR1RG", value: "DistanceR1RG" },
      { text: "DistanceR2RG", value: "DistanceR2RG" },
    ];
    return {
      nameAlldata: "",
      avgData: [],
      loading: false,
      headerstable
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    GetAll() {
      this.loading = true
      var headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
      let baseurl = "http://127.0.0.1:3000"
      axios.get(`${baseurl}/showDetailsAll`, { headers: headers }).then((res) => {
        this.nameAlldata = res.data
        this.loading = false
        console.log(this.nameAlldata)
      }).catch(error => {
        this.loading = false
        console.log(error);
      })
    },
    GetAVG() {
      var headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
      let baseurl = "http://127.0.0.1:3000"
      axios.get(`${baseurl}/showAvg`, { headers: headers }).then((res) => {
        this.avgData = JSON.parse(res.data)
        console.log(this.avgData);
      }).catch(error => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.GetAll()
    this.GetAVG()
  }
}
</script>

<style scoped>
.customize-table {
  white-space: nowrap;
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

  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
