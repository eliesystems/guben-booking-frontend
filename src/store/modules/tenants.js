import PersistenceService from "@/services/PersistenceService";
const namespaced = true;

const state = {
  data: PersistenceService.getFromLocalStorage("tenant") || null,
  tenants: PersistenceService.getFromLocalStorage("tenants") || null,
  currentTenant: PersistenceService.getFromLocalStorage("currentTenant") || null,
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
  SET_TENANTS(state, tenants) {
    state.tenants = tenants;
    PersistenceService.writeToLocalStorage("tenants", tenants);
  },
  SELECT(state, tenant) {
    state.currentTenant = tenant;
    PersistenceService.writeToLocalStorage("currentTenant", tenant);
  },
};

const actions = {
  update({ commit }, tenant) {
    commit("UPDATE", tenant);
  },
  delete({ commit }) {
    commit("DELETE");
  },
  setTenants({ commit }, tenants) {
    commit("SET_TENANTS", tenants);
  },
  select({ commit }, tenant) {
    commit("SELECT", tenant);
  },
};

const getters = {
  tenants: (state) => state.tenants,
  currentTenant: (state) => state.currentTenant,
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced,
};
