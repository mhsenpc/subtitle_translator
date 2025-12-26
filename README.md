# SRT Translator

AI-powered subtitle translator using Vue.js and Cloudflare Workers.

## Features

- Upload SRT subtitle files
- Translate subtitles to Persian (Farsi) using AI
- Real-time translation progress tracking
- Concurrent translation processing (up to 5 requests)
- Search and filter subtitles
- Download translated subtitles
- Responsive Persian interface

## Tech Stack

**Frontend:**
- Vue 3
- Vite
- Tailwind CSS
- Composition API

**Backend:**
- Cloudflare Workers
- Cloudflare AI (meta/m2m100-1.2b model)

## Installation

### Prerequisites

- Node.js 18+
- Cloudflare account (for deployment)
- wrangler CLI (optional, for local development)

### Frontend Setup

```bash
cd frontend
npm install
```

## Development

### Run Frontend

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

### Backend Development

The backend is a Cloudflare Worker. To develop locally:

```bash
cd backend
npx wrangler dev
```

## Deployment

### Frontend

```bash
cd frontend
npm run build
```

Deploy the `dist/` folder to your hosting service.

### Backend

```bash
cd backend
npx wrangler deploy
```

Update the API endpoint in `frontend/src/composables/useSubtitles.js:94` with your worker URL.

## Configuration

### Backend API URL

Edit `frontend/src/composables/useSubtitles.js` and update the fetch URL:

```javascript
const response = await fetch('YOUR_WORKER_URL', {
```

### Target Language

Default target is set to "persian" in `frontend/src/composables/useSubtitles.js:101`. Modify the `target_language` parameter to change the target language.

## Usage

1. Upload an SRT file using the drag-and-drop zone
2. Click "شروع ترجمه" (Start Translation)
3. Monitor progress and stop anytime if needed
4. Search through subtitles using the header search bar
5. Click "ذخیره زیرنویس" (Save Subtitle) to download the translated file

## Project Structure

```
srt_translator/
├── backend/
│   └── worker.js          # Cloudflare Worker backend
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/    # Vue components
│       ├── composables/   # Vue composables
│       └── App.vue        # Main application
└── README.md
```

## License

MIT
