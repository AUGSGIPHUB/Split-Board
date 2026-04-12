<template>
  <v-container>
    <h1>Catalog</h1>
    <v-card class="my-4 d-flex ga-3">
      <v-text-field
        name="Search"
        label="Search"
        v-model="searchText"
        required
      ></v-text-field>
      <v-select
        :items="carType"
        v-model="searchType"
        label="Type"
        multiple
        chips
      ></v-select>
    </v-card>
    <v-row>
      <v-col v-for="product in searchedProducts" md="6" lg="4" xl="3">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/useProductStore";
import carType from "@/types/carType";
import type { Product } from "@/types/product";
import { computed, reactive, ref } from "vue";

const { products, addProduct, removeProductByIndex } = useProductStore();

const searchType = ref();
const searchText = ref<string>();
const searchedProducts = computed(() => {
  if (!searchText.value?.trim()) {
    return products;
  }

  const searchLower = searchText.value.toLocaleLowerCase();
  return products.filter(
    (products) =>
      products.name.toLocaleLowerCase().includes(searchLower)
      // || products.type.toLocaleLowerCase().includes(searchLower),
  );
});
</script>
