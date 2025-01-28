<template>
  <v-container fill-height fluid>
    <v-row v-if="bookingId && !noBooking" align="center" justify="center">
      <v-col class="col-12 text-center"
        ><v-icon size="75" color="secondary"
          >mdi-account-credit-card-outline</v-icon
        ><v-icon size="75" color="primary">mdi-arrow-right-bold</v-icon></v-col
      >
      <v-col class="text-center text-h5">
        Sie werden nun zur Zahlungsseite weitergeleitet...
      </v-col>
    </v-row>
    <v-row v-if="noBooking" align="center" justify="center">
      <v-col class="col-12 text-center"
        ><v-icon size="75" color="secondary"
          >mdi-alert-circle-outline</v-icon
        ></v-col
      >
      <v-col class="text-center text-h5">
        {{ errorMessage[errorCode] || "Es ist ein Fehler aufgetreten" }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiPaymentService from "@/services/api/ApiPaymentService";

export default {
  name: "PaymentRedirect",
  data() {
    return {
      bookingId: undefined,
      noBooking: false,
      inBookingTenant: null,
      errorMessage: {
        0: "Die von Ihnen angeforderte Buchung konnte nicht gefunden werden.",
        1: "Die von Ihnen angeforderte Buchung ist nicht freigegeben.",
        2: "Die von Ihnen angeforderte Buchung ist bereits bezahlt.",
      },
      errorCode: null,
    };
  },
  created() {
    if (this.$route.query.id && this.$route.query.tenant) {
      this.bookingId = this.$route.query.id;
      this.inBookingTenant = this.$route.query.tenant;
      ApiPaymentService.payments(this.bookingId, this.inBookingTenant)
        .then((res) => {
          const paymentUrl = res.data?.paymentData;
          if (paymentUrl) {
            window.location.href = paymentUrl;
          }
        })
        .catch((err) => {
          this.errorCode = err.response.data.code;
          this.noBooking = true;
        });
    } else {
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style scoped></style>
