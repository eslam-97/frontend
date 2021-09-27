import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
Vue.use(Vuex);

export const state = () => ({
  productType: "",
  filterdProduct: "",
  productBrand: "",
  productPriceFiltered: "",
  productColor: "",
  productOperatingSystem: "",
  selectedFilters: [],
  sortingFilters:[],
  selectedBrand: null,
  paginationNum: 0
});
export const getters = {
  getProductType: state => state.productType,
  getFilterdProduct: state => state.filterdProduct,
  getProductBrand: state => state.productBrand,
  getPriceFiltered: state => state.productPriceFiltered,
  getProductColor: state => state.productColor,
  getProductOperatingSystem: state => state.productOperatingSystem,
  getSelectedFilters: state => state.selectedFilters,
  getSelectedBrand: state => state.selectedBrand,
  getPaginationNum: state => state.paginationNum
};
export const actions = {

  async productBrand({ commit }, [type, color, OperatingSystem, min_price, max_price]) {
    try {
      const res = await axios.get("http://localhost:8000/api/products/brands", {
        params: {
          type: type,
          color: color,
          OperatingSystem: OperatingSystem,
          min_price: min_price,
          max_price: max_price
        }
      });
      commit("setProductBrand", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async productColor({ commit }, [type, brand, OperatingSystem, min_price, max_price ]) {
    try {
      const res = await axios.get("http://localhost:8000/api/products/colors", {
        params: {
          type: type,
          brand: brand,
          OperatingSystem: OperatingSystem,
          min_price: min_price,
          max_price: max_price
        }
      });
      commit("setProductColor", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async productOS({ commit }, [type, brand, color, min_price, max_price]) {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/products/operating-systems",
        {
          params: {
            type: type,
            brand: brand,
            color: color,
            min_price: min_price,
            max_price: max_price
          }
        }
      );
      commit("setProductOperatingSystem", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  //###############################################################################################


  async filterProducts({ commit,state }, [type, brand, color, operatingSystem, min_price, max_price]) {
    try {
      const res = await axios.get(`http://localhost:8000/api/products`, {
        params: {
          type: type,
          brand: brand,
          color: color,
          operatingSystem: operatingSystem,
          min_price: min_price,
          max_price: max_price,
          order_by: state.sortingFilters[0],
          order_dir: state.sortingFilters[1],
        }
      });

      commit("setFilterdProduct", res.data);
    } catch (Error) {
      console.log(Error);
    } 
  },

  async sortProducts({ commit, state }, [type, order_by, order_dir]) {
    try {
      const res = await axios.get(`http://localhost:8000/api/products`, {
        params: {
         type: type,
         brand: state.selectedFilters[1],
         color: state.selectedFilters[2],
         operatingSystem: state.selectedFilters[3],
         min_price: state.selectedFilters[4],
         max_price: state.selectedFilters[5],
          order_by: order_by,
          order_dir: order_dir,
        }
      });

      commit("setFilterdProduct", res.data);
      commit('setSortingFilters', [order_by, order_dir])
    } catch (Error) {
      console.log(Error);
    } 
  },

};
export const mutations = {
  setProductBrand: (state, data) => (state.productBrand = data),
  setProductColor: (state, data) => (state.productColor = data),
  setProductOperatingSystem: (state, data) => (state.productOperatingSystem = data),
  setSelectedBrand: (state, data) => (state.selectedBrand = data),
  setSelectedFilters: (state, data) => (state.selectedFilters = data),
  setFilterdProduct: (state, payload) => (state.filterdProduct = payload),
  setPaginationValue: (state, data) => (state.paginationNum = data),
  setProductPriceFiltered: (state, data) => (state.productPriceFiltered = data),
  setSortingFilters: (state, data) => (state.sortingFilters = data),
  // setProductType: (state, data) => (state.productType = data),
};
