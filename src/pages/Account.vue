<template>
  <v-container class="d-flex align-center justify-center flex-column">
    <!-- <v-container class="w-100 justify-around"> -->
    <h2>Account {{ useUsers.currentUser?.Login }}</h2>

    <div>
      <v-btn
        prepend-icon="mdi-account-check"
        v-show="!useUsers.checkCurrentUser()"
        :to="{ name: 'login' }"
        text="Sign in"
      ></v-btn>
      <v-btn
        prepend-icon="mdi-account-plus"
        v-show="!useUsers.checkCurrentUser()"
        :to="{ name: 'registration' }"
        text="Sign up"
      ></v-btn>

      <v-btn
        prepend-icon="mdi-card-account-details"
        v-show="useUsers.checkCurrentUser()"
        @click="pushToProfile()"
        >Profile</v-btn
      >
      <v-btn
        prepend-icon="mdi-cart"
        v-show="useUsers.checkCurrentUser()"
        @click="pushToCart()"
        >Cart</v-btn
      >
      <v-btn
        prepend-icon="mdi-heart"
        v-show="useUsers.checkCurrentUser()"
        @click="
          router.push({
            name: 'user-favorite',
            params: { login: useUsers.currentUser?.Login },
          })
        "
        >Favorite</v-btn
      >
      <v-btn
        prepend-icon="mdi-exit-to-app"
        v-show="useUsers.checkCurrentUser()"
        @click="signOut()"
        color="red-darken-4"
        >Sign out</v-btn
      >
    </div>
    <router-view />
  </v-container>
</template>

<script setup lang="ts">
import router from "@/router";
import { useAppStore } from "@/stores/app";
import { onMounted } from "vue";

const useUsers = useAppStore();

function signOut() {
  useUsers.logout();
  router.push({
    name: "login",
  });
}

function pushToCart() {
  if (!useUsers.checkCurrentUser()) return;

  router.push({
    name: "user-cart",
    params: { login: useUsers.currentUser?.Login },
  });
}

//TODO remove dublication
function pushToProfile() {
  if (!useUsers.checkCurrentUser()) return;

  router.push({
    name: "user-account",
    params: { login: useUsers.currentUser?.Login },
  });
}
</script>
