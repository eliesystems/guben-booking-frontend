import store from "@/store";

export default {
  login(tenant, id, password) {
    const body = {
      id: id,
      password: password,
    };

    return ApiClient.post("auth/signin", body, {
      withCredentials: true,
    });
  },
  register(tenant, id, firstName, lastName, company, password) {
    const body = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      company: company,
      password: password,
    };

    return ApiClient.post("auth/signup", body, {
      withCredentials: true,
    }).then(async (response) => {
      return response;
    });
  },
  logout() {
    return ApiClient.get("auth/signout", {
      withCredentials: true,
    });
  },
  me(tenant, populatePermissions) {
    return ApiClient.get(
      `auth/me?populatePermissions=${
        populatePermissions ? 1 : 0
      }`,
      { withCredentials: true }
    );
  },
  resetPassword(id, password, tenantId) {
    const body = {
      id: id,
      password: password,
    };

    return ApiClient.post("auth/resetpassword", body, {
      withCredentials: true,
    });
  },
  //request password reset
  requestPasswordReset(email) {
    const body = {
      email: email,
    };

    return ApiClient.post(
      `auth/${store.getters["tenants/currentTenant"].id}/reset`,
      body,
      { withCredentials: true }
    );
  },
};
