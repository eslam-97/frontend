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
  checkboxValue: "",
  selectedFilters: [],
  orderedByFilter: "",
  orderedByOption: "",
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
  getCheckboxValue: state => state.checkboxValue,
  getSelectedFilters: state => state.selectedFilters,
  getOrderedByFilter: state => state.orderedByFilter,
  getOrderedByOption: state => state.orderedByOption,
  getPaginationNum: state => state.paginationNum
};
export const actions = {
  async productBrand({ commit, state }, [type]) {
    try {
      const res = await axios.get("http://localhost:8000/api/productBrand", {
        params: {
          type: type,
          lang: this.$i18n.locale
        }
      });
      commit("setProductBrand", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async productColor({ commit }, [type]) {
    try {
      const res = await axios.get("http://localhost:8000/api/productColor", {
        params: {
          type: type,
          lang: this.$i18n.locale
        }
      });
      commit("setProductColor", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async productOperatingSystem({ commit }, [type]) {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/productOperatingSystem",
        {
          params: {
            type: type,
            lang: this.$i18n.locale
          }
        }
      );
      commit("setProductOperatingSystem", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  //###############################################################################################

  async productByBrand({ commit }, [type, brand]) {
    try {
      const res = await axios.get("http://localhost:8000/api/productByBrand", {
        params: {
          type: type,
          brand: brand
        }
      });

      commit("setFilterdProduct", { res: res, filter: brand });
      commit("setCheckboxValue", true);
    } catch (Error) {
      console.log(Error);
    }
  },
  async productByColor({ commit }, [type, color]) {
    try {
      const res = await axios.get("http://localhost:8000/api/productByColor", {
        params: {
          type: type,
          color: color
        }
      });
      commit("setFilterdProduct", { res: res, filter: "color" });
      commit("setCheckboxValue", true);
    } catch (Error) {
      console.log(Error);
    }
  },
  async productByOperatingSystem({ commit }, [type, operatingSystem]) {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/productByOperatingSystem",
        {
          params: {
            type: type,
            operatingSystem: operatingSystem
          }
        }
      );

      commit("setFilterdProduct", { res: res, filter: "OS" });
      commit("setCheckboxValue", true);
    } catch (Error) {
      console.log(Error);
    }
  }
};
export const mutations = {
  setProductBrand: (state, data) => (state.productBrand = data),
  setPriceRange: (state, data) => (state.productPrice = data),
  setProductPriceFiltered: (state, data) => (state.productPriceFiltered = data),
  setProductColor: (state, data) => (state.productColor = data),
  setProductOperatingSystem: (state, data) =>
    (state.productOperatingSystem = data),
  setSelectedFilters: (state, data) => (state.selectedFilters = data),
  setCheckboxValue: (state, data) => (state.checkboxValue = data),
  setOrderedByOption: (state, data) => [
    (state.orderedByOption = data[0]),
    (state.orderedByFilter = data[1])
  ],
  setOrderedByFilter: (state, data) => [
    (state.orderedByFilter = data[0]),
    (state.orderedByOption = data[1])
  ],
  setPaginationNum: (state, data) => (state.paginationNum = data),
  setProductType: (state, data) => (state.productType = data),
  setFilterdProduct(state, payload) {
    if (state.filterdProduct.length > 0) {
      if (state.selectedFilters.includes(payload.filter)) {
        const newArr = payload.res.data.map(element => {
          return element.id;
        });
        const ArrIndex = [];
        state.filterdProduct.filter((element, index) => {
          if (newArr.includes(element.id)) {
            ArrIndex.push(index);
            payload.res.data = [];
          }
        });
        for (let i = ArrIndex.length - 1; i >= 0; i--) {
          state.filterdProduct.splice(ArrIndex[i], 1);
        }
        state.filterdProduct.push(...payload.res.data);
      } else {
        state.selectedFilters = [];
        state.selectedFilters.push(payload.filter);
        state.filterdProduct = [];
        state.filterdProduct.push(...payload.res.data);
      }
    } else {
      state.selectedFilters.push(payload.filter);
      if (!payload.res.data) {
        state.filterdProduct = [];
      }
      state.filterdProduct = payload.res.data;
    }
  }
};
