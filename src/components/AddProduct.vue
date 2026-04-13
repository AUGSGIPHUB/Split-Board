<template>
  <v-container>
    <v-form @submit.prevent>
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-center">Information</h2>
          <v-text-field
            prepend-inner-icon="mdi-rename"
            name="name"
            :counter="42"
            label="Product name"
            v-model="newProduct.name"
            required
          ></v-text-field>

          <v-textarea
            prepend-inner-icon="mdi-rename"
            label="description"
            name="description"
            v-model="newProduct.description"
            :counter="1500"
            required
          ></v-textarea>

          <v-text-field
            prepend-inner-icon="mdi-cash-edit"
            name="price"
            v-model="newProduct.price"
            type="number"
            label="Price"
            required
          ></v-text-field>

          <v-text-field
            prepend-inner-icon="mdi-link-edit"
            name="url"
            label="Url image"
            v-model="newProduct.imageUrl"
            required
          ></v-text-field>

          <div class="d-flex ga-4 flex-wrap">
            <v-select
              :items="keyboardType.Size"
              v-model="newProduct.size"
              label="Size"
            ></v-select>

            <v-select
              :items="keyboardType.Switch"
              v-model="newProduct.switch"
              label="Switch"
            ></v-select>

            <v-select
              :items="keyboardType.Color"
              v-model="newProduct.color"
              label="Color"
            ></v-select>

            <v-select
              :items="keyboardType.Keycaps"
              v-model="newProduct.keycaps"
              label="Keycaps material"
            ></v-select>
          </div>

          <div class="ga-6 d-flex flex-wrap">
            <v-chip size="large">
              <v-switch
                class="pt-5"
                label="Split"
                v-model="newProduct.split"
              ></v-switch>
            </v-chip>
            <v-chip size="large">
              <v-switch
                class="pt-5"
                label="HotSwap"
                v-model="newProduct.hotswap"
              ></v-switch>
            </v-chip>
            <v-chip size="large">
              <v-switch
                class="pt-5"
                :label="wireless"
                v-model="newProduct.wireless"
              ></v-switch>
            </v-chip>
          </div>
          <v-card class="mt-3 pa-3">
            <v-switch
              @click="toggleSale()"
              label="Sale"
              v-model="showSale"
            ></v-switch>
            <!-- TODO check with price -->
            <div v-if="showSale">
              <v-number-input
                prepend-icon="mdi-cash-clock"
                name="sale-price"
                v-model="newProduct.salePrice"
                label="Sale Price"
              ></v-number-input>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="5">
          <h2 class="text-center">Preview</h2>
          <ProductCard :product="newProduct" />
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-4">
        <v-col cols="auto">
          <v-btn @click="addProduct" type="submit" size="large" color="success"
            >Add</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { computed, onMounted, reactive, ref } from "vue";
import type { Product } from "@/types/product";
import { useProductStore } from "@/stores/useProductStore";
import { usePopup } from "@/composables/usePopup";
import keyboardType from "@/types/keyboardType";

const popup = usePopup();
const product = useProductStore();

const showSale = ref(false);
// function comparePriceAndSalePrice() {
//   if (newProduct.price >= newProduct.salePrice) {
//     newProduct.salePrice += newProduct.price + 500;
//     popup.showMessage(
//       "Please make sure your sale price lower then price",
//       "info",
//     );
//   }
// }

onMounted(() => {
  newProduct.salePrice = 0;
});

function toggleSale() {
  if (showSale.value === true) {
    newProduct.salePrice = 0;
  } else {
    newProduct.salePrice = newProduct.price * 2;
  }
}

const newProduct = reactive<Product>({
  id: -1,
  name: "",
  description: "",
  price: 100,
  imageUrl: "",
  switch: keyboardType.Switch[0],
  color: keyboardType.Color[0],
  size: keyboardType.Size[0],
  keycaps: keyboardType.Keycaps[0],
  wireless: false,
  split: false,
  hotswap: true,
  salePrice: 50,
});

const wireless = computed(() => {
  if (newProduct.wireless) {
    return keyboardType.Wire[1];
  } else {
    return keyboardType.Wire[0];
  }
});

function resetForm() {
  newProduct.name = "";
  newProduct.description = "";
  newProduct.price = 100;
  newProduct.imageUrl = "";
  newProduct.switch = keyboardType.Switch[0];
  newProduct.color = keyboardType.Color[0];
  newProduct.size = keyboardType.Size[0];
  newProduct.keycaps = keyboardType.Keycaps[0];
  newProduct.wireless = false;
  newProduct.split = false;
  newProduct.hotswap = true;
  if (showSale) {
    newProduct.salePrice = 500;
  }
}

const addProduct = () => {
  if (
    newProduct.name &&
    newProduct.price &&
    newProduct.description &&
    newProduct.imageUrl
  ) {
    popup.showMessage("Product add Succes", "success");

    const productToAdd: Product = {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      imageUrl: newProduct.imageUrl,
      switch: newProduct.switch,
      color: newProduct.color,
      size: newProduct.size,
      keycaps: newProduct.keycaps,
      wireless: newProduct.wireless,
      split: newProduct.split,
      hotswap: newProduct.hotswap,
      salePrice: newProduct.salePrice,
    }

    product.addProduct(productToAdd);

    resetForm();
  } else {
    popup.showMessage("Fill in all required fields", "error");
  }
};
</script>
