<template>
  <div class="d-flex align-center ga-2 md-2" max-width="100">
    <div class="flex-grow-1">
      <v-btn
        v-if="
          useUsers.checkCurrentUser() &&
          !useUsers.haveProductInCard(product.id as number)
        "
        @click.stop="
          useUsers.tryAddProductToCard(product.id as number, productCount)
        "
        color="primary"
        prepend-icon="mdi-cart"
        block
        variant="tonal"
        size="large"
      >
        Add to cart
      </v-btn>
      <v-btn
        v-else-if="
          useUsers.checkCurrentUser() &&
          useUsers.haveProductInCard(product.id as number)
        "
        @click.stop="useUsers.tryRemoveProductFromCard(product.id as number)"
        prepend-icon="mdi-cart-off"
        color="red-lighten-3"
        variant="tonal"
        block
        size="large"
      >
        Remove from card
      </v-btn>
      <v-btn
        v-else
        @click.stop
        :to="{ name: 'login' }"
        color="secondary"
        variant="outlined"
        block
        size="large"
      >
        Log in to add to cart
      </v-btn>
    </div>
      <v-number-input
        v-if="
          !props.inCart &&
          useUsers.checkCurrentUser() &&
          inDetails &&
          !useUsers.haveProductInCard(product.id)
        "
        class="mt-5"
        density="compact"
        label="Count"
        :max="100"
        :min="1"
        v-model="productCount"
        control-variant="split"
        @click.stop
      ></v-number-input>
    <Favorite :product="product" :use-users="useUsers" />
  </div>
  <div v-if="props.inCart" class="w-100 mt-1">
    <v-number-input
      density="compact"
      label="Count"
      :max="100"
      :min="1"
      v-model="productLink.count"
      control-variant="split"
      @click.stop
    ></v-number-input>
    <div v-if="productLink.count > 1">
      Summary cost:
      {{ currencyFormatter.format(productLink.count * product.price) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { currencyFormatter } from "@/tools/formatters";
import Favorite from "./Favorite.vue";
import type { Product } from "@/types/product";
import type { ProductLink } from "@/types/productLink";
import { ref } from "vue";

const productCount = ref<number>(1);

const props = withDefaults(
  defineProps<{
    product: Product;
    useUsers: any;
    productLink?: ProductLink;
    inCart?: boolean;
    inDetails?: boolean;
  }>(),
  {
    inCart: false,
    inDetails: false,
    productLink: () => ({ productId: 1, count: 1 }), //Fix Error
  },
);
</script>
