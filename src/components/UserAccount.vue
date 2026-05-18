<template>
  <v-container class="d-flex align-center justify-center">
    <v-card class="pa-4" width="400">
      <v-list>
        <v-list-item title="Login">{{
          useUsers.currentUser?.Login
        }}</v-list-item>
        <v-list-item title="Name">{{ useUsers.currentUser?.Name }}</v-list-item>
        <v-list-item title="Number">{{
          useUsers.currentUser?.Number
        }}</v-list-item>
        <v-list-item title="Email">{{
          useUsers.currentUser?.Email
        }}</v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import router from "@/router";
import { useAppStore } from "@/stores/app";

const useUsers = useAppStore();

// It's global lol (call every time when change destination even if it's not this module)
router.beforeEach((to, from) => {
  if (to.name === "user-account" && !useUsers.checkCurrentUser()) {
    return false;
  }
});
</script>
