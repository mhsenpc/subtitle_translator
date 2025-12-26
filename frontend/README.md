# SRT Translator

A modern web-based subtitle file parser and translator application with a sleek dark-mode interface. Built with Vue 3, Vite, and Tailwind CSS.

## Features

- 📁 **File Upload**: Drag-and-drop or click-to-upload SRT/VTT subtitle files
- 🎯 **Subtitle Parsing**: Automatically parse subtitle files into individual blocks
- 🌐 **AI-Powered Translation**: Translate subtitles to Persian (Farsi) or other languages
- 📊 **Progress Tracking**: Real-time translation progress with visual indicators
- 🔍 **Search Functionality**: Search through subtitle blocks quickly
- 🎨 **Modern UI**: Dark mode interface with smooth animations
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation tool
- **Autoprefixer** - PostCSS plugin for vendor prefixes

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/srt-translator.git
cd srt-translator/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── vue.svg
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── DropZone.vue
│   │   └── SubtitleCard.vue
│   ├── composables/
│   │   └── useSubtitles.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Usage

1. **Upload a File**: Drag and drop an SRT or VTT file into the drop zone, or click to select a file
2. **View Subtitles**: The application will parse and display all subtitle blocks
3. **Translate**: Click the translation button to start translating subtitles to your target language
4. **Monitor Progress**: Watch the progress bar and status messages during translation
5. **Download**: Save the translated subtitle file when complete

## Features in Detail

### File Upload
- Drag-and-drop zone with visual feedback
- Click-to-upload alternative
- Support for `.srt` and `.vtt` formats
- File info display with remove option

### Translation Engine
- AI-powered translation via backend API
- Batch processing for efficiency
- Configurable block sizes
- Real-time progress tracking

### UI/UX
- Dark mode interface (#111827 background)
- Blue accent colors (#3b82f6)
- RTL support for Persian/Farsi
- Smooth animations and transitions
- Hover effects on subtitle cards

## Future Enhancements

- [ ] Multi-language target support
- [ ] Light/dark mode toggle
- [ ] User authentication
- [ ] Translation history
- [ ] Bulk file processing
- [ ] Video preview with synced subtitles
- [ ] Export to multiple formats (SRT, VTT, ASS)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
