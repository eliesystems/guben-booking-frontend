<template>
  <AdminLayout>
    <v-row no-gutters align="center" justify="center">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <p class="text-h4">Allgemein</p>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" justify="center">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <p class="text-subtitle-1">Kontaktangaben zu Ihrer Instanz</p>
      </v-col>
    </v-row>

    <!-- Kontakt -->
    <v-row no-gutters align="center" justify="center">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <v-card outlined class="mx-auto pa-2">
          <v-card-title class="text-h4 darkgrey--text ml-3">
            Kontakt
          </v-card-title>
          <v-card-subtitle class="mt-1 ml-3">
            Ändern Sie Ihre Kontaktdaten.
          </v-card-subtitle>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-col class="darkgrey--text col-11">
                <v-text-field
                  background-color="accent"
                  filled
                  dense
                  label="Kontaktadresse"
                  v-model="instance.contactAddress"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col class="darkgrey--text col-11">
                <v-text-field
                  background-color="accent"
                  filled
                  dense
                  label="Webseite"
                  v-model="instance.contactUrl"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Weiterleitungen -->
    <v-row no-gutters align="center" justify="center" class="mt-5">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <v-card outlined class="mx-auto pa-2">
          <v-card-title class="text-h4 darkgrey--text ml-3">
            Weiterleitungen
          </v-card-title>
          <v-card-subtitle class="mt-1 ml-3">
            Ändern Sie hier Ihre Weiterleitung zum Datenschutz und zum Impressum.
          </v-card-subtitle>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-col class="darkgrey--text col-11">
                <v-text-field
                  background-color="accent"
                  filled
                  dense
                  label="Link zum Datenschutz"
                  v-model="instance.dataProtectionUrl"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col class="darkgrey--text col-11">
                <v-text-field
                  background-color="accent"
                  filled
                  dense
                  label="Link zum Impressum"
                  v-model="instance.legalNoticeUrl"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mail-Konfiguration -->
    <v-row no-gutters align="center" justify="center" class="mt-10">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <p class="text-h4">Mail-Konfiguration</p>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" justify="center">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <p class="text-subtitle-1">E-Mail-Konfiguration zu Ihrer Instanz</p>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" justify="center" class="mt-5">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <v-card outlined class="mx-auto pa-2">
          <v-card-title class="text-h4 darkgrey--text ml-3">
            E-Mail
          </v-card-title>
          <v-card-subtitle class="mt-1 ml-3">
            Ändern Sie hier die E-Mail-Konfiguration zu Ihrer Instanz.
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col class="col-12">
                <v-switch
                  v-model="instance.mailEnabled"
                  color="primary"
                  hide-details
                  label="E-Mail-Versand aktivieren"
                  class="mt-2"
                ></v-switch>
              </v-col>
            </v-row>
            <MailKonfiguration
              v-if="instance.mailEnabled"
              :mail-config="instanceMailConfig"
              @update="updateMailConfig"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Besitzer -->
    <v-row no-gutters align="center" justify="center" class="mt-10">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <p class="text-h4">Besitzer</p>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" justify="center">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <p class="text-subtitle-1">Besitzer Ihrer Instanz</p>
      </v-col>
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <v-autocomplete
          hide-details
          placeholder="Besitzer Hinzufügen"
          clearable
          v-model="selectedOwner"
          :items="availableUserIds"
        >
          <template v-slot:append-outer>
            <v-btn small color="primary" @click="addOwner">
              <v-icon left> mdi-plus</v-icon>
              Hinzufügen
            </v-btn>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" justify="center" class="mt-5">
      <v-col class="mx-xs-auto" cols="12" sm="10">
        <v-card outlined class="mx-auto pa-2">
          <v-list dense>
              <v-list-item
                v-for="(item, i) in instance.ownerUserIds"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon> mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{item}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="space-between" align="center">
      <v-col class="col-auto text-right mt-2">
        <v-btn
          x-large
          color="primary"
          @click="fetchInstance"
        >
          Zurücksetzen
        </v-btn>
      </v-col>
      <v-col class="col-auto text-right mt-2">
        <v-btn
          x-large
          color="primary"
          @click="updateInstance"
        >
          Änderungen speichern
        </v-btn>
      </v-col>
    </v-row>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/Admin.vue";
import ApiInstanceService from "@/services/api/ApiInstanceService";
import MailKonfiguration from "@/components/Tenant/MailKonfiguration.vue";

export default {
  name: "Instances",
  components: {MailKonfiguration, AdminLayout},
  data() {
    return {
      instance: {},
      isLoading: false,
      addressPanel: false,
      urlPanel: false,
      dataProtectionPanel: false,
      legalNoticePanel: false,
      tempContactAddress: "",
      tempContactUrl: "",
      tempDataProtectionUrl: "",
      tempLegalNoticeUrl: "",
      selectedOwner: null,
      availableUserIds: ["test.testperson@e-c-crew.de"], //toDo - fill this...
    }
  },
  methods: {
    updateMailConfig(newConfig){
      this.instance.noreplyDisplayName = newConfig.noreplyDisplayName;
      this.instance.noreplyMail = newConfig.noreplyMail;
      this.instance.noreplyDisplayName = newConfig.noreplyDisplayName;
      this.instance.noreplyHost = newConfig.noreplyHost;
      this.instance.noreplyPort = newConfig.noreplyPort;
      this.instance.noreplyUser = newConfig.noreplyUser;
      this.instance.noreplyPassword = newConfig.noreplyPassword;
      this.instance.noreplyUseGraphApi = newConfig.noreplyUseGraphApi;
      this.instance.noreplyStarttls = newConfig.noreplyStarttls;
      this.instance.noreplyGraphTenantId = newConfig.noreplyGraphTenantId;
      this.instance.noreplyGraphClientId = newConfig.noreplyGraphClientId;
      this.instance.noreplyGraphClientSecret = newConfig.noreplyGraphClientSecret;
    },
    addOwner(){
      this.instance.ownerUserIds.push(this.selectedOwner);
    },
    async updateInstance() {
      console.log("try to update Instance...");
      this.instance = await ApiInstanceService.updateInstance(this.instance);
    },
    async fetchInstance() {
      this.instance =  await ApiInstanceService.getInstance();
    }
  },
  computed: {
    instanceMailConfig: {
      get() {
        return {
          mailTemplate: this.instance.mailTemplate,
          noreplyMail: this.instance.noreplyMail,
          noreplyDisplayName: this.instance.noreplyDisplayName,
          noreplyHost: this.instance.noreplyHost,
          noreplyPort: this.instance.noreplyPort,
          noreplyUser: this.instance.noreplyUser,
          noreplyPassword: this.instance.noreplyPassword,
          noreplyUseGraphApi: this.instance.noreplyUseGraphApi,
          noreplyStarttls: this.instance.noreplyStarttls,
          noreplyGraphTenantId: this.instance.noreplyGraphTenantId,
          noreplyGraphClientId: this.instance.noreplyGraphClientId,
          noreplyGraphClientSecret: this.instance.noreplyGraphClientSecret,
        };
      },
    },
  },
  async mounted() {
    await this.fetchInstance();
  }
}
</script>

<style scoped></style>
