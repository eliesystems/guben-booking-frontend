<template>
  <nav id="navbar">
    <v-app-bar
      flat
      app
      clipped-left
      :color="isProduction !== 'true' ? 'green' : ''"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img
        alt="Smart City Booking"
        src="@/assets/app-logo.png"
        style="max-height: 50px; width: auto; max-width: 250px"
      />
      <v-spacer></v-spacer>
      <span v-if="isProduction !== 'true'" class="font-weight-bold"
        >DIES IST EIN TESTSYSTEM</span
      >
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="mr-1" @click="darkMode">
            <v-icon>
              {{
                $vuetify.theme.dark
                  ? "mdi-white-balance-sunny"
                  : "mdi-moon-waxing-crescent"
              }}
            </v-icon>
          </v-btn>
        </template>
        <span>Theme wechseln</span>
      </v-tooltip>
      <v-menu offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                <v-icon size="25">mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <span>Profil Einstellungen</span>
          </v-tooltip>
        </template>
        <v-list dense>
          <v-list-item inactive>
            <v-list-item-title>{{
              user.firstName ? user.firstName : "User Name"
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in profileItems"
              :key="i"
              :to="item.link"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title :href="item.link">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi-logout </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="logout">Abmelden</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.mdAndUp"
      id="nav"
    >
      <div class="v-navigation-drawer__content">
        <v-list dense nav class="py-0" rounded>
          <v-select
            v-model="currentTenant"
            color="primary"
            :items="tenants"
            item-text="name"
            item-value="id"
            solo
            flat
            class="subtitle-1 font-weight-medium primary--text"
          >
            <template v-slot:prepend>
              <v-icon class="primary v-btn--rounded" color="white"
                >mdi-home-account</v-icon
              >
            </template>
            <template v-slot:prepend-item>
              <v-list-item class="my-2"> Mandant auswählen: </v-list-item>
              <v-divider></v-divider>
            </template>
            <template v-slot:selection="{ item }">
              <span class="subtitle-1 font-weight-medium primary--text">{{
                item.name
              }}</span>
            </template>
          </v-select>

          <v-divider class="mt-2 mb-2"></v-divider>
          <div v-for="parentItem in navItems" :key="parentItem.header">
            <v-subheader
              v-if="parentItem.header"
              class="pl-3 py-4 subtitle-1 text--black"
              >{{ parentItem.header }}
            </v-subheader>
            <v-list-item
              v-for="item in parentItem.pages"
              :key="item.title"
              link
              class="my-2"
              :to="item.link"
              exact
              active-class="active-item secondary"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <template v-if="false">
                  @TODO: Add to instead of href with rout name instead of path
                </template>
                <v-list-item-title
                  :href="item.link"
                  target="_blank"
                  class="font-weight-medium subtitle-2"
                  >{{ item.title }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2 mb-2"></v-divider>
          </div>
        </v-list>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ToastService from "@/services/ToastService";
import ApiAuthService from "@/services/api/ApiAuthService";
import ApiTenantService from "@/services/api/ApiTenantService";

export default {
  data: () => ({
    drawer: false,
    isProduction: process.env.VUE_APP_IS_PRODUCTION,
    profileItems: [
      {
        title: "Einstellungen",
        link: "einstellungen",
        icon: "mdi-cog-outline",
      },
    ],
    items: [
      {
        header: null,
        pages: [
          {
            title: "Übersicht",
            link: "dashboard",
            icon: "mdi-view-dashboard-outline",
          },
        ],
      },
      {
        header: "Verwaltung",
        pages: [
          {
            title: "Mandanten",
            link: "mandanten",
            icon: "mdi-domain",
            interfaceName: "tenants",
          },
          {
            title: "Benutzer",
            link: "benutzer",
            icon: "mdi-account-outline",
            interfaceName: "users",
          },
          {
            title: "Rollen",
            link: "rollen",
            icon: "mdi-account-group-outline",
            interfaceName: "roles",
          },
        ],
      },
      {
        header: "Buchungsplattform",
        pages: [
          {
            title: "Buchungen",
            link: "buchungen",
            icon: "mdi-book-outline",
            interfaceName: "bookings",
          },
          {
            title: "Gutscheine",
            link: "gutscheine",
            icon: "mdi-ticket-percent-outline",
            interfaceName: "coupons",
          },
          {
            title: "Veranstaltungsorte",
            link: "veranstaltungsorte",
            icon: "mdi-map-marker-outline",
            interfaceName: "locations",
          },
          {
            title: "Räume",
            link: "raeume",
            icon: "mdi-door",
            interfaceName: "rooms",
          },
          {
            title: "Ressourcen",
            link: "ressourcen",
            icon: "mdi-hammer-wrench",
            interfaceName: "resources",
          },
          {
            title: "Tickets",
            link: "tickets",
            icon: "mdi-ticket",
            interfaceName: "tickets",
          },
          {
            title: "Veranstaltungen",
            link: "veranstaltungen",
            icon: "mdi-calendar",
            interfaceName: "events",
          },
        ],
      },
      {
        header: null,
        pages: [
          {
            title: "Instanz verwalten",
            link: "instanz",
            icon: "mdi-home-edit-outline",
            interfaceName: "events", //toDo - add interfaceName for instances
          },
        ],
      },
      {
        header: null,
        pages: [
          {
            title: "Einstellungen",
            link: "einstellungen",
            icon: "mdi-cog-outline",
            interfaceName: "settings",
            showAlways: true,
          },
        ],
      },
    ],
    //currentTenant: "",
    tenants: [],
  }),
  components: {},
  methods: {
    ...mapActions({
      addToast: "toasts/add",
      deleteUser: "user/delete",
      selectTenant: "tenants/select",
    }),
    logout() {
      ApiAuthService.logout()
        .then(() => {
          this.addToast(ToastService.createToast("logout.success", "success"));
          this.$router.push({ name: "login" });
        })
        .finally(() => {
          this.deleteUser();
        });
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    fetchTenants() {
      ApiTenantService.getTenants(true).then((response) => {
        this.tenants = response.data;
      });
    },
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      tenant: "tenants/tenant",
      isAuthorized: "user/isAuthorized",
      getCurrentTenant: "tenants/currentTenant",
    }),
    currentTenant: {
      get: function () {
        console.log(this.getCurrentTenant)
        return this.getCurrentTenant;
      },
      set: function (newValue) {
        this.selectTenant(newValue);
      },
    },
    navItems() {
      // reduce items to only those that are allowed for the current user
      return this.items
        .map((item) => {
          return {
            ...item,
            pages: item.pages.filter((page) => {
              if (page.showAlways) {
                return true;
              }
              return this.isAuthorized(page.interfaceName);
            }),
          };
        })
        .filter((item) => {
          return item.pages.length > 0;
        });
    },
  },
  mounted() {
    this.drawer = !this.$vuetify.breakpoint.mdAndDown;
    this.fetchTenants();
  },
};
</script>
<style>
.active-item {
  color: black !important;
}
</style>
