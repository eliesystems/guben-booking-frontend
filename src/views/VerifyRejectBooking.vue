<template>
  <v-container
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    "
  >
    <v-card
      class="pa-4 rounded-sm"
      style="overflow: hidden; width: 100%; min-width: 350px; max-width: 500px"
    >
      <v-card-text class="text-center" v-if="fetching">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
      </v-card-text>
      <v-card-text class="text-center" v-if="!fetching && rejectSuccess">
        <v-icon size="45px" color="success">mdi-check</v-icon>
        <p class="text-h6 font-weight-bold">Stornierung bestätigt</p>
        <p>
          Ihre Stornierung wurde erfolgreich bestätigt. Sie erhalten in Kürze
          eine Bestätigung per E-Mail.
        </p>
      </v-card-text>
      <v-card-text class="text-center" v-if="!fetching && !rejectSuccess">
        <v-icon size="45px" color="error">mdi-close</v-icon>
        <p class="text-h6 font-weight-bold">Stornierung nicht möglich</p>
        <p>
          Die Stornerung konnte nicht durchgeführt werden. Bitte versuchen Sie
          es erneut oder kontaktieren Sie Ihren Ansprechpartner.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ApiBookingService from "@/services/api/ApiBookingService";

export default {
  name: "RequestRejectBooking",
  props: {
    tenantId: {
      type: String,
    },
  },
  computed: {},
  data() {
    return {
      bookingNumber: this.$route.query.id,
      hookId: this.$route.query.hookId,
      rejectSuccess: false,
      fetching: false,
    };
  },
  methods: {
    async releaseRejectHook() {
      try {
        this.fetching = true;

        const response = await ApiBookingService.releaseBookingHook(
          this.bookingNumber,
          this.tenantId,
          this.hookId
        );

        if (response.status === 200) {
          this.rejectSuccess = true;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.fetching = false;
      }
    },
  },
  async mounted() {
    await this.releaseRejectHook();
  },
};
</script>

<style scoped></style>
