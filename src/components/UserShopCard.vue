<!-- TODO remove code duplicate (about ProductCard) -->
<template>
  <v-container>
    <h1>Cart</h1>
    <v-row>
      <v-col v-for="product in userProducts" md="6" lg="5" xl="3">
        <ProductCard
          :product="product"
          :product-link="getProductLink(product) as ProductLink"
          :in-cart="true"
        ></ProductCard>
      </v-col>
    </v-row>

    <div v-if="(useUsers.currentUser?.Card?.length as number) > 0">
      <h3>Total price: {{ currencyFormatter.format(totalPrice) }}</h3>
      <v-btn
        @click="order()"
        color="green"
        variant="elevated"
        >Order</v-btn
      >
    </div>

    <v-card class="mx-auto" v-else>
      <template v-slot:title>
        <span>Haven't products in Cart</span>
      </template>

      <v-card-text>
        You must add some products to cart to see them here.
      </v-card-text>

      <v-card-actions>
        <v-btn
          variant="outlined"
          color="green"
          :to="{ name: 'catalog' }"
          text="Go to Catalog"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useProductStore } from "@/stores/useProductStore";
import type { Product } from "@/types/product";
import { computed, ref } from "vue";
import ProductCardInCart from "./ProductCardInCart.vue";
import type { ProductLink } from "@/types/productLink";
import { currencyFormatter } from "@/tools/formatters";
import ProductCard from "./ProductCard.vue";
import { usePopup } from "@/composables/usePopup";

const { products, addProduct, removeProductByIndex } = useProductStore();
const useUsers = useAppStore();
const popup = usePopup();

const userProducts = computed(() => {
  return getUserCardProducts();
});

const totalPrice = computed(() => {
  let totalPrice: number = 0;
  userProducts.value.forEach((product) => {
    // TODO rewrite getProductLink Architecture or just give ProductCardInCard only ProductLink
    const productLink = getProductLink(product);
    if (productLink) {
      totalPrice += product.price * productLink.count;
    }
  });
  return totalPrice;
});

function order() {
  popup.showMessage(
    "Thank you for ordering for the amount of " +
      currencyFormatter.format(totalPrice.value),
  );
  useUsers.order();
}

function getProductLink(product: Product): ProductLink | undefined {
  const cartProducts = useUsers.currentUser?.Card;
  if (cartProducts) {
    const productLink: ProductLink = cartProducts[
      cartProducts.findIndex(
        (productInCart) => productInCart.productId === product.id,
      )
    ] as ProductLink;
    return productLink;
  }
  return undefined;
}

// TODO rewrite! O(n2)
// just use product in ProductLink instead of productId
function getUserCardProducts() {
  let userProducts: Product[] = [];

  products.forEach((product) => {
    if (
      useUsers.currentUser?.Card?.some(
        (ProductLink) => ProductLink.productId === product.id,
      )
    ) {
      userProducts.push(product);
    }
  });
  return userProducts;
}
</script>
