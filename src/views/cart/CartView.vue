<template>
  <div class="page-wrapper">
    <div class="mb-10">
      <p class="section-subtitle">Review your order</p>
      <h1 class="section-title">Checkout</h1>
      <div class="gold-divider"></div>
    </div>

    <!-- Empty state -->
    <div v-if="cart.length === 0" class="flex flex-col items-center justify-center py-28 text-stone-400 gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <p class="text-sm tracking-wide">Your cart is empty</p>
      <RouterLink to="/jewelry" class="btn-primary mt-2">Continue Shopping</RouterLink>
    </div>

    <!-- Cart content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-10">

      <!-- Items list -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cart"
          :key="item._id"
          class="flex gap-5 p-4 bg-white border border-stone-150 items-center"
        >
          <div class="flex-shrink-0 w-24 h-24 bg-stone-100 overflow-hidden rounded-sm">
            <img :src="item.imageURL" :alt="item.name" class="w-full h-full object-cover" />
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-stone-900 font-semibold text-sm">{{ item.name }}</p>
            <p class="text-stone-400 text-xs mt-0.5">${{ item.price.toFixed(2) }} each</p>
            <div class="flex items-center gap-3 mt-3">
              <button
                @click="updatedQuantity(item._id, item.quantity - 1)"
                class="w-7 h-7 flex items-center justify-center border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors"
              >−</button>
              <span class="text-stone-900 font-medium w-5 text-center text-sm">{{ item.quantity }}</span>
              <button
                @click="updatedQuantity(item._id, item.quantity + 1)"
                class="w-7 h-7 flex items-center justify-center border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors"
              >+</button>
            </div>
          </div>

          <div class="text-right flex-shrink-0">
            <p class="text-stone-900 font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <!-- Order summary -->
      <div class="lg:col-span-1">
        <div class="bg-white border border-stone-150 p-6 sticky top-24">
          <h2 class="font-serif text-lg text-stone-900 font-semibold mb-5">Order Summary</h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span>${{ cartTotal() }}</span>
            </div>
            <div class="flex justify-between text-stone-500">
              <span>Sales Tax</span>
              <span>${{ salesTax() }}</span>
            </div>

            <!-- Coupon -->
            <div class="pt-3 pb-2 border-t border-stone-100">
              <label class="text-xs font-medium text-stone-600 uppercase tracking-wider block mb-2">Coupon Code</label>
              <div class="flex gap-2">
                <input
                  v-model="code"
                  type="text"
                  placeholder="Enter code"
                  class="input-field flex-1 py-2 text-xs"
                />
                <button class="btn-secondary py-2 px-3 text-xs">Apply</button>
              </div>
            </div>

            <div class="flex justify-between text-stone-900 font-bold text-base pt-3 border-t border-stone-150">
              <span>Grand Total</span>
              <span>${{ grandTotal() }}</span>
            </div>
          </div>

          <button
            @click="checkOutBuy"
            class="btn-primary w-full mt-6"
          >
            Place Order
          </button>

          <RouterLink to="/jewelry" class="block text-center text-stone-400 text-xs hover:text-stone-600 transition-colors mt-4">
            ← Continue Shopping
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCart } from '@/modules/cart/useCart'

const { cart, code, updatedQuantity, cartTotal, salesTax, grandTotal, checkOutBuy } = useCart()
</script>
