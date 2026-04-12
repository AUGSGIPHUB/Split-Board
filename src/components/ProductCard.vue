<template>
  <v-card class="mx-auto" width="320" link @click="goToProductDetailed()">
    <v-img height="200px" :src="product.imageUrl" cover>
      <v-chip class="ma-2 text-secondary opacity-100">{{ product.type }}</v-chip>
      <template #error>
        <v-img
          :src="errorImageUrl"
          cover
          class="d-flex flex-row align-center justify-center text-center"
        >
          <v-sheet color="rgba(0,0,0,0.7)" class="pa-2 h-100">
            <v-icon size="50"> mdi-alert-box </v-icon>
            <p class="text-h2 font-weight-bold">Image Missing</p>
          </v-sheet>
        </v-img>
      </template>
    </v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="text-headline-small font-weight-bold my-2">
          {{ product.name }}
        </h3>
        <div class="text-primary mb-1">
          {{ currencyFormatter.format(product.price) }}
        </div>
      </div>
    </v-card-title>

    <v-card-actions class="flex-column align-stretch">
      <ProductCartButton
        :product="product"
        :use-users="useUsers"
        :in-cart="inCart"
        :product-link="productLink"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { currencyFormatter } from "@/tools/formatters";
import type { Product } from "@/types/product";
import { useRouter } from "vue-router";
import type { ProductLink } from "@/types/productLink";
import { usePopup } from "@/composables/usePopup";
import { ref } from "vue";
import ProductCartButton from "./sub-components/ProductCartButton.vue";

const router = useRouter();
const useUsers = useAppStore();
const popup = usePopup();

const errorImageUrl = ref(
  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fallthatsinteresting.com%2Fwordpress%2Fwp-content%2Fuploads%2F2015%2F06%2Fworst-cars-vega.jpg&f=1&nofb=1&ipt=c9083ff540855f4bb8349d2151fa7c8bb641947a867841b366dee2428b329ac4",
);

const props = withDefaults(
  defineProps<{
    product: Product;
    productLink?: ProductLink;
    inCart?: boolean;
  }>(),
  {
    inCart: false,
    productLink: () => ({ productId: 1, count: 1 }), //Fix Error
  },
);

const goToProductDetailed = () => {
  router.push({
    name: "product-detail",
    params: { id: props.product.id },
  });
};
</script>
