import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      _id: "",
      name: "",
      email: "",
      password: "",
    },
  },
  mutations: {
    connect(state, data) {
      state.user._id = data._id;
      state.user.name = data.name;
      state.user.email = data.email;
      state.user.password = data.password;
    },
    disconnect(state) {
      state.user._id = "";
      state.user.name = "";
      state.user.email = "";
      state.user.password = "";
    },
  },
});
