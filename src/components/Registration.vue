<template>
  <v-container class="d-flex align-center justify-center">
    <v-card class="pa-4" width="400">
      <h2 class="mt-0">Registration</h2>
      <v-form @submit.prevent ref="form" name="registration-form">
        <v-col cols="8" lg="12">
          <v-text-field
            name="login"
            :counter="50"
            :rules="loginRules"
            label="Login"
            v-model="user.Login"
            autocomplete="username"
            required
          />
          <v-text-field
            name="user name"
            :counter="42"
            :rules="firstNameRules"
            label="First name"
            v-model="user.Name"
            autocomplete="name"
            required
          />
          <v-text-field
            name="phone"
            :counter="12"
            :rules="phoneRules"
            label="Phone"
            v-model="formNumber"
            autocomplete="tel"
            required
          />
          <v-text-field
            name="mail"
            :counter="42"
            v-model="user.Email"
            type="mail"
            label="Mail"
            :rules="mailRules"
            autocomplete="email"
            required
          />
          <v-text-field
            name="password"
            type="password"
            label="Password"
            v-model="user.PasswordHash"
            :rules="passwordRules"
            autocomplete="new-password"
            required
          />
          <!-- TODO password hash to password -->
          <v-btn
            prepend-icon="mdi-account-plus"
            @click="validate"
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
import { computed, onMounted, reactive, ref } from "vue";
import { useAppStore } from "@/stores/app"; //TODO rename to useUserStore
import router from "@/router";

const useUsers = useAppStore();
const popup = usePopup();
const form = ref();

//#region FORM
const user: User = reactive({
  Name: "",
  Login: "",
  Number: NaN,
  Email: "",
  PasswordHash: "",
});
const formNumber = ref<string>("");
const userNumber = computed(() => {
  return Number(formNumber.value);
});
const password = ref<string>(""); //TODO Use

const firstNameRules = [(v: string) => !!v || "First name is required"];

const loginRules = [(v: string) => !!v || "Login is required"];

const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 8 || "Password must be at least 8 characters",
];

const mailRules = [
  (v: string) => !!v || "Email is required",
  (v: string) => {
    const pattern: RegExp =
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return pattern.test(v) || "Invalid email";
  },
];

const phoneRules = [
  (v: string) => {
    const pattern: RegExp = /^\d{7,13}$/gm;
    return pattern.test(v) || "Invalid phone number";
  },
];
//#endregion

async function validate() {
  const { valid } = await form.value.validate();

  if (valid) AddUser();
  else popup.showMessage("Please check your validation", "error");
}

function AddUser() {
  user.Number = userNumber.value;
  useUsers.addUser(user);
  router.push({
    name: "login",
  });
  popup.showMessage("User added!", "success");
}
</script>
