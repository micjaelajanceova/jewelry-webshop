<template>
  <div class="page-wrapper">
    <!-- Page header -->
    <div class="mb-12">
      <p class="section-subtitle">Explore our range</p>
      <h1 class="section-title">Fine Jewelry</h1>
      <div class="gold-divider"></div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32 gap-4 text-stone-400">
      <div class="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm tracking-widest uppercase">Loading collection…</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-400 text-sm">{{ error }}</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="item in jewelry"
        :key="item._id"
        class="product-card bg-white group"
      >
        <!-- Image -->
        <div class="relative overflow-hidden bg-stone-100 aspect-square">
          <img
            :src="item.imageURL"
            :alt="item.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Discount badge -->
          <span v-if="item.isOnDiscount && item.discount" class="badge-sale">
            -{{ item.discount }}%
          </span>
          <!-- Quick-add overlay -->
          <div class="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              @click="addToCart(item)"
              class="w-full bg-stone-900 hover:bg-gold-600 text-white text-xs font-semibold tracking-widest uppercase py-3 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="p-4">
          <p class="text-stone-400 text-xs tracking-widest uppercase mb-1">{{ item.material ?? 'Fine Jewelry' }}</p>
          <h3 class="font-serif text-stone-900 text-base font-semibold leading-snug mb-2">{{ item.name }}</h3>
          <p class="text-stone-500 text-xs line-clamp-2 mb-3">{{ item.description }}</p>

          <!-- Price row -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span v-if="item.isOnDiscount && item.discount" class="text-stone-400 text-xs line-through">
                ${{ item.price.toFixed(2) }}
              </span>
              <span class="text-stone-900 font-semibold text-base">
                ${{ discountedPrice(item).toFixed(2) }}
              </span>
            </div>
            <!-- Desktop add button (shown when hover overlay not available) -->
            <button
              @click="addToCart(item)"
              class="md:hidden flex items-center justify-center w-8 h-8 bg-stone-900 text-white hover:bg-gold-600 transition-colors"
              aria-label="Add to cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useJewelry } from '@/modules/useJewelry'
import { useCart } from '@/modules/cart/useCart'
import type { Jewelry } from '@/interfaces/interfaces'

const { jewelry, loading, error, fetchJewelry } = useJewelry()
const { addToCart } = useCart()

onMounted(() => fetchJewelry())

const discountedPrice = (item: Jewelry): number => {
  if (item.isOnDiscount && item.discount) {
    return item.price * (1 - item.discount / 100)
  }
  return item.price
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
