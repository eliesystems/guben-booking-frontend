import PersistenceService from "@/services/PersistenceService";
const namespaced = true;

const state = {
  data: PersistenceService.getFromLocalStorage("tenant") || null,
  selectedTenant: PersistenceService.getFromLocalStorage("selectedTenant") || null,
};

const mutations = {
  UPDATE(state, tenant) {
    state.data = tenant;
    PersistenceService.writeToLocalStorage("tenant", tenant);
  },
  DELETE(state) {
    state.data = null;
    PersistenceService.removeFromLocalStorage("tenant");
  },
  SELECT(state, tenant) {
    state.selectedTenant = tenant;
    PersistenceService.writeToLocalStorage("selectedTenant", tenant);
  },
};

const actions = {
  update({ commit }, tenant) {
    commit("UPDATE", tenant);
  },
  delete({ commit }) {
    commit("DELETE");
  },
  select({ commit }, tenant) {
    commit("SELECT", tenant);
  },
};

const getters = {
  tenant: (state) => state.data,
  selectedTenant: (state) => state.selectedTenant,
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced,
};
