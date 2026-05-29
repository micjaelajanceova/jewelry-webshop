<template>
  <div class="min-h-screen flex flex-col bg-stone-50">

    <!-- Announcement bar -->
    <div class="bg-stone-900 text-stone-300 text-xs text-center py-2 tracking-widest uppercase">
      Free shipping on orders over $150 &nbsp;·&nbsp; New collection available
    </div>

    <!-- Main header -->
    <header class="sticky top-0 z-40 bg-white border-b border-stone-150 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between h-16">

          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-2 !p-0 !text-stone-900 hover:!text-gold-600 transition-colors">
            <span class="text-gold-500 text-lg leading-none">◆</span>
            <span class="font-serif text-xl font-bold tracking-widest uppercase text-stone-900">Luxe</span>
          </RouterLink>

          <!-- Center navigation -->
          <div class="hidden md:flex items-center gap-8">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
            <RouterLink to="/jewelry" class="nav-link">Collection</RouterLink>
            <RouterLink to="/about" class="nav-link">About</RouterLink>
            <RouterLink v-if="isLoggedIn" to="/orders" class="nav-link">Orders</RouterLink>
            <RouterLink v-if="isLoggedIn" to="/admin" class="nav-link">Admin</RouterLink>
          </div>

          <!-- Right actions -->
          <div class="flex items-center gap-4">
            <RouterLink to="/auth" class="nav-link hidden sm:inline-flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ isLoggedIn ? 'Account' : 'Sign In' }}</span>
            </RouterLink>

            <button
              v-if="isLoggedIn"
              @click="logout"
              class="hidden sm:inline-flex text-sm text-stone-400 hover:text-red-500 transition-colors font-medium"
            >
              Logout
            </button>

            <!-- Cart button -->
            <button
              @click="toggleCart"
              class="relative p-2 text-stone-700 hover:text-gold-600 transition-colors"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span
                v-if="cartCount > 0"
                class="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gold-500 text-white text-[10px] font-bold flex items-center justify-center leading-none"
              >{{ cartCount }}</span>
            </button>
          </div>

        </nav>
      </div>
    </header>

    <!-- Page content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-stone-900 text-stone-400 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-gold-500">◆</span>
            <span class="font-serif text-lg text-stone-200 tracking-widest uppercase">Luxe</span>
          </div>
          <p class="text-xs tracking-widest uppercase">© 2025 Luxe Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Cart sidebar -->
    <CartBasket v-model="isCartOpen" :isVisible="isCartOpen" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useUsers } from './modules/auth/useUsers'
import { state } from './modules/globalStates/state'
import { useCart } from './modules/cart/useCart'
import CartBasket from './components/cart/CartBasketView.vue'

const isCartOpen = ref(false)
const toggleCart = () => { isCartOpen.value = !isCartOpen.value }

const { logout } = useUsers()
const isLoggedIn = computed(() => state.isLoggedIn)

const { cart } = useCart()
const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
</script>

<style scoped>
</style>
