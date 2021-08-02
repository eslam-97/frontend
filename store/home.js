import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;

Vue.use(Vuex);

export const state = () => ({
  products: "",
  similarProducts: "",
  singleProduct: "",
  hotOffers: "",
  newArrival: "",
  bestSeller: "",
  filteredProducts: [],
  productCategories: ""
});
export const getters = {
  getAllProduct: state => state.products,
  getSimilarProducts: state => state.similarProducts,
  getSingleProduct: state => state.singleProduct,
  getHotOffers: state => state.hotOffers,
  getNewArrival: state => state.newArrival,
  getBestSeller: state => state.bestSeller,
  getFilteredProducts: state => state.filteredProducts,
  getProductCategories: state => state.productCategories
};
export const actions = {
  async allProducts({ commit }, [type]) {
    try {
      const res = await axios.get("http://localhost:8000/api/allProducts", {
        params: {
          type: type
        }
      });
      commit("setProducts", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async similarProducts({ commit }, [type]) {
    try {
      const res = await axios.get("http://localhost:8000/api/allProducts", {
        params: {
          type: type
        }
      });
      commit("setSimilarProducts", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async product({ commit }, [id]) {
    try {
      const res = await axios.get("http://localhost:8000/api/product", {
        params: {
          id: id
        }
      });
      commit("setSingleProduct", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async hotOffers({ commit }) {
    try {
      const res = await axios.get("http://localhost:8000/api/hotOffers");
      commit("setHotOffers", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async newArrival({ commit }) {
    try {
      const res = await axios.get("http://localhost:8000/api/newArrival");
      commit("setNewArrival", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async bestSeller({ commit }) {
    try {
      const res = await axios.get("http://localhost:8000/api/bestSeller");
      commit("setBestSeller", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async searchProducts({ commit }, searchInput) {
    try {
      const res = await axios.get("http://localhost:8000/api/search", {
        params: {
          searchInput: searchInput
        }
      });
      commit("setFilteredProducts", res.data.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async productCategories({ commit }) {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/productCategories"
      );
      commit("setProductCategories", res.data);
    } catch (Error) {
      console.log(Error);
    }
  }
};
export const mutations = {
  setProducts: (state, data) => (state.products = data),
  setSingleProduct: (state, data) => (state.singleProduct = data),
  setSimilarProducts: (state, data) => (state.similarProducts = data),
  setHotOffers: (state, data) => (state.hotOffers = data),
  setNewArrival: (state, data) => (state.newArrival = data),
  setBestSeller: (state, data) => (state.bestSeller = data),
  setFilteredProducts: (state, data) => (state.filteredProducts = data),
  setProductCategories: (state, data) => (state.productCategories = data)
};
