<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-4">Jewelry</h2>
    <div v-if="loading" class="text-center">Loading...</div>                                           <!-- Loading wait screen with v-if -->

    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>                                        <!-- Error message with v-else-if -->

    <div v-else class="flex flex-wrap -mx-2">                                                  <!-- Loop through the products -->
      <div v-for="jewelryItem in jewelry" :key="jewelryItem._id" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" >                              <!-- Product card with v-for -->
        <div class="bg-white p-4 rounded-lg shadow-md">
        <img :src="jewelryItem.imageURL" alt="Product Image" class="w-full h-48 object-cover mb-4 rounded-lg">      <!-- Product image -->
          <h3 class="text-lg text-gray-700 font-semibold mb-2"> {{ jewelryItem.name }}  </h3>                  <!-- Product name -->
          <p class="text-gray-700"> {{ jewelryItem.description }} </p>                                               <!-- Product description -->
          <p class="text-blue-500 font-bold mt-2"> {{ jewelryItem.price }} </p>                                <!-- Product price -->
          <div class="flex justify-between mt-4">
            <button class="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600">Product Details</button>
            <button @click="addToCart(jewelryItem)" class="bg-green-500 text-white px-1 py-2 rounded hover:bg-green-600">Add to Cart</button> <!-- Add to cart button -->
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useJewelry } from '@/modules/useJewelry';
import { useCart } from '@/modules/cart/useCart';

const { jewelry, loading, error, fetchJewelry } = useJewelry();
const { addToCart } = useCart();

onMounted(() => {
  fetchJewelry();
})


</script>

<style scoped>
</style>
