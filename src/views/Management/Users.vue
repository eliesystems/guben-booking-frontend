<template>
  <AdminLayout>
    <v-row gutters align="stretch" class="mb-16">
      <v-col cols="12" class="mx-xs-auto d-flex flex-column" height="100%">
        <v-data-table
          :headers="headers"
          :items="members"
          :footer-props="{
            'items-per-page-all-text': 'Alle',
            'items-per-page-text': 'Benutzer pro Seite',
          }"
          class="accent elevation-1"
          fixed-header
          :loading="loading"
          loading-text="Daten werden geladen..."
        >
          <template v-slot:item.roles="{ item }">
            <v-chip-group>
              <v-chip small v-for="(roleId, i) in item.roles" :key="i">{{
                getRoleById(roleId)?.name
              }}</v-chip>
            </v-chip-group>
          </template>
          <template v-slot:item._isOwner="{ item }">
            <v-checkbox readonly v-model="item._isOwner"></v-checkbox>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/Admin.vue";
import { mapActions, mapGetters } from "vuex";
import ApiUsersService from "@/services/api/ApiUsersService";
import ApiRolesService from "@/services/api/ApiRolesService";

export default {
  components: {
    AdminLayout,
  },
  data() {
    return {
      api: {
        users: [],
        roles: [],
      },
      headers: [
        {
          text: "Benutzer",
          align: "start",
          value: "userId",
        },
        {
          text: "Rollen",
          align: "start",
          value: "roles",
        },
        {
          text: "Besitzer",
          align: "start",
          value: "_isOwner",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      loading: "loading/isLoading",
      tenantId: "tenants/currentTenantId",
      tenant: "tenants/currentTenant",
    }),
    members() {
      const members = this.tenant.users.map((userRef) => ({
        ...userRef,
        _isOwner: this.tenant.ownerUserIds.includes(userRef.userId),
      }));

      // There might be users marked as owners that do not have any roles assigned and therefore do not occur in tenant user references.
      const shadowMembers = this.tenant.ownerUserIds
        .filter(
          (userId) =>
            !this.tenant.users.some((userRef) => userRef.userId === userId)
        )
        .map((userId) => ({
          userId: userId,
          roles: [],
          _isOwner: true,
        }));

      return [...members, ...shadowMembers];
    },
  },
  methods: {
    ...mapActions({
      startLoading: "loading/start",
      stopLoading: "loading/stop",
    }),
    async fetchRoles() {
      const response = await ApiRolesService.getRoles(this.currentTenantId);
      this.api.roles = response.data;
    },

    async fetchUsers() {
      await this.startLoading("fetch-users");

      const response = await ApiUsersService.getUsers();
      this.api.users = response.data;

      await this.stopLoading("fetch-users");
    },
    getRoleById(roleId) {
      const role = this.api.roles.find((role) => role.id === roleId);
      return role;
    },
  },
  async created() {
    await this.fetchRoles();
    await this.fetchUsers();
  },
};
</script>

<style scoped></style>
