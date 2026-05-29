<template>
  <transition name="fade-slide">
    <div
      v-if="isVisible"
      @click.self="toggleCart"
      class="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex justify-end"
    >
      <div @click.stop class="cart-panel bg-white w-full max-w-sm h-full flex flex-col shadow-2xl">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div>
            <h2 class="font-serif text-xl text-stone-900 font-semibold">Your Cart</h2>
            <p class="text-stone-400 text-xs tracking-wide mt-0.5">{{ cart.length }} item{{ cart.length !== 1 ? 's' : '' }}</p>
          </div>
          <button @click="toggleCart" class="p-2 text-stone-400 hover:text-stone-700 transition-colors" aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          <p v-if="cart.length === 0" class="text-center text-stone-400 text-sm pt-16">
            Your cart is empty
          </p>

          <div v-for="item in cart" :key="item._id" class="flex gap-4">
            <div class="flex-shrink-0 w-20 h-20 bg-stone-100 overflow-hidden rounded-sm">
              <img :src="item.imageURL" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-stone-900 text-sm font-semibold leading-snug truncate">{{ item.name }}</p>
              <p class="text-stone-400 text-xs mt-0.5">${{ item.price.toFixed(2) }} each</p>
              <div class="flex items-center gap-3 mt-2">
                <button
                  @click="updatedQuantity(item._id, item.quantity - 1)"
                  class="w-6 h-6 flex items-center justify-center border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors text-sm"
                >−</button>
                <span class="text-stone-900 text-sm font-medium w-4 text-center">{{ item.quantity }}</span>
                <button
                  @click="updatedQuantity(item._id, item.quantity + 1)"
                  class="w-6 h-6 flex items-center justify-center border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors text-sm"
                >+</button>
              </div>
            </div>
            <div class="text-right">
              <p class="text-stone-900 text-sm font-semibold">${{ cartTotalIndividualJewelry(item._id).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-stone-100 px-6 py-5 space-y-3 bg-stone-50">
          <!-- Coupon -->
          <div class="flex gap-2">
            <input
              type="text"
              v-model="code"
              placeholder="Coupon code"
              class="input-field flex-1 py-2 text-xs"
            />
            <button class="btn-secondary py-2 px-3 text-xs !tracking-normal !uppercase-none">Apply</button>
          </div>

          <!-- Totals -->
          <div class="space-y-1.5 text-sm">
            <div class="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span>${{ cartTotal() }}</span>
            </div>
            <div class="flex justify-between text-stone-500">
              <span>Tax</span>
              <span>${{ salesTax() }}</span>
            </div>
            <div class="flex justify-between text-stone-900 font-semibold text-base pt-1 border-t border-stone-150">
              <span>Grand Total</span>
              <span>${{ grandTotal() }}</span>
            </div>
          </div>

          <button @click="checkoutBuy" class="btn-primary w-full mt-2">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCart } from '@/modules/cart/useCart'
import { useRouter } from 'vue-router'

const { cart, code, updatedQuantity, cartTotal, cartTotalIndividualJewelry, salesTax, grandTotal } = useCart()

const router = useRouter()
const isVisible = defineModel<boolean>()

const toggleCart = (): void => {
  isVisible.value = !isVisible.value
}

const checkoutBuy = (): void => {
  router.push('/cart')
  isVisible.value = false
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}

.cart-panel {
  transform: translateX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from .cart-panel,
.fade-slide-leave-to .cart-panel {
  transform: translateX(100%);
}
</style>
