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
        <!-- Control Panel -->
        <div class="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6 shadow-xl">
          <div class="flex flex-col gap-6">
            <!-- Top Row: Status & Info -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 class="text-xl font-bold text-white">پیشرفت ترجمه</h3>
              
              <!-- Language Indicators -->
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700">
                  <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span class="text-gray-300 text-sm">مبدأ: خودکار</span>
                </div>
                <div class="text-gray-500">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700">
                  <span class="w-2 h-2 rounded-full bg-green-500"></span>
                  <span class="text-gray-300 text-sm">مقصد: فارسی</span>
                </div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-400 text-sm font-medium">پیشرفت</span>
                <span class="text-blue-400 font-bold select-none">{{ Math.round(progress) }}%</span>
              </div>
              <div class="h-4 bg-gray-900 rounded-full overflow-hidden shadow-inner ring-1 ring-gray-700/50">
                <div 
                  class="h-full bg-gradient-to-l from-blue-600 to-blue-400 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)] relative"
                  :style="{ width: `${progress}%` }"
                >
                  <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Actions Row -->
            <div class="flex flex-col sm:flex-row items-center gap-3 w-full">
              <!-- Start/Stop Button -->
              <button 
                @click="isProcessing ? stopTranslation() : translateAll()"
                class="w-full sm:flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
                :class="isProcessing 
                  ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-red-500/20' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/20'"
              >
                <div v-if="!isProcessing" class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>شروع ترجمه</span>
                </div>
                <div v-else class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>توقف ترجمه</span>
                </div>
              </button>

              <!-- Download Button -->
              <button 
                :disabled="!subtitles.some(b => b.translatedText)"
                @click="downloadSRT"
                class="w-full sm:flex-1 py-3 px-6 rounded-xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 border"
                :class="subtitles.some(b => b.translatedText)
                  ? 'bg-green-600 border-transparent text-white hover:bg-green-500 shadow-lg shadow-green-500/20'
                  : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>ذخیره زیرنویس</span>
              </button>

               <!-- New Upload Link/Button -->
              <button 
                @click="clearSubtitles"
                class="w-full sm:w-auto py-3 px-4 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-600 transition-all text-sm"
                title="آپلود فایل جدید"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
            
            </div>
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
