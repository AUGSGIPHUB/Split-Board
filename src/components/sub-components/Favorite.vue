<template>
  <div v-if="useUsers.checkCurrentUser()">
    <v-btn
      v-if="
        useUsers.checkCurrentUser() &&
        !useUsers.inFavorite(product.id as number)
      "
      flat
      icon="mdi-heart-outline"
      @click.stop="useUsers.tryAddToFavorite(product.id as number)"
    >
    </v-btn>
    <v-btn
      v-else
      flat
      icon="mdi-heart"
      @click.stop="useUsers.tryRemoveFromFavorite(product.id as number)"
    >
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/product";

const props = defineProps<{
    useUsers: any;
    product: Product;
}>();
</script>
