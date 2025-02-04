<template>
  <AdminLayout>
    <v-row gutters align="center" justify="center">
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
          :elevation="tenant.id === currentTenant ? 0 : 1"
          :color="tenant.id === currentTenant ? 'grey lighten-4' : ''"
          @click="selectTenant(tenant.id)"
          ><!-- toDO - dynamically check for activ tenant -->
          <v-card-title class="primary--text">
            {{ tenant.name }}
          </v-card-title>
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
      currentTenant: "tenants/currentTenant",
    }),
  },
  methods: {
    ...mapActions({
      select: "tenants/select",
    }),
    selectTenant(tenantId) {
      this.select(tenantId);
    },
  },
};
</script>
