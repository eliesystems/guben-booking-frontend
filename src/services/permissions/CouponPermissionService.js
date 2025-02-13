import user from "@/store/modules/user";
import store from "@/store";

class CouponPermissionService {
  static isOwner(coupon) {
    return coupon.ownerUserId === user.state.data.user.id;
  }

  static allowCreate() {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    if(permissions.isOwner) return true;

    return permissions.manageBookings.create;
  }

  static allowUpdate(coupon) {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    if(permissions.isOwner) return true;

    return (
      permissions.manageBookings.updateAny ||
      (permissions.manageBookings.updateOwn &&
        CouponPermissionService.isOwner(coupon))
    );
  }

  static allowDelete(coupon) {
    const tenantId = store.getters["tenants/currentTenantId"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    if(permissions.isOwner) return true;

    return (
      permissions.manageBookings.deleteAny ||
      (permissions.manageBookings.deleteOwn &&
        CouponPermissionService.isOwner(coupon))
    );
  }
}

export default CouponPermissionService;
