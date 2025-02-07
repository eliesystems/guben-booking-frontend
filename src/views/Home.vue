<template>
  <AdminLayout>
    <v-row gutters>
      <v-col
        v-for="tenant in tenants"
        :key="tenant.id"
        cols="12"
        md="3"
        class="d-flex flex-column"
      >
        <v-card
          max-height="200px"
          outlined
          flat
          :color="tenant.id === currentTenant ? 'grey lighten-4' : ''"
          @click="selectTenant(tenant.id)"
          class="fill-height pt-7 rounded"
          ><!-- toDO - dynamically check for activ tenant -->
          <v-card-text class="primary--text">
            {{ tenant.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/Admin";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    AdminLayout,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      tenants: "tenants/tenants",
      currentTenant: "tenants/currentTenantId",
    }),
  },
  methods: {
    ...mapActions({
      select: "tenants/select",
    }),
    async selectTenant(tenantId) {
      await this.select(tenantId);
      await this.$router.push({ name: "bookings" });
    },
  },
};
</script>
