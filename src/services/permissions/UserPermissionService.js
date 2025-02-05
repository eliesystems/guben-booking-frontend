import user from "@/store/modules/user";
import store from "@/store";

class UserPermissionService {
  static isSelf(userObject) {
    return userObject.id === user.state.data.user.id;
  }

  static allowCreate() {
    return true;
  }

  static allowUpdate(userObject) {
    return true;
  }

  static allowDelete(userObject) {
    return true;
  }
}

export default UserPermissionService;
