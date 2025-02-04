export default {
  getTenants(publicTenants = false) {
    return ApiClient.get(`api/tenants?publicTenants=${publicTenants}`, {
      withCredentials: true,
    });
  },
  submitTenant(tenant) {
    return ApiClient.put("api/tenants", tenant, { withCredentials: true });
  },
  deleteTenant(tenant) {
    return ApiClient.delete(`api/tenants/${tenant.id}`, {
      withCredentials: true,
    });
  },
  getTenantActivePaymentApps(tenantId, withCredentials= true) {
    return ApiClient.get(`api/tenants/${tenantId}/payment-apps`,  { withCredentials : withCredentials });
  },
  getTenant(tenantId, withCredentials = true) {
    return ApiClient.get(`api/tenants/${tenantId}`, {
      withCredentials: withCredentials,
    });
  },
  async tenantCountCheck() {
    return (await ApiClient.get("api/tenants/count/check", {
      withCredentials: true,
    })).data
  }
};
