<template>
  <div class="h-screen flex flex-col bg-dark-bg text-gray-100 overflow-hidden">
    <AppHeader @search="handleSearch" />

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col overflow-hidden">
      <!-- File Upload State -->
      <div v-if="subtitles.length === 0" class="flex flex-col items-center justify-center h-full animate-fade-in-up">
        <div class="max-w-xl w-full">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500 mb-4">
              مترجم زیرنویس با هوش مصنوعی
            </h2>
            <p class="text-gray-400 text-lg">
              فایل SRT خود را بارگذاری کنید تا هوش مصنوعی ما آن را با کیفیت بالا به فارسی ترجمه کند
            </p>
          </div>
          
          <DropZone @file-loaded="loadFile" />
        </div>
      </div>


      <!-- Editor State -->
      <div v-else class="animate-fade-in flex flex-col h-full overflow-hidden">
        <!-- Toolbar & Actions -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-1">
          <!-- Language Indicators -->
          <div class="flex items-center gap-3 order-2 md:order-1">
            <div class="px-4 py-2 rounded bg-green-900/20 border border-green-800/50 text-green-400 text-sm font-medium">
              زبان مقصد: فارسی
            </div>
            <div class="px-4 py-2 rounded bg-blue-900/20 border border-blue-800/50 text-blue-400 text-sm font-medium">
              زبان مبدأ: از هر زبانی
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center gap-3 order-1 md:order-2">
            <button 
              @click="clearSubtitles"
              class="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800 transition-all text-sm"
            >
              آپلود جدید
            </button>
            <button 
              @click="isProcessing ? stopTranslation() : translateAll()"
              class="px-6 py-2 rounded-lg text-white font-medium shadow-lg transition-all flex items-center gap-2 min-w-[140px] justify-center"
              :class="isProcessing ? 'bg-red-500 hover:bg-red-600 shadow-red-500/25' : 'bg-primary-blue hover:bg-blue-600 shadow-primary-blue/25'"
            >
              <template v-if="!isProcessing">
                <span>شروع ترجمه</span>
              </template>
              <template v-else>
                <span>توقف ({{ progress }}%)</span>
              </template>
            </button>
            
            <button
               v-if="subtitles.some(b => b.translatedText)"
               @click="downloadSRT"
               class="px-4 py-2 rounded-lg border border-gray-600 bg-dark-card hover:bg-gray-800 text-gray-300 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>دانلود</span>
            </button>
          </div>
        </div>

        <!-- Progress Bar (Visible when processing) -->
        <div v-if="isProcessing || progress > 0" class="w-full bg-gray-800 h-1 mb-6 rounded-full overflow-hidden">
             <div class="bg-primary-blue h-full transition-all duration-300" :style="{ width: `${progress}%` }"></div>
        </div>

        <!-- Main List Container -->
        <div class="flex-1 flex flex-col bg-dark-card border border-gray-700/50 rounded-lg overflow-hidden shadow-2xl">
          <!-- Column Headers -->
          <div class="grid grid-cols-2 border-b border-gray-700/50 bg-gray-800/30">
            <div class="p-4 text-center text-gray-400 font-medium text-lg border-r border-gray-700/30">متن اصلی</div>
            <div class="p-4 text-center text-gray-400 font-medium text-lg">متن ترجمه شده</div>
          </div>

          <!-- Subtitles List -->
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div class="divide-y divide-gray-700/50">
              <SubtitleCard 
                v-for="(block, index) in filteredSubtitles" 
                :key="index"
                :block="block"
                :index="index"
              />
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import DropZone from './components/DropZone.vue';
import SubtitleCard from './components/SubtitleCard.vue';
import { useSubtitles } from './composables/useSubtitles';

const { subtitles, fileName, loadFile, clearSubtitles, translateAll, stopTranslation, downloadSRT, isProcessing, progress } = useSubtitles();
const searchQuery = ref('');

const handleSearch = (query) => {
  searchQuery.value = query;
};

const filteredSubtitles = computed(() => {
  if (!searchQuery.value) return subtitles.value;
  const q = searchQuery.value.toLowerCase();
  return subtitles.value.filter(block => 
    block.originalText.toLowerCase().includes(q) || 
    block.translatedText.toLowerCase().includes(q)
  );
});
</script>

<style>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05); 
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2); 
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3); 
}
</style>
