<template>
  <header class="bg-dark-card/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo area -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded bg-gradient-to-br from-primary-blue to-purple-600 flex items-center justify-center font-bold text-white">
          S
        </div>
        <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
          مترجم زیرنویس
        </h1>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:block flex-1 max-w-md mx-8">
        <div class="relative group">
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-gray-500 group-focus-within:text-primary-blue transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            class="block w-full pr-10 pl-3 py-2 border border-gray-700 rounded-lg leading-5 bg-dark-bg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue sm:text-sm transition-all duration-200"
            placeholder="جستجو در زیرنویس‌ها..."
            @input="$emit('search', $event.target.value)"
          />
        </div>
      </div>

      <!-- Actions -->

    </div>
  </header>
</template>

<script setup>
defineEmits(['search']);
</script>
