<template>
  <AdminLayout>
    <v-row gutters align="center" justify="center">
      <v-col v-for="tenant in tenants" :key="tenant" cols="12" md="3" class="d-flex flex-column">
        <v-card
          max-height="200px"
          outlined
          :elevation="tenant.id === 'diz'? 0 : 1"
          :color="tenant.id === 'diz'? 'grey lighten-4' : ''"
          @click="openTenant(tenant.id)"
        ><!-- toDO - dynamically check for activ tenant -->
          <v-card-title class='primary--text'>
            {{tenant.name}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/Admin";
import ApiTenantService from "@/services/api/ApiTenantService";

export default {
  name: "HomeView",
  components: {
    AdminLayout,
  },
  data() {
    return {
      loading: true,
      tenants: [],
    };
  },
  methods: {
    fetchTenants() {
      ApiTenantService.getTenants(true).then((response) => {
        this.tenants = response.data;
      });
    },
    openTenant(tenantId){
      //toDo - add working routes
      console.log("want to go to " + tenantId);
      this.$router.push("/admin/dashboard");
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000);
    this.fetchTenants();
  }
};
</script>
