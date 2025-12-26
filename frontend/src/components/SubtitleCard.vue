<template>
  <div 
    class="bg-dark-card border border-gray-700/50 rounded-lg p-4 hover:border-primary-blue/30 hover:shadow-lg hover:shadow-primary-blue/5 transition-all duration-300 group"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-3 text-xs text-gray-500 font-mono">
      <div class="flex items-center gap-2">
        <span class="bg-gray-800 px-2 py-0.5 rounded text-gray-400">#{{ index + 1 }}</span>
        <span>{{ block.startTime }} --> {{ block.endTime }}</span>
        <span v-if="block.isTranslating" class="ml-2 flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-blue opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-blue"></span>
        </span>
      </div>
      <div class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <!-- Action buttons could go here -->
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Original Text -->
      <div class="relative" dir="ltr">
        <div class="absolute -top-6 left-0 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">متن اصلی</div>
        <textarea
          v-model="block.originalText"
          readonly
          class="w-full bg-dark-bg/50 border border-gray-700 rounded p-3 text-sm text-gray-300 focus:outline-none focus:border-primary-blue/50 resize-none min-h-[80px]"
        ></textarea>
      </div>

      <!-- Translated Text -->
      <div class="relative" dir="rtl">
        <div class="absolute -top-6 right-0 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">فارسی</div>
        <textarea
          v-model="block.translatedText"
          class="w-full bg-dark-bg/50 border border-gray-700 rounded p-3 text-sm text-gray-200 font-vazir focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/50 resize-none min-h-[80px]"
          placeholder="ترجمه اینجا ظاهر می‌شود..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
</script>
