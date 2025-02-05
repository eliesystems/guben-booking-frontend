import PersistenceService from "@/services/PersistenceService";
const namespaced = true;

const state = {
  data: PersistenceService.getFromLocalStorage("tenant") || null,
  tenants: PersistenceService.getFromLocalStorage("tenants") || null,
  currentTenantId: PersistenceService.getFromLocalStorage("currentTenantId") || null,
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
    state.currentTenantId = tenant;
    PersistenceService.writeToLocalStorage("currentTenantId", tenant);
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
  currentTenantId: (state) => state.currentTenantId,
  currentTenant: (state) => {
    if (!state.data) return null;
    return state.tenants.find((t) => t.id === state.currentTenantId);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced,
};
