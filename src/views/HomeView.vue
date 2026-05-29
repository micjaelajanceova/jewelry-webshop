<template>
  <div>
    <!-- Hero -->
    <section class="relative h-[85vh] min-h-[520px] flex items-center overflow-hidden bg-stone-900">
      <img
        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80"
        alt="Jewelry hero"
        class="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <p class="text-gold-400 text-xs tracking-widest uppercase mb-4 font-medium">New Collection 2025</p>
        <h1 class="font-serif text-5xl sm:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 max-w-2xl">
          Crafted for<br /><em class="text-gold-400 not-italic">Timeless</em> Beauty
        </h1>
        <p class="text-stone-300 text-lg max-w-lg mb-10 leading-relaxed font-light">
          Discover our curated selection of handcrafted fine jewelry — each piece tells a story worth wearing.
        </p>
        <div class="flex flex-wrap gap-4">
          <RouterLink to="/jewelry" class="btn-primary">
            Shop Collection
          </RouterLink>
          <RouterLink to="/about" class="inline-flex items-center gap-2 text-stone-200 text-sm font-medium tracking-wide hover:text-gold-400 transition-colors">
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Trust bar -->
    <section class="bg-white border-b border-stone-150">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-150">
          <div v-for="feature in features" :key="feature.label" class="flex items-center gap-3 py-6 px-4 md:px-6">
            <span class="text-gold-500 text-xl flex-shrink-0">{{ feature.icon }}</span>
            <div>
              <p class="text-stone-900 text-sm font-semibold">{{ feature.label }}</p>
              <p class="text-stone-500 text-xs">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="page-wrapper">
      <div class="text-center mb-12">
        <p class="section-subtitle">Browse by category</p>
        <h2 class="section-title">Our Collections</h2>
        <div class="gold-divider mx-auto"></div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="cat in categories"
          :key="cat.label"
          class="relative overflow-hidden rounded-sm cursor-pointer group"
        >
          <img :src="cat.img" :alt="cat.label" class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/55 transition-colors duration-300 flex items-end p-4">
            <p class="text-white font-serif text-lg">{{ cat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA strip -->
    <section class="bg-stone-900 py-16">
      <div class="max-w-3xl mx-auto text-center px-4">
        <p class="text-gold-400 text-xs tracking-widest uppercase mb-3">Newsletter</p>
        <h2 class="font-serif text-3xl text-white mb-4">Stay in the loop</h2>
        <p class="text-stone-400 text-sm mb-8">Get early access to new arrivals, exclusive offers and styling inspiration.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input type="email" placeholder="Your email address" class="input-field flex-1 bg-stone-800 border-stone-700 text-white placeholder-stone-500" />
          <button class="btn-primary whitespace-nowrap">Subscribe</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const features = [
  { icon: '✦', label: 'Free Shipping', desc: 'On orders over $150' },
  { icon: '◈', label: 'Certified Quality', desc: 'Every piece verified' },
  { icon: '↩', label: '30-Day Returns', desc: 'Hassle-free process' },
  { icon: '◉', label: 'Secure Payment', desc: 'SSL encrypted checkout' },
]

const categories = [
  { label: 'Necklaces', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=70' },
  { label: 'Rings',     img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=70' },
  { label: 'Bracelets', img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=70' },
  { label: 'Earrings',  img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=70' },
]
</script>
