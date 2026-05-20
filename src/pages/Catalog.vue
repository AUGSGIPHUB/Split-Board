<template>
  <v-container>
    <h1>Catalog</h1>
    <v-card class="d-flex flex-wrap my-4 ga-3">
      <div>
        <v-icon size="x-large">mdi-filter</v-icon>
        Filters
        <v-btn color="info" text="Clear" @click="resetFilters()"></v-btn>
      </div>
      <v-text-field
        min-width="200"
        name="Search"
        label="Search"
        v-model="searchText"
        required
      ></v-text-field>
      <v-select
        width="300"
        min-width="200"
        :items="keyboardType.Switch"
        v-model="searchTypes.switch"
        label="Switch"
        multiple
        chips
      ></v-select>
      <v-select
        width="300"
        min-width="200"
        :items="keyboardType.Color"
        v-model="searchTypes.color"
        label="Color"
        multiple
        chips
      ></v-select>
      <v-select
        width="100"
        min-width="200"
        :items="keyboardType.Keycaps"
        v-model="searchTypes.keycaps"
        label="Keycaps"
        multiple
        chips
      ></v-select>
      <v-select
        width="100"
        min-width="200"
        :items="keyboardType.Size"
        v-model="searchTypes.size"
        label="Size"
        multiple
        chips
      ></v-select>
      <v-select
        width="100"
        min-width="200"
        :items="keyboardType.Wire"
        v-model="searchTypes.wireless"
        label="Connect type"
        multiple
        chips
      ></v-select>
      <v-select
        width="100"
        min-width="200"
        :items="keyboardType.Hotswap"
        v-model="searchTypes.hotswap"
        label="Hotswap"
        multiple
        chips
      ></v-select>
      <v-select
        width="100"
        min-width="200"
        :items="keyboardType.Solid"
        v-model="searchTypes.split"
        label="Form"
        multiple
        chips
      ></v-select>
      <v-select label="Price" v-model="searchPrice" :items="['Low to High', 'High to Low']">
      </v-select>
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
            There are no products available, please change the filters to see
            the producst.
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
import MultipleSelect from "@/components/sub-components/MultipleSelect.vue";
import { usePopup } from "@/composables/usePopup";
import { useProductStore } from "@/stores/useProductStore";
import keyboardType from "@/types/keyboardType";
import type { Product } from "@/types/product";
import { computed, reactive, ref } from "vue";

const { products, addProduct, removeProductByIndex } = useProductStore();

const popup = usePopup();

const searchTypes = reactive({
  switch: [],
  color: [],
  size: [],
  keycaps: [],
  wireless: [],
  hotswap: [],
  split: [],
});

const searchPrice = ref<string>("Low to High");
const searchText = ref<string>();

const matchesFilters = (product: Product): boolean => {
  if (
    searchText.value?.trim() &&
    !product.name?.toLowerCase().includes(searchText.value.toLowerCase()) &&
    !product.description?.toLowerCase().includes(searchText.value.toLowerCase())
  ) {
    return false;
  }

  const checkArray = (
    field: string | undefined,
    filters: string[],
  ): boolean => {
    if (filters.length === 0) return true;
    if (!field) return false;
    return filters.some((f) => field.toLowerCase().includes(f.toLowerCase()));
  };

  const checkArrayNumber = (
    field: number | undefined,
    filters: number[],
  ): boolean => {
    if (filters.length === 0) return true;
    if (!field) return false;
    return filters.some((f) => field === f);
  };

  const checkBoolean = (
    field: boolean | undefined,
    filters: boolean[],
  ): boolean => {
    if (filters.length === 0) return true;
    return filters.includes(!!field);
  };

  const getStringUseBoolean = (value: boolean, list: string[]): string => {
    if (value) {
      return list[0];
    } else {
      return list[1];
    }
  };

  return (
    checkArray(product.switch, searchTypes.switch) &&
    checkArray(product.color, searchTypes.color) &&
    checkArrayNumber(product.size, searchTypes.size) &&
    checkArray(product.keycaps, searchTypes.keycaps) &&
    checkArray(
      getStringUseBoolean(!product.wireless, keyboardType.Wire),
      searchTypes.wireless,
    ) &&
    checkArray(
      getStringUseBoolean(product.hotswap, keyboardType.Hotswap),
      searchTypes.hotswap,
    ) &&
    checkArray(
      getStringUseBoolean(!product.split, keyboardType.Solid),
      searchTypes.split,
    )
  );
};

function sortByPrice(products:Product[], invert: string) {
  if (invert === "Low to High") {
    products.sort((a, b) => a.price - b.price);
  } else {
    products.sort((a, b) => b.price - a.price);
  }

  return products;
}

const searchedProducts = computed(() => sortByPrice(products.filter(matchesFilters), searchPrice.value as string));

function resetFilters() {
  searchText.value = "";

  searchTypes.switch = [];
  searchTypes.color = [];
  searchTypes.size = [];
  searchTypes.keycaps = [];
  searchTypes.wireless = [];
  searchTypes.hotswap = [];
  searchTypes.split = [];

  popup.showMessage("Filter cleared", "info");
}
</script>
