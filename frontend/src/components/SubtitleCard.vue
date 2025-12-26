<template>
  <div class="grid grid-cols-1 md:grid-cols-2 group hover:bg-white/[0.02] transition-colors duration-200">
    <!-- Original Text Column -->
    <div class="p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-700/50 flex flex-col gap-3" dir="ltr">
      <!-- Metadata Header -->
      <div class="flex justify-between items-center mb-1">
        <span class="text-xs font-mono text-gray-500">{{ block.startTime }} --> {{ block.endTime }}</span>
        <span class="px-2.5 py-0.5 rounded-md bg-white text-primary-blue text-xs font-bold shadow-sm">
          بلاک {{ index + 1 }}
        </span>
      </div>
      
      <!-- Input Area -->
      <textarea
        v-model="block.originalText"
        readonly
        class="w-full bg-dark-bg border border-gray-700 rounded-lg p-4 text-sm text-gray-300 focus:outline-none resize-none min-h-[80px] leading-relaxed"
      ></textarea>
    </div>

    <!-- Translated Text Column -->
    <div class="p-4 md:p-6 flex flex-col gap-3 relative" dir="rtl">
      <!-- Metadata Header -->
      <div class="flex justify-between items-center mb-1">
        <span class="text-xs font-mono text-gray-500" dir="ltr">{{ block.startTime }} --> {{ block.endTime }}</span>
        <div class="flex items-center gap-2">
          <!-- Translation Indicator -->
          <span v-if="block.isTranslating" class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-blue opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-blue"></span>
          </span>
          
          <span class="px-2.5 py-0.5 rounded-md bg-white text-primary-blue text-xs font-bold shadow-sm">
            بلاک {{ index + 1 }}
          </span>
        </div>
      </div>

      <!-- Input Area -->
      <textarea
        v-model="block.translatedText"
        class="w-full bg-dark-bg border border-gray-700 rounded-lg p-4 text-sm text-gray-200 font-vazir focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all resize-none min-h-[80px] leading-relaxed"
        placeholder="ترجمه..."
      ></textarea>
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
