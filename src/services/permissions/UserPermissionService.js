import user from "@/store/modules/user";
import store from "@/store";

class UserPermissionService {
  static isSelf(userObject) {
    return userObject.id === user.state.data.user.id;
  }

  static allowCreate() {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return permissions.manageUsers.create;
  }

  static allowUpdate(userObject) {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return (
      permissions.manageUsers.updateAny ||
      (permissions.manageUsers.updateOwn &&
        UserPermissionService.isSelf(userObject))
    );
  }

  static allowDelete(userObject) {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return (
      permissions.manageUsers.deleteAny ||
      (permissions.manageUsers.deleteOwn &&
        UserPermissionService.isSelf(userObject))
    );
  }
}

export default UserPermissionService;
