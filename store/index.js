import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
Vue.use(Vuex);

export const state = () => ({
  productSpecs: "",
  ratingUsers: "",
  loggedIn: false,
  addToCartMsg: "",
  cartProducts: "",
  addToWishListMsg: "",
  wishListProducts: ""
});

export const getters = {
  getProductSpecs: state => state.productSpecs,
  getRatingUsers: state => state.ratingUsers,
  getAddToCartMsg: state => state.addToCartMsg,
  getCartProducts: state => state.cartProducts,
  getAddToWishListMsg: state => state.addToWishListMsg,
  getWishListProducts: state => state.wishListProducts
};

export const actions = {
  async addToUserCart({ commit }, [usersId, productId, quantity]) {
    await axios
      .post("http://localhost:8000/api/addToUserCart", {
        usersId: usersId,
        productId: productId,
        quantity: quantity
      })
      .then(res => {
        commit("setAddToCartMsg", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async userCartProducts({ commit }, [id]) {
    await axios
      .get("http://localhost:8000/api/userCartProducts", {
        params: {
          id: id
        }
      })
      .then(res => {
        commit("setCartProducts", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async deleteCartProduct({}, [userId, productId]) {
    await axios
      .delete("http://localhost:8000/api/deleteCartProduct", {
        params: {
          userId: userId,
          productId: productId
        }
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  },

  async addToUserWishList({ commit }, [usersId, productId]) {
    await axios
      .post("http://localhost:8000/api/addToUserWishList", {
        usersId: usersId,
        productId: productId
      })
      .then(res => {
        commit("setAddToWishListMsg", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async userWishlistProducts({ commit }, [usersId]) {
    await axios
      .get("http://localhost:8000/api/userWishlistProducts", {
        params: {
          usersId: usersId
        }
      })
      .then(res => {
        commit("setWishListProducts", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async deleteWishlistProduct({ commit, state }, [userId, productId]) {
    await axios
      .delete("http://localhost:8000/api/deleteWishlistProduct", {
        params: {
          userId: userId,
          productId: productId
        }
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  },

  async productSpecs({ commit }, id) {
    try {
      const res = await axios.get("http://localhost:8000/api/productSpecs", {
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      });
      commit("setProductSpecs", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async ratingUsers({ commit }, id) {
    try {
      const res = await axios.get("http://localhost:8000/api/ratingUsers", {
        params: {
          id: id
        }
      });
      commit("setRatingUsers", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },

  async addRating({ commit, state }, [text, rate, usersId, productId]) {
    await axios
      .post("http://localhost:8000/api/addRating", {
        text: text,
        rate: rate,
        usersId: usersId,
        productId: productId
      })
      .then(res => {
        commit("setAddToWishListMsg", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export const mutations = {
  setProductSpecs: (state, data) => (state.productSpecs = data),
  setRatingUsers: (state, data) => (state.ratingUsers = data),
  setAddToCartMsg: (state, data) => (state.addToCartMsg = data),
  setCartProducts: (state, data) => (state.cartProducts = data),
  setAddToWishListMsg: (state, data) => (state.addToWishListMsg = data),
  setWishListProducts: (state, data) => (state.wishListProducts = data)
};
