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
      .post(`http://localhost:8000/api/user/cart/products/${productId}`, {
        quantity: quantity
      },{
        headers:{
          'Authorization':this.$auth.strategy.token.get()
        }
      })
      .then(res => {
        commit("setAddToCartMsg", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },


  async userCartProducts({ commit },[id]) {
    await axios
      .get("http://localhost:8000/api/user/cart/products", {
        headers:{
          'Authorization':this.$auth.strategy.token.get()
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
      .delete(`http://localhost:8000/api/user/cart/products/${productId}`, {
        headers:{
          'Authorization':this.$auth.strategy.token.get()
        }
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  },


  async addToUserWishList({ commit }, [usersId, productId]) {
    await axios
      .post(`http://localhost:8000/api/user/wishlist/products/${productId}`, {},{
        headers:{
          'Authorization':this.$auth.strategy.token.get()
        }
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
      .get(`http://localhost:8000/api/user/wishlist/products`, {
        headers:{
          'Authorization':this.$auth.strategy.token.get()
        }
      })
      .then(res => {
        commit("setWishListProducts", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },


  async deleteWishlistProduct({ }, [userId, productId]) {
    await axios
      .delete(`http://localhost:8000/api/user/wishlist/products/${productId}`, {
        headers:{
          'Authorization':this.$auth.strategy.token.get()
        }
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  },


  async productSpecs({ commit }, id) {
    try {
      const res = await axios.get(`http://localhost:8000/api/product/${id}/specs`, {
        params: {
          lang: this.$i18n.locale,
        }
      });
      commit("setProductSpecs", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async ratingUsers({ commit }, id) {
    try {
      const res = await axios.get(`http://localhost:8000/api/product/${id}/reviewers`);
      commit("setRatingUsers", res.data);
    } catch (Error) {
      console.log(Error);
    }
  },


  async addRating({ commit }, [text, rate, usersId, productId]) {
    await axios
      .post(`http://localhost:8000/api/product/${productId}/review`, {
        text: text,
        rate: rate,
        usersId: usersId,
      },{
        headers:{
          'Authorization':this.$auth.strategy.token.get()
        }
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
