<template>
  <v-container class="d-flex align-center justify-center">
    <v-card class="pa-4" width="400">
      <h2 class="mt-0">Login</h2>
      <v-form ref="form" @submit.prevent name="login-form">
        <v-text-field
          name="login"
          :counter="42"
          :rules="loginRules"
          label="Login"
          v-model="loginVariables.login"
          autocomplete="username"
          required
        />
        <v-text-field
          name="password"
          type="password"
          :rules="passwordRules"
          label="Password"
          v-model="loginVariables.password"
          autocomplete="current-password"
          required
        />
        <v-btn
          prepend-icon="mdi-login"
          @click="tryLogin"
          type="submit"
          size="large"
          color="success"
          >Sign in</v-btn
        >
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { usePopup } from "@/composables/usePopup";
import { useAppStore } from "@/stores/app";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const useUsers = useAppStore();
const popup = usePopup();
const router = useRouter();

const form = ref();

const loginVariables = reactive({
  login: "",
  password: "",
});

const loginRules = [(v: string) => !!v || "Login is required"];
const passwordRules = [(v: string) => !!v || "Password is required"];

function tryLogin() {
  if (useUsers.tryLogin(loginVariables.login, loginVariables.password)) {
    popup.showMessage(
      `Login in account: ${loginVariables.login} ${useUsers.tryLogin(loginVariables.login, loginVariables.password)}`,
    );

    router.push({
      name: "user-account",
      params: { login: useUsers.currentUser?.Login },
    });
  } else {
    popup.showMessage("Login or password is incorrect, try again", "error");
  }
}
</script>
