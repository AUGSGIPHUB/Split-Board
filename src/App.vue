<template>
  <v-app>
    <v-app-bar :title="'Split Key'">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-md-none"
      ></v-app-bar-nav-icon>

      <template v-slot:append>
        <div class="d-none d-md-flex">
          <v-btn
            :to="{ name: 'home' }"
            prepend-icon="mdi-home"
            text="Home"
          ></v-btn>
          <v-btn
            :to="{ name: 'about' }"
            prepend-icon="mdi-information"
            text="About"
          ></v-btn>
          <v-btn
            :to="{ name: 'catalog' }"
            prepend-icon="mdi-cart"
            text="Catalog"
          ></v-btn>
          <v-btn
            v-if="!useUsers.checkCurrentUser()"
            :to="{ name: 'login' }"
            prepend-icon="mdi-account-off"
            text="Account"
          ></v-btn>
          <v-btn v-else :to="{ name: 'login' }" prepend-icon="mdi-account">
            Account ({{ useUsers.currentUser?.Login }})
          </v-btn>
          <v-btn
            v-if="useUsers.currentUser?.Admin"
            :to="{ name: 'adminka' }"
            prepend-icon="mdi-security"
            text="Adminka"
          ></v-btn>
        </div>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="left"
      class="d-md-none"
    >
      <v-list>
        <v-list-item
          :to="{ name: 'home' }"
          prepend-icon="mdi-home"
          title="Home"
        ></v-list-item>
        <v-list-item
          :to="{ name: 'about' }"
          prepend-icon="mdi-information"
          title="About"
        ></v-list-item>
        <v-list-item
          :to="{ name: 'catalog' }"
          prepend-icon="mdi-cart"
          title="Catalog"
        ></v-list-item>
        <v-list-item
          v-if="!useUsers.checkCurrentUser()"
          :to="{ name: 'login' }"
          prepend-icon="mdi-account-off"
          title="Account"
        ></v-list-item>
        <v-list-item
          v-else
          :to="{ name: 'login' }"
          prepend-icon="mdi-account"
          :title="'Account (' + useUsers.currentUser?.Login + ')'"
        ></v-list-item>
        <v-list-item
          v-if="useUsers.currentUser?.Admin"
          :to="{ name: 'adminka' }"
          prepend-icon="mdi-security"
          title="Adminka"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Popup :popup="popup" />
      <router-view />
    </v-main>

    <v-footer
      class="d-flex align-center justify-center flex-wrap py-3"
      style="max-height: 80px"
    >
      <div class="flex-1-0-100 text-center mt-2">
        Copyright (c) 2026 AUGSGIPHUB
      </div>
      <div class="text-center">
        <v-btn
          variant="text"
          icon="mdi-github"
          href="https://github.com/AUGSGIPHUB/split-keyboard-shop"
          target="_blank"
          rel="noopener noreferrer"
        >
        </v-btn>
        <span class="ml-2">Source code</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { usePopup } from "./composables/usePopup";
import { useAppStore } from "./stores/app";
import Popup from "./components/Popup.vue";
import { onMounted } from "vue";
import { useProductStore } from "./stores/useProductStore";

const drawer = ref(false);
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
