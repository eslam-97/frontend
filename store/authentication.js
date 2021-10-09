import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
Vue.use(Vuex);

export const state = () => ({
  registerStatus: "",
  registerErrors: [],
  registerUserData: [],
  loginStatus: "",
  loginMsg: "",
  updateUserStatus: "",
  updatePasswordStatus: ""
});
export const getters = {
  getRegisterStatus: state => state.registerStatus,
  getRegisterErrors: state => state.registerErrors,
  getUserData: state => state.registerUserData,
  getLoginStatus: state => state.loginStatus,
  getLoginMsg: state => state.loginMsg,
  getUpdateUserStatus: state => state.updateUserStatus,
  getUpdatePasswordStatus: state => state.updatePasswordStatus
};
export const actions = {

  async register({ commit }, formData) {
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(Response => {
      axios
        .post("http://localhost:8000/api/signUp", formData, {
          headers: {
            "content-type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
          }}).then(res => {

          commit("setRegisterInfo", res.data);

        }).catch(error => {
          console.log(error);
        });
    });
  },


  async login({ commit }, [email, password]) {
     this.$auth.loginWith("laravelSanctum", {
        data: {
          email: email,
          password: password
      }})
      .then(res => {
        this.$auth.setUser(res.data.user);
        this.$auth.strategy.token.set("Bearer " +res.data.token);
        this.$auth.fetchUser();
        commit("setLoginData", res.data);
        

      })
      .catch(error => {
        console.log(error);
      });
  },


  async logout({ commit }) {
    await this.$auth.logout();
    commit("setCartProducts", '', { root: true });
    commit("setWishListProducts", '', { root: true });
    this.$auth.setUser("");
    this.$auth.setUserToken("");
  },

  async updateUserInfo({ commit }, formData) {
    await axios.put(`http://localhost:8000/api/user`, formData, {
        headers: {
            'Authorization':this.$auth.strategy.token.get(),
          "content-type": "multipart/form-data; charset=utf-8; boundary=" +Math.random().toString().substr(2)
        }}).then(res => {

        commit("setUpdateUserStatus", res.data);

      }).catch(error => {
        console.log(error);
      });
  },


  async updateUserPassword({ commit }, [id, password, newPassword]) {
    await axios.put(`http://localhost:8000/api/user/password`,
        { 
          password: password,
          newPassword: newPassword},
          { headers: {
            'Authorization':this.$auth.strategy.token.get(),
          }})
      .then(res => {
        commit("setUpdatePasswordStatus", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
export const mutations = {
  setUserData: (state, data) => (state.registerUserData = data),
  setUpdateUserStatus: (state, data) => (state.updateUserStatus = data),
  setUpdatePasswordStatus: (state, data) => (state.updatePasswordStatus = data),
  setLoginData(state, payload) {
    (state.loginStatus = payload.status), (state.loginMsg = payload.message)},
  setRegisterInfo(state, data) {
    state.registerStatus = data.status;
    state.registerErrors = data.validation_errors},
};
