import user from "@/store/modules/user";
import store from "@/store";

class RolePermissionService {
  static isOwner(role) {
    return role.ownerUserId === user.state.data.user.id;
  }

  static allowCreate() {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return permissions.manageRoles.create;
  }

  static allowUpdate(role) {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return (
      permissions.manageRoles.updateAny ||
      (permissions.manageRoles.updateOwn && RolePermissionService.isOwner(role))
    );
  }

  static allowDelete(role) {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return (
      permissions.manageRoles.deleteAny ||
      (permissions.manageRoles.deleteOwn && RolePermissionService.isOwner(role))
    );
  }
}

export default RolePermissionService;
