import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
Vue.use(Vuex);

export const state = () => ({
  productType: "",
  filterdProduct: "",
  productBrand: "",
  productPrice: [0, 0],
  productPriceFiltered: "",
  productColor: "",
  productOperatingSystem: "",
  selectedFilters: [],
  selectedBrand: null,
  paginationNum: 0
});
export const getters = {
  getProductType: state => state.productType,
  getFilterdProduct: state => state.filterdProduct,
  getProductBrand: state => state.productBrand,
  getProductPrice: state => state.productPrice,
  getPriceFiltered: state => state.productPriceFiltered,
  getProductColor: state => state.productColor,
  getProductOperatingSystem: state => state.productOperatingSystem,
  getSelectedFilters: state => state.selectedFilters,
  getSelectedBrand: state => state.selectedBrand,
  getPaginationNum: state => state.paginationNum
};
export const actions = {

  async productBrand({ commit }, [type, color, OperatingSystem]) {
    try {
      const res = await axios.get("http://localhost:8000/api/products/brands", {
        params: {
          type: type,
          color: color,
          OperatingSystem: OperatingSystem,
        }
      });
      commit("setProductBrand", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async productColor({ commit }, [type, brand, OperatingSystem ]) {
    try {
      const res = await axios.get("http://localhost:8000/api/products/colors", {
        params: {
          type: type,
          brand: brand,
          OperatingSystem: OperatingSystem,
        }
      });
      commit("setProductColor", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async productOperatingSystem({ commit }, [type, brand, color]) {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/products/operating-systems",
        {
          params: {
            type: type,
            brand: brand,
            color: color,
          }
        }
      );
      commit("setProductOperatingSystem", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  //###############################################################################################


  async filterProducts({ commit }, [type, brand, color, operatingSystem, order_by, order_dir]) {
    try {
      const res = await axios.get(`http://localhost:8000/api/products`, {
        params: {
          type: type,
          brand: brand,
          color: color,
          operatingSystem: operatingSystem,
          order_by: order_by,
          order_dir: order_dir,
        }
      });

      commit("setFilterdProduct", res.data);
    } catch (Error) {
      console.log(Error);
    } 
  },

  async sortProducts({ commit }, [type, order_by, order_dir]) {
    try {
      const res = await axios.get(`http://localhost:8000/api/products`, {
        params: {
          type: type,
          order_by: order_by,
          order_dir: order_dir,
        }
      });

      commit("setFilterdProduct", res.data);
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
  setPriceRange: (state, data) => (state.productPrice = data),
  setProductPriceFiltered: (state, data) => (state.productPriceFiltered = data),
  // setProductType: (state, data) => (state.productType = data),
};
