<template>
  <v-card max-width="90vw" class="mt-5 pa-4">
    <h2 class="mt-0">Users</h2>
    <v-data-table :headers="headers" :items="useUsers.users">
      <template v-slot:item.actions="{ item }">
        <v-btn variant="text" icon @click="editUser(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn variant="text" icon @click="deleteUser(item.id as any)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Modify User</v-card-title>

      <v-card-text>
        <v-text-field v-model="editedUser.name" label="Name"></v-text-field>

        <v-text-field
          v-model="editedUser.login"
          label="Login"
          type="text"
        ></v-text-field>

        <v-text-field
          v-model="editedUser.phone"
          label="Phone"
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="editedUser.email"
          label="Email"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="editedUser.password"
          label="Password"
          type="text"
        ></v-text-field>

        <v-switch
          label="Admin"
          v-model="editedUser.admin"
          color="red-darken-4"
        ></v-switch>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="dialog = false"
          >Cancel</v-btn
        >
        <v-btn color="success" variant="text" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { ref } from "vue";
import type { User } from "@/types/user";
import type { ProductLink } from "@/types/productLink";
import router from "@/router";

const dialog = ref(false);
const currentEdit = ref();

const useUsers = useAppStore();

const headers = [
  { title: "Name", value: "Name" },
  { title: "Login", value: "Login" },
  { title: "Phone", value: "Number" },
  { title: "Mail", value: "Email" },
  { title: "Password Hash", value: "PasswordHash" },
  { title: "Admin", value: "Admin" },
  { title: "Likes", value: "Likes" },
  { title: "Card", value: "Card" },
  // { title: "History", value: "" }, //TODO
  { title: "Actions", value: "actions", sortable: false },
];

const editedUser = ref({
  id: null as number | null,
  name: "",
  login: "",
  phone: "",
  email: "",
  password: "",
  admin: false,
  likes: [] as number[],
  card: [] as ProductLink[],
});

const selectedId = ref<number | null>(null);

function editUser(item: User) {
  currentEdit.value = item;
  selectedId.value = item.id || null;
  editedUser.value = {
    id: item.id || null,
    name: item.Name,
    login: item.Login,
    phone: item.Number.toString(),
    email: item.Email,
    password: item.PasswordHash,
    admin: item.Admin ?? false,
    likes: item.Likes ?? [],
    card: item.Card ?? [],
  };
  dialog.value = true;
}

function save() {
  if (selectedId.value) {
    useUsers.updateUser(selectedId.value, {
      id: selectedId.value,
      Name: editedUser.value.name,
      Login: editedUser.value.login,
      Number: parseInt(editedUser.value.phone) || 0,
      Email: editedUser.value.email,
      PasswordHash: editedUser.value.password,
      Admin: editedUser.value.admin,
      // Likes: [],
      // Card: [],
    });
  }
  dialog.value = false;
}

function deleteUser(id: number) {
  if (confirm("Are you sure you want to delete this user?")) {
    if (id === useUsers.currentUser?.id) {
      useUsers.logout();
      router.push({ name: "login" });
    }
    useUsers.deleteUserById(id);
  }
}
</script>
