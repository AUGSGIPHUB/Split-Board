<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn
          @click="router.back()"
          prepend-icon="mdi-arrow-left"
          variant="flat"
          class="mb-4"
        >
          Back
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="product">
      <v-col cols="12" lg="6">
        <v-img :src="product.imageUrl" class="rounded" />
      </v-col>

      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title class="text-h4">
            {{ product.name }}
          </v-card-title>

          <v-card-text>
            <div class="text-h3 text-primary mb-2">
              {{ currencyFormatter.format(product.price) }}
            </div>

            <v-divider class="my-4"></v-divider>

            <h3 class="text-h6 mb-2">Description:</h3>
            <p class="text-body-1" style="white-space: pre-line">
              {{ product.description }}
            </p>
          </v-card-text>

          <v-card-actions class="flex-column align-stretch">
            <ProductCartButton
              :product="product"
              :use-users="useUsers"
              :in-details="true"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <p class="mt-4">Loading product...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/useProductStore";
import { useAppStore } from "@/stores/app";
import { currencyFormatter } from "@/tools/formatters";
import ProductCartButton from "./sub-components/ProductCartButton.vue";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const useUsers = useAppStore();

const product = computed(() => {
  const id = Number(route.params.id);
  return productStore.products.find((p) => p.id === id);
});

// TODO return user on product page after login or registration
function pushToLogin() {
  router.push({
    name: "login",
  });
}

function pushToCard() {
  router.push({
    name: "user-account",
    params: { login: useUsers.currentUser?.Login },
  });
}

//TODO 404
onMounted(() => {
  if (!product.value) {
    router.push("/catalog");
  }
});
</script>
