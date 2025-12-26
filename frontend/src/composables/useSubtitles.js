import { ref, computed } from 'vue';

const subtitles = ref([]);
const fileName = ref('');
const isProcessing = ref(false);
const progress = ref(0);

export function useSubtitles() {

    const parseSRT = (content) => {
        isProcessing.value = true;
        try {
            // Normalize line endings
            const text = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            const blocks = text.trim().split(/\n\n+/);

            const parsed = blocks.map((block, index) => {
                const lines = block.split('\n');
                // Handle cases where the first line might be missing the index if the file is malformed
                let idLine = lines[0];
                let timeLine = lines[1];
                let textLines = lines.slice(2);

                // Basic validation or fallback
                if (idLine.includes('-->')) {
                    timeLine = idLine;
                    textLines = lines.slice(1);
                    idLine = index + 1;
                }

                // Parse time
                let startTime = '';
                let endTime = '';
                if (timeLine && timeLine.includes('-->')) {
                    const [start, end] = timeLine.split('-->').map(t => t.trim());
                    startTime = start;
                    endTime = end;
                }

                return {
                    id: idLine,
                    startTime,
                    endTime,
                    originalText: textLines.join('\n'),
                    translatedText: '',
                    isTranslating: false
                };
            }).filter(b => b.startTime); // Filter out bad blocks

            subtitles.value = parsed;
        } catch (e) {
            console.error("Parsing error", e);
            alert("Failed to parse SRT file");
        } finally {
            isProcessing.value = false;
        }
    };

    const loadFile = (file) => {
        fileName.value = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            parseSRT(e.target.result);
        };
        reader.readAsText(file);
    };

    const isStopped = ref(false);

    const stopTranslation = () => {
        isStopped.value = true;
        isProcessing.value = false;
    };

    const translateAll = async () => {
        isProcessing.value = true;
        isStopped.value = false;
        progress.value = 0;
        
        const itemsToTranslate = subtitles.value.filter(item => !item.translatedText);
        const total = subtitles.value.length;
        // Count already filtered as completed for progress calculation base
        let completedCount = total - itemsToTranslate.length;

        const MAX_CONCURRENT = 5;
        const queue = [...itemsToTranslate];
        const activePromises = new Set();

        const processItem = async (item) => {
            if (isStopped.value) return;

            item.isTranslating = true;
            try {
                const response = await fetch('https://translator-backend.mhsenpc.workers.dev/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        input: item.originalText,
                        target_language: "persian"
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data && data.response) {
                    item.translatedText = data.response;
                } else {
                     throw new Error('Invalid response format');
                }
            } catch (e) {
                console.error("Translation error", e);
                // Optionally mark as error or leave blank to retry
            } finally {
                item.isTranslating = false;
                if (!isStopped.value) {
                    completedCount++;
                    progress.value = Math.round((completedCount / total) * 100);
                }
            }
        };

        while ((queue.length > 0 || activePromises.size > 0) && !isStopped.value) {
            // Fill the active queue
            while (activePromises.size < MAX_CONCURRENT && queue.length > 0 && !isStopped.value) {
                const item = queue.shift();
                const promise = processItem(item);
                activePromises.add(promise);
                promise.then(() => activePromises.delete(promise));
            }

            // If we have active promises, wait for one to finish
            if (activePromises.size > 0) {
                await Promise.race(activePromises);
            }
        }

        isProcessing.value = false;
        isStopped.value = false;
    };

    const clearSubtitles = () => {
        subtitles.value = [];
        fileName.value = '';
    };

    const downloadSRT = () => {
        let content = '';
        subtitles.value.forEach((block, index) => {
            content += `${index + 1}\n`;
            content += `${block.startTime} --> ${block.endTime}\n`;
            content += `${block.translatedText || block.originalText}\n\n`;
        });

        const blob = new Blob([content], { type: 'text/srt' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.value.replace('.srt', '_fa.srt').replace('.vtt', '_fa.vtt');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return {
        subtitles,
        fileName,
        loadFile,
        clearSubtitles,
        translateAll,
        stopTranslation,
        downloadSRT,
        isProcessing,
        progress
    };
}
