<template>
  <v-card class="mx-auto" width="320" link @click="goToProductDetailed()">
    <v-img height="300px" :src="product.imageUrl">
      <v-chip
        v-if="product.salePrice && (product.salePrice as number) > 0"
        class="ma-2 text-green"
        lable
        >Sale -{{
          Math.round(100 - (product.price / product.salePrice) * 100)
        }}%</v-chip
      >
      <template #error>
        <v-img
          :src="errorImageUrl"
          cover
          class="d-flex flex-row align-center justify-center text-center"
        >
        </v-img>
      </template>
    </v-img>

    <v-card-title primary-title>
      <h3 class="text-headline-small font-weight-bold my-2">
        {{ product.name }}
      </h3>
      <div class="d-flex align-center mb-4">
        <div
          v-if="product.salePrice && (product.salePrice as number) > 0"
          class="text-primary"
        >
          <span class="text-h4 text-primary mr-4">{{
            currencyFormatter.format(product.price)
          }}</span>
          <span
            class="text-h6 text-title-medium text-decoration-line-through text-grey"
            >{{ currencyFormatter.format(product.salePrice) }}</span
          >
        </div>
        <div v-else class="text-primary">
          {{ currencyFormatter.format(product.price) }}
        </div>
      </div>
      <ProductChips :product="product"/>
    </v-card-title>

    <v-card-actions class="flex-column align-stretch">
      <ProductCartButton
        :product="product"
        :use-users="useUsers"
        :in-cart="inCart"
        :product-link="productLink"
        :in-edit="inEdit"
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
import { darken } from "vuetify/lib/util/colorUtils.mjs";
import ProductChips from "./sub-components/ProductChips.vue";

const router = useRouter();
const useUsers = useAppStore();
const popup = usePopup();

const errorImageUrl = ref(
  "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png"
);

const props = withDefaults(
  defineProps<{
    product: Product;
    productLink?: ProductLink;
    inCart?: boolean;
    inEdit?: boolean;
  }>(),
  {
    inCart: false,
    inEdit: false,
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
