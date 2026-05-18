<template>
  <v-container class="d-flex align-center justify-center">
    <v-card class="pa-4" width="400">
      <h2 class="mt-0">Registration</h2>
      <v-form @submit.prevent name="registration-form">
        <v-col cols="8" lg="12">
          <v-text-field
            name="login"
            :counter="50"
            label="Login"
            v-model="user.Login"
            autocomplete="username"
            required
          />
          <v-text-field
            name="user name"
            :counter="42"
            :rules="firstNameRules"
            label="User name"
            v-model="user.Name"
            autocomplete="name"
            required
          />
          <v-text-field
            name="phone"
            :counter="12"
            label="Phone"
            v-model="user.Number"
            autocomplete="tel"
            required
          />
          <v-text-field
            name="mail"
            :counter="42"
            v-model="user.Email"
            type="mail"
            label="mail"
            :rules="mailRules"
            autocomplete="email"
            required
          />
          <v-text-field
            name="password"
            type="password"
            label="password"
            v-model="user.PasswordHash"
            :rules="passwordRules"
            autocomplete="new-password"
            required
          />
          <!-- TODO password hash to password -->
          <v-btn
            prepend-icon="mdi-account-plus"
            @click="AddUser"
            rounded="sm"
            type="submit"
            size="large"
            color="success"
            >Sign up</v-btn
          >
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { usePopup } from "@/composables/usePopup";
import type { User } from "@/types/user";
import { reactive, ref } from "vue";
import { useAppStore } from "@/stores/app"; //TODO rename to useUserStore
import router from "@/router";

const useUsers = useAppStore();
const popup = usePopup();

//#region FORM
const user: User = reactive({
  Name: "",
  Login: "",
  Number: 1,
  Email: "",
  PasswordHash: "",
});
const password = ref<string>(""); //TODO Use

const firstNameRules = [(v: string) => !!v || "first name is required"];

const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 8 || "Password must be at least 8 characters",
];

const mailRules = [
  (v: string) => !!v || "Email is required",
  (v: string) => {
    const pattern = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return pattern.test(v) || "Invalid email";
  },
];
//#endregion

function AddUser() {
  if (passwordRules && firstNameRules && mailRules) {
    popup.showMessage("User added!", "success");
    useUsers.addUser(user);
    router.push({
      name: "login",
    });
  } else {
    popup.showMessage("Please check your validation", "error");
  }
}
</script>
