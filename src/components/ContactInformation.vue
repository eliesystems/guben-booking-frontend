<script>
import { mapGetters } from "vuex";

export default {
  name: "ContactInformation",
  data() {
    return {};
  },

  methods: {
    sanitizeUrl(url) {
      return url.replace(/(^\w+:|^)\/\//, "");
    },
  },

  computed: {
    ...mapGetters({
      instance: "instance/instance",
    }),
  },
};
</script>

<template>
  <p class="text-left mt-5">
    <small v-if="instance?.contactAddress">
      Dieser Service wird bereitgestellt vom {{ instance?.contactAddress }}.
      Weitere Informationen und Kontaktmöglichkeiten finden Sie unter
      <a
        :href="'https://' + sanitizeUrl(instance?.contactUrl)"
        target="_blank"
        >{{ sanitizeUrl(instance?.contactUrl) }}</a
      >.</small
    >
  </p>
</template>

<style scoped></style>
