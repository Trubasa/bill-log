import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    billList: []
  },
  actions:{
    saveBill({},data){
      localStorage.setItem('billList',JSON.stringify(data))
    },
    initData({state}){
      let billListStr=localStorage.getItem('billList')
      state.billList=billListStr?JSON.parse(billListStr):[];
    },
  },
  mutations: {


    increment (state) {
      state.count++
    }
  }
})

export default store
