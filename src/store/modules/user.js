import store from "@/store";
import PersistenceService from "@/services/PersistenceService";
const namespaced = true;

const state = {
  data: PersistenceService.getFromLocalStorage("user") || null,
};

const mutations = {
  UPDATE(state, user) {
    state.data = user;
    PersistenceService.writeToLocalStorage("user", user);
  },
  DELETE(state) {
    state.data = null;
    PersistenceService.removeFromLocalStorage("user");
  },
};

const actions = {
  update({ commit }, user) {
    commit("UPDATE", user);
  },
  delete({ commit }) {
    commit("DELETE");
  },
};

const getters = {
  user: (state) => state.data,
  tenant: (state) => state.data.tenant,
  isLoggedIn: () => !_.isNil(state.data),
  isAuthorized: (state) => (ifce) => {
    if (state.data && state.data.permissions) {
      const t = store.getters["tenants/currentTenant"];
      const adIfces = state.data.permissions.find((p) => p.tenantId === t);
      if(!adIfces) return false;
      return adIfces.adminInterfaces.includes(ifce);
    }
    return false;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced,
};
