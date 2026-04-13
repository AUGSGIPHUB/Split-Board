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
        :items="keyboardType.Switch"
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
      <v-col v-if="searchedProducts.length === 0">
        <v-card class="mx-auto">
          <template v-slot:title>
            <span>There are no matches</span>
          </template>

          <v-card-text>
            There are no products available, please change the filters to see the producst.
          </v-card-text>

          <v-card-actions>
            <v-btn
              variant="flat"
              color="green"
              @click="resetFilters()"
              text="Reset filters"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { usePopup } from "@/composables/usePopup";
import { useProductStore } from "@/stores/useProductStore";
import keyboardType from "@/types/keyboardType";
import { computed, reactive, ref } from "vue";

const { products, addProduct, removeProductByIndex } = useProductStore();

const popup = usePopup();

const searchType = ref();
const searchText = ref<string>();
const searchedProducts = computed(() => {
  if (!searchText.value?.trim()) {
    return products;
  }

  const searchLower = searchText.value.toLocaleLowerCase();
  return products.filter(
    (products) => products.name.toLocaleLowerCase().includes(searchLower),
    // || products.type.toLocaleLowerCase().includes(searchLower),
  );
});

function resetFilters () {
  searchText.value = "";
  popup.showMessage("Filetrs reseted", "info")
}
</script>
