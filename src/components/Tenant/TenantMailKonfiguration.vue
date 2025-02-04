<template>
  <div>
    <v-row>
      <v-col class="">
        <v-card
          v-if="!!selectedTenant.genericMailTemplate"
          flat
          height="100"
        >
          <v-snackbar
            :timeout="-1"
            :value="true"
            absolute
            color="success"
            text
          >
            <v-icon left> mdi-check </v-icon>
            Es ist eine E-Mail-Vorlage hinterlegt. Um diese zu ändern,
            wenden Sie sich bitte an den Administrator.
          </v-snackbar>
        </v-card>
        <v-card v-else flat height="100">
          <v-snackbar
            :timeout="-1"
            :value="true"
            absolute
            color="error"
            text
          >
            <v-icon left> mdi-close </v-icon>
            Es ist keine E-Mail-Vorlage hinterlegt. Um eine
            E-Mail-Vorlage zu hinterlegen, wenden Sie sich bitte an
            den Administrator.
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          background-color="accent"
          filled
          dense
          label="E-Mail-Adresse"
          :rules="validationRules.mail"
          v-model="selectedTenant.noreplyMail"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          background-color="accent"
          filled
          dense
          label="Anzeigename"
          v-model="selectedTenant.noreplyDisplayName"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="">
        <v-text-field
          background-color="accent"
          filled
          dense
          label="SMTP-Server"
          v-model="selectedTenant.noreplyHost"
        ></v-text-field>
      </v-col>
      <v-col class="col-md-2">
        <v-text-field
          background-color="accent"
          filled
          dense
          label="Port"
          v-model="selectedTenant.noreplyPort"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="">
        <v-text-field
          background-color="accent"
          filled
          dense
          label="Benutzername"
          v-model="selectedTenant.noreplyUser"
        ></v-text-field>
      </v-col>
      <v-col class="">
        <v-text-field
          background-color="accent"
          filled
          dense
          label="Passwort"
          v-model="selectedTenant.noreplyPassword"
          :append-icon="
                      showNoreplyPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
          @click:append="showNoreplyPassword = !showNoreplyPassword"
          :type="showNoreplyPassword ? 'text' : 'password'"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h4 class="mb-2">E-Mail-Versandmethoden </h4>
      </v-col>
    </v-row>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header
          color="accent"
          expand-icon="mdi-menu-down"
          class="panel-header"
        >
          <template v-slot:default="{ open }">
            <v-row no-gutters align="center">
              <v-col cols="4">
                          <span class="text-subtitle-1">
                            SMTP
                          </span>
              </v-col>
              <v-col class="col-2">
                <v-fade-transition leave-absolute>
                  <div v-if="!open">
                    <v-icon
                      v-if="!selectedTenant.noreplyUseGraphApi"
                      color="success"
                    >mdi-check</v-icon
                    >
                    <span
                      v-if="!selectedTenant.noreplyUseGraphApi"
                      class="ml-2"
                    >Aktiv</span
                    >

                    <v-icon
                      v-if="selectedTenant.noreplyUseGraphApi"
                      color="error"
                    >mdi-close</v-icon
                    >
                    <span v-if="selectedTenant.noreplyUseGraphApi" class="ml-2"
                    >Inaktiv</span
                    >
                  </div>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-3">
          <v-row>
            <v-col class="col-12">
              <v-switch
                v-model="selectedTenant.noreplyUseGraphApi"
                color="primary"
                hide-details
                :true-value="false"
                :false-value="true"
                label="SMTP als E-Mail-Versandmethode aktivieren"
                class="mt-2"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="">
              <v-text-field
                background-color="accent"
                filled
                dense
                label="SMTP-Server"
                v-model="selectedTenant.noreplyHost"
              ></v-text-field>
            </v-col>
            <v-col class="col-md-2">
              <v-text-field
                background-color="accent"
                filled
                dense
                label="Port"
                v-model="selectedTenant.noreplyPort"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="">
              <v-text-field
                background-color="accent"
                filled
                dense
                hide-details
                label="Benutzername"
                v-model="selectedTenant.noreplyUser"
              ></v-text-field>
            </v-col>
            <v-col class="">
              <v-text-field
                background-color="accent"
                filled
                dense
                hide-details
                label="Passwort"
                v-model="selectedTenant.noreplyPassword"
                :append-icon="
                            showNoreplyPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                @click:append="
                            showNoreplyPassword = !showNoreplyPassword
                          "
                :type="showNoreplyPassword ? 'text' : 'password'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-switch
                v-model="selectedTenant.noreplyStarttls"
                color="primary"
                label="StartTLS aktivieren"
                hide-details
              ></v-switch>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          color="accent"
          expand-icon="mdi-menu-down"
          class="panel-header"
        >
          <template v-slot:default="{ open }">
            <v-row no-gutters align="center">
              <v-col cols="4">
                <span class="text-subtitle-1"> Graph Api (Office365) </span>
              </v-col>
              <v-col class="col-2">
                <v-fade-transition leave-absolute>
                  <div v-if="!open">
                    <v-icon
                      v-if="selectedTenant.noreplyUseGraphApi"
                      color="success"
                    >mdi-check</v-icon
                    >
                    <span v-if="selectedTenant.noreplyUseGraphApi" class="ml-2"
                    >Aktiv</span
                    >

                    <v-icon
                      v-if="!selectedTenant.noreplyUseGraphApi"
                      color="error"
                    >mdi-close</v-icon
                    >
                    <span
                      v-if="!selectedTenant.noreplyUseGraphApi"
                      class="ml-2"
                    >Inaktiv</span
                    >
                  </div>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-3">
          <v-row>
            <v-col class="col-12">
              <v-switch
                v-model="selectedTenant.noreplyUseGraphApi"
                color="primary"
                hide-details
                label="Graph Api als E-Mail-Versandmethode aktivieren"
                class="mt-2"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="">
              <v-text-field
                background-color="accent"
                filled
                dense
                label="Tenant ID"
                v-model="selectedTenant.noreplyGraphTenantId"
              ></v-text-field>
            </v-col>
            <v-col class="">
              <v-text-field
                background-color="accent"
                filled
                dense
                label="Client ID"
                v-model="selectedTenant.noreplyGraphClientId"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="">
              <v-text-field
                background-color="accent"
                filled
                dense
                label="Client Secret"
                v-model="selectedTenant.noreplyGraphClientSecret"
                :append-icon="
                            showClientSecret ? 'mdi-eye' : 'mdi-eye-off'
                          "
                @click:append="
                            showClientSecret = !showClientSecret
                          "
                :type="showClientSecret ? 'text' : 'password'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: "TenantMailKonfiguration",
  props: {
    tenant: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      showNoreplyPassword: false,
      showClientSecret: false,
      validationRules: {
        mail: [
          (v) => !!v || "Pflichtfeld",
          (v) => /.+@.+\..+/.test(v) || "Muss gültige Email-Adresse sein.",
        ],
      },
    }
  },
  computed: {
    selectedTenant: {
      get() {
        return this.tenant;
      },
    },
  },
}
</script>

<style scoped></style>
