<template>
  <v-img
    src="https://i.rtings.com/assets/pages/ifvcOk4a/best-mechanical-keyboards-20260114-medium.jpg?format=auto"
    height="600"
    cover
    class="align-center"
  >
    <v-container class="fill-height">
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" md="8" class="text-center">
          <v-sheet color="#FFFFFFE0" class="pa-10 rounded-lg">
            <h1 class="text-h2 font-weight-bold mb-4">
              Discover Your Perfect Keyboard
            </h1>
            <p class="text-h6 mb-6">
              Mechanical, ergonomic, split – we have it all
            </p>
            <v-btn
              :to="{ name: 'catalog' }"
              color="orange-darken-2"
              size="large"
              variant="elevated"
            >
              Shop Now
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-img>

  <v-container class="my-12">
    <v-row align="center">
      <v-col cols="12" md="6">
        <v-img
          src="https://ae01.alicdn.com/kf/S042602697a484f8faea8530463382f7fw.jpg"
          rounded="lg"
          elevation="4"
          aspect-ratio="1"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-chip color="red" text-color="white" class="mb-4" label>
          HOT OFFER
        </v-chip>
        <h2 class="text-h3 mb-4">CORNE V4 Split Keyboard</h2>
        <p class="text-body-1 mb-6">
          Super mega smart split keyboard for everyone. A-COIN battery
          hollow-out/Filled version: battery not included should prepare extra,
          because the Coin batteries are usually not accepted by express
          packages.
        </p>
        <div class="d-flex align-center mb-6">
          <span class="text-h4 font-weight-bold text-red mr-4">
            {{ currencyFormatter.format(60) }}
          </span>
          <span class="text-h5 text-decoration-line-through text-grey">
            {{ currencyFormatter.format(70) }}
          </span>
        </div>
        <v-btn
          :to="{ name: 'product-detail', params: { id: 13 } }"
          color="primary"
          size="x-large"
          prepend-icon="mdi-cart"
        >
          Buy Now
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- <v-container class="my-12">
    <h2 class="text-h3 text-center mb-8">Why Choose Us?</h2>
    <v-row>
      <v-col v-for="benefit in benefits" :key="benefit.title" cols="12" md="4">
        <v-card variant="flat" class="text-center pa-6" elevation="0">
          <v-icon :icon="benefit.icon" size="48" color="primary" class="mb-4" />
          <h3 class="text-h5 font-weight-bold mb-2">{{ benefit.title }}</h3>
          <p class="text-body-1 text-grey">{{ benefit.text }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container> -->

  <v-img
    src="https://i.rtings.com/assets/pages/LJ8QxpyZ/best-wireless-keyboards-20260120-medium.jpg?format=auto"
    height="400"
    cover
    class="align-center"
  >
    <v-container class="fill-height">
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" md="8" class="text-center">
          <v-sheet color="#FFFFFFE0" class="pa-8 rounded-lg">
            <h2 class="text-h3 font-weight-bold mb-3">Simplify Your Life</h2>
            <p class="text-h6 mb-5">
              Wireless, silent, and ultra-durable – upgrade your setup today
            </p>
            <v-btn
              :to="{ name: 'catalog' }"
              color="orange-darken-2"
              size="large"
              variant="elevated"
            >
              Explore Collection
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-img>

  <v-container class="my-12">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card
          variant="flat"
          class="pa-6 text-center"
          color="grey-lighten-4"
          rounded="xl"
        >
          <h2 class="text-h4 mb-2">Stay in Touch</h2>
          <p class="text-body-1 mb-6">
            Get exclusive offers and new releases first
          </p>
          <v-form @submit.prevent="subscribe">
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field
                  v-model="email"
                  label="Email address"
                  type="email"
                  variant="outlined"
                  hide-details
                  required
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-btn type="submit" color="primary" block size="large"
                  >Subscribe</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { currencyFormatter } from "@/tools/formatters";
import { usePopup } from "@/composables/usePopup";

const email = ref<string>("");
const popup = usePopup();

const subscribe = () => {
  if (email.value) {
    popup.showMessage("Thank you!", "success");
    email.value = "";
  }
};

const benefits = [
  {
    icon: "mdi-keyboard",
    title: "Premium Quality",
    text: "Only authentic switches and durable materials for years of typing comfort.",
  },
  {
    icon: "mdi-truck-fast",
    title: "Fast Shipping",
    text: "Free express delivery on orders over $50. Worldwide shipping available.",
  },
  {
    icon: "mdi-shield-check",
    title: "2-Year Warranty",
    text: "All keyboards come with a hassle-free warranty and 30-day returns.",
  },
];
</script>

<style scoped>
/* Можно добавить минимальные правки, если нужно */
</style>
