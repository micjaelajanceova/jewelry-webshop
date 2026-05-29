<template>
  <div class="min-h-screen grid md:grid-cols-2">

    <!-- Left: image panel -->
    <div class="hidden md:block relative overflow-hidden bg-stone-900">
      <img
        src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80"
        alt="Jewelry"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div class="relative z-10 flex flex-col justify-end h-full p-12">
        <span class="text-gold-400 text-3xl mb-3">◆</span>
        <h2 class="font-serif text-4xl text-white font-bold leading-tight mb-3">
          Wear what<br />matters most.
        </h2>
        <p class="text-stone-300 text-sm max-w-xs leading-relaxed">
          Sign in to access your orders, manage your wishlist, and enjoy a personalised experience.
        </p>
      </div>
    </div>

    <!-- Right: forms -->
    <div class="flex items-center justify-center bg-stone-50 px-6 py-16">
      <div class="w-full max-w-sm">

        <!-- Logo -->
        <div class="flex items-center gap-2 mb-10">
          <span class="text-gold-500">◆</span>
          <span class="font-serif text-xl text-stone-900 tracking-widest uppercase font-bold">Luxe</span>
        </div>

        <!-- Login form -->
        <div>
          <h1 class="font-serif text-2xl text-stone-900 font-semibold mb-1">Welcome back</h1>
          <p class="text-stone-400 text-sm mb-8">Sign in to your account</p>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="text"
                v-model="email"
                placeholder="you@example.com"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                v-model="password"
                placeholder="••••••••"
                class="input-field"
              />
            </div>
          </div>

          <button
            @click="fetchToken(email, password)"
            class="btn-primary w-full mt-6"
          >
            Sign In
          </button>
          <button
            @click="logout()"
            class="btn-ghost w-full mt-2 text-stone-400 hover:text-red-500"
          >
            Sign Out
          </button>
        </div>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-8">
          <div class="flex-1 h-px bg-stone-200"></div>
          <span class="text-stone-400 text-xs uppercase tracking-widest">or</span>
          <div class="flex-1 h-px bg-stone-200"></div>
        </div>

        <!-- Register toggle -->
        <div>
          <button
            @click="toggleRegisterDialog"
            class="w-full flex items-center justify-between text-stone-700 hover:text-gold-600 transition-colors group"
          >
            <span class="text-sm font-medium">Create an account</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <!-- Register panel -->
          <div v-if="registerOpen" class="mt-6 p-5 bg-white border border-stone-150 space-y-4">
            <h3 class="font-serif text-lg text-stone-900 font-semibold">New Account</h3>
            <div>
              <label class="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-1.5">Name</label>
              <input type="text" v-model="name" placeholder="Your full name" class="input-field" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-1.5">Email</label>
              <input type="text" v-model="email" placeholder="you@example.com" class="input-field" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-1.5">Password</label>
              <input type="password" v-model="password" placeholder="••••••••" class="input-field" />
            </div>
            <button
              @click="registerUser(name, email, password)"
              class="btn-primary w-full"
            >
              Create Account
            </button>
            <button @click="toggleRegisterDialog" class="btn-ghost w-full text-stone-400">Cancel</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUsers } from '@/modules/auth/useUsers'

const { fetchToken, registerUser, logout, name, email, password } = useUsers()

const registerOpen = ref(false)
const toggleRegisterDialog = () => { registerOpen.value = !registerOpen.value }
</script>
