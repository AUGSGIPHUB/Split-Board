<template>
  <v-app>
    <v-main>
      <v-app-bar title="Split Key">
        <v-btn
          prepend-icon="mdi-home"
          :to="{ name: 'home' }"
          text="Home"
        ></v-btn>
        <v-btn
          prepend-icon="mdi-information"
          :to="{ name: 'about' }"
          text="About"
        ></v-btn>
        <v-btn
          prepend-icon="mdi-cart"
          :to="{ name: 'catalog' }"
          text="Catalog"
        ></v-btn>
        <v-btn
          prepend-icon="mdi-account-off"
          v-if="!useUsers.checkCurrentUser()"
          :to="{ name: 'login' }"
          text="Account"
        ></v-btn>
        <v-btn prepend-icon="mdi-account" v-else :to="{ name: 'login' }"
          >Account ({{ useUsers.currentUser?.Login }})</v-btn
        >
        <v-btn
          v-if="useUsers.currentUser?.Admin"
          prepend-icon="mdi-security"
          :to="{ name: 'adminka' }"
          text="Adminka"
        ></v-btn>
      </v-app-bar>
      <Popup :popup="popup" />
      <router-view />
    </v-main>
    <v-footer
      class="d-flex align-center justify-center flex-wrap flex-grow-1 py-3"
      style="max-height: 80px"
    >
      <div class="flex-1-0-100 text-center mt-2">
        Copyright (c) 2026 AUGSGIPHUB
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import Footer from "./components/Footer.vue";
import { usePopup } from "./composables/usePopup";
import { useAppStore } from "./stores/app";
import Popup from "./components/Popup.vue";
import { onMounted } from "vue";
import { useProductStore } from "./stores/useProductStore";

const useUsers = useAppStore();
const products = useProductStore();
const popup = usePopup();

onMounted(async () => {
  const response = await fetch("/default.json");
  if (!response.ok) throw new Error("default.json not found");

  const data = await response.json();

  useUsers.loadStoreData(data.users);
  products.loadStoreData(data.products);
  popup.showMessage(
    "Loaded " +
      data.products.products.length +
      " products and " +
      data.users.users.length +
      " users from default.json",
    "success",
  );
});
</script>
