<template>
  <div
    class="relative w-full p-10 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out text-center cursor-pointer group"
    :class="[
      isDragging
        ? 'border-primary-blue bg-primary-blue/10 scale-[1.02]'
        : 'border-gray-600 hover:border-primary-blue/50 hover:bg-dark-card'
    ]"
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @dragover.prevent
    @drop.prevent="handleDrop"
    @click="$refs.fileInput.click()"
  >
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      accept=".srt,.vtt"
      @change="handleFileSelect"
    />
    
    <div class="flex flex-col items-center gap-4">
      <div 
        class="p-4 rounded-full bg-dark-card group-hover:bg-primary-blue/20 transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 group-hover:text-primary-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-xl font-semibold text-gray-200">آپلود فایل SRT</h3>
        <p class="text-gray-400 text-sm">
          فایل خود را اینجا بکشید و رها کنید یا <span class="text-primary-blue">مرور کنید</span>
        </p>
        <p class="text-xs text-gray-500 mt-2">پشتیبانی از .srt و .vtt</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['file-loaded']);
const isDragging = ref(false);
const fileInput = ref(null);

const handleFile = (file) => {
  if (file && (file.name.endsWith('.srt') || file.name.endsWith('.vtt'))) {
    emit('file-loaded', file);
  } else {
    alert('لطفاً یک فایل معتبر .srt یا .vtt انتخاب کنید');
  }
};

const handleDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer.files[0];
  handleFile(file);
};

const handleFileSelect = (e) => {
  const file = e.target.files[0];
  handleFile(file);
};
</script>
