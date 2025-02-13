import user from "@/store/modules/user";
import store from "@/store";

class BookablePermissionService {
  static isOwner(bookable) {
    return (
      bookable.ownerUserId === user.state.data.user.id
    );
  }

  static allowCreate() {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    if(permissions.isOwner) return true;

    return permissions.manageBookables.create;
  }

  static allowUpdate(bookable) {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    if(permissions.isOwner) return true;

    return (
      permissions.manageBookables.updateAny ||
      (permissions.manageBookables.updateOwn &&
        BookablePermissionService.isOwner(bookable))
    );
  }

  static allowDelete(bookable) {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    if(permissions.isOwner) return true;

    return (
      permissions.manageBookables.deleteAny ||
      (permissions.manageBookables.deleteOwn &&
        BookablePermissionService.isOwner(bookable))
    );
  }
}

export default BookablePermissionService;
