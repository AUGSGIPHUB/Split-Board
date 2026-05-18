<template>
  <v-container class="d-flex align-center justify-center flex-column">
    <h1>Adminka</h1>
    <div>
      <v-btn
        prepend-icon="mdi-plus"
        :to="{ name: 'addProduct' }"
        text="Add product"
      ></v-btn>
      <v-btn
        prepend-icon="mdi-pencil"
        :to="{ name: 'editProducts' }"
        text="Edit product"
      ></v-btn>
      <v-btn
        prepend-icon="mdi-account-group"
        :to="{ name: 'users' }"
        text="Users"
      ></v-btn>
      <v-btn
        prepend-icon="mdi-cloud-braces"
        :to="{ name: 'json' }"
        text="Json"
      ></v-btn>
    </div>
    <router-view />
  </v-container>
</template>
