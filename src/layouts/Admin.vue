<template>
  <div class="content">
    <Navbar />
    <v-container fluid>
      <h1 class="text-h5 mb-2">{{ this.$route.meta.title }}</h1>
      <slot />
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import ApiTenantService from "@/services/api/ApiTenantService";
import { mapActions } from "vuex";

export default {
  props: {
    data: Object,
  },
  components: {
    Navbar,
  },

  methods: {
    ...mapActions({
      updateTenant: "tenants/update",
    }),
    async fetchTenants() {
      try {
        await this.updateTenant(await ApiTenantService.getTenants(true));
      } catch (error) {
        console.error(error);
      }
    },
  },

  async mounted() {
    await this.fetchTenants();
  },
};
</script>

<style scoped></style>
