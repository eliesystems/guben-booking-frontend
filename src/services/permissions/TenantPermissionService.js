import user from "@/store/modules/user";
import store from "@/store";

class TenantPermissionService {
  static isOwner(tenant) {
    return tenant.ownerUserId === user.state.data.user.id;
  }
  static allowCreate() {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return permissions.manageTenants.create;
  }

  static allowUpdate(tenant) {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return (
      permissions.manageTenants.updateAny ||
      (permissions.manageTenants.updateOwn &&
        TenantPermissionService.isOwner(tenant))
    );
  }

  static allowDelete(tenant) {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return (
      permissions.manageTenants.deleteAny ||
      (permissions.manageTenants.deleteOwn &&
        TenantPermissionService.isOwner(tenant))
    );
  }
}

export default TenantPermissionService;
