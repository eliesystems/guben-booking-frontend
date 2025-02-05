import user from "@/store/modules/user";
import store from "@/store";

class BookingPermissionService {
  static isOwner(booking) {
    return booking.assignedUserId === user.state.data.user.id;
  }

  static allowCreate() {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return permissions.manageBookings.create;
  }

  static allowUpdate(booking) {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return (
      permissions.manageBookings.updateAny ||
      (permissions.manageBookings.updateOwn &&
        BookingPermissionService.isOwner(booking))
    );
  }

  static allowDelete(booking) {
    const tenantId = store.getters["tenants/currentTenant"];
    const permissions = user.state.data.permissions.find(
      (p) => p.tenantId === tenantId
    );
    if (!permissions) return false;
    return (
      permissions.manageBookings.deleteAny ||
      (permissions.manageBookings.deleteOwn &&
        BookingPermissionService.isOwner(booking))
    );
  }
}

export default BookingPermissionService;
