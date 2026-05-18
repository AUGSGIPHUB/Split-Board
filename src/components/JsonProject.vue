<template>
  <v-container class="d-flex align-center justify-center">
    <v-card width="512" class="pa-4">
      <h2 class="text-center mt-0">Json data</h2>
      <h3 class="mt-8 mb-1">Load</h3>
      <div>Use default.json in project directory to load default data</div>
      <span>Or</span>
      <div>Load your data from file</div>

      <div class="d-flex ga-3">
        <v-file-input
          density="comfortable"
          label="Drag and Drop .json here"
          prepend-icon="mdi-database-import"
          accept=".json"
          v-model="Files"
        ></v-file-input>
        <v-btn
          size="large"
          :disabled="!Files"
          @click="loadData()"
          color="info"
          text="Load"
        />
      </div>

      <h3 class="mt-8 mb-1">Download</h3>
      <v-btn
        color="green"
        @click="ExampleDownload()"
        text="Download current data"
      />

      <h3 class="mt-8 mb-1">Delete</h3>

      <v-dialog max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" color="error" text="Delete data" />
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Are you sure?">
            <v-card-text>
              All data after this action will be deleted, and you will not be
              able to recover it (local storage too).
              <div class="mt-2">Do you want to delete all data?</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="No" @click="isActive.value = false" />
              <v-btn
                @click="
                  isActive.value = false;
                  deleteAllData();
                "
                color="error"
                text="Yes, delete"
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { usePopup } from "@/composables/usePopup";
import { useAppStore } from "@/stores/app";
import { useProductStore } from "@/stores/useProductStore";
import { downloadObjectAsJSONFile } from "@/tools/downloadObjectAsJson";
import { computed, ref, watch } from "vue";
import { useRules } from "vuetify/labs/rules";

const useUsers = useAppStore();
const products = useProductStore();
const popup = usePopup();

const Files = ref();
const jsonFiles = ref();

function deleteAllData() {
  useUsers.deleteData();
  products.deleteData();

  popup.showMessage("Data is deleted", "warning");
}

function ExampleDownload() {
  const saveData: object = {
    users: useUsers.$state,
    products: products.$state,
  };
  downloadObjectAsJSONFile(saveData, new Date().toLocaleTimeString());
  popup.showMessage("Trying to save data", "success");
}

// use watch because computed not support await
watch(Files, async (newFile) => {
  if (!newFile) {
    jsonFiles.value = null;
    return;
  }

  try {
    const file = Array.isArray(newFile) ? newFile[0] : newFile;

    const text = await file.text(); // await here is important

    jsonFiles.value = JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    popup.showMessage("Invalid JSON format", "error");
    jsonFiles.value = null;
  }
});

function loadData() {
  if (!jsonFiles) return;

  try {
    // TODO переместить в общую штуку для сохранения
    useUsers.loadStoreData(jsonFiles.value.users);
    products.loadStoreData(jsonFiles.value.products);

    popup.showMessage(
      "Loaded " +
        jsonFiles.value.products.products.length +
        " products and " +
        jsonFiles.value.users.users.length +
        " users from " +
        Files.value.name,
      "success",
    );
  } catch (error) {
    console.log("Error updating stores:", error);
    popup.showMessage("Failed load data", "error");
  }
}
</script>
