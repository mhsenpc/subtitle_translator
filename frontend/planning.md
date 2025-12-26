# SRT Parser/Translator - Frontend Planning

A web-based SRT (SubRip) subtitle file parser and translator application with a modern dark-mode interface.

---

## Core Features

### 1. File Upload & Management
- **Drag-and-drop zone**: Users can drag SRT/VTT files into a designated dropzone area
- **Click-to-upload**: Alternative file selection via file input
- **Supported formats**: `.srt` and `.vtt`
- **File info display**: Show uploaded filename with remove option

### 2. Subtitle Parsing & Display
- Parse uploaded SRT/VTT files into individual subtitle blocks
- Each block should contain:
  - Block number (sequence index)
  - Start time
  - End time
  - Original text
- Render blocks as individual div cards in the editor panel
- Two-column layout: Original text | Translated text

### 3. Translation Engine
- **AI-powered translation**: backend will handle this (test.cloudflare.com)
- **Source language**: Auto-detect or specify (any language supported)
- **Target language**: Persian (Farsi) as primary target
- **Batch processing**: Translate in configurable block sizes
- **Progress tracking**: Show real-time translation progress



### 6. Progress & Controls
- **Progress bar**: Visual progress indicator with percentage
- **Status messages**: Real-time feedback on translation status
- **Control buttons**:
  - Start Translation
  - Continue Translation (for resuming interrupted sessions)
  - Stop Translation
  - Save/Download translated subtitle file
- **Token/block usage display**: Show number of subtitle blocks processed

### 7. Search Functionality
- Search input in header
- Filter/highlight subtitle blocks matching search query

---

## UI/UX Design

### Theme
- **Dark mode**: Primary dark gray background (#111827)
- **Color palette**: Blue accents (#3b82f6), gray tones (#1f2937, #374151)
- **Persian/RTL support**: Right-to-left layout, Vazir font

### Layout Structure
```
+--------------------------------------------------+
|                     HEADER                        |
|  [Logo/Profile]  [Title]          [Search Bar]   |
+--------------------------------------------------+
|                                                   |
|  SIDEBAR (1/3)         |    MAIN EDITOR (2/3)    |
|                        |                          |
|  - File Upload         |    +---------------+     |
|                        |    | Header Row    |     |
|                        |    +-------+-------+     |
|                        |    | Trans | Orig  |     |
|                        |    +-------+-------+     |
|                        |    | Block 1       |     |
|                        |    | Block 2       |     |
|                        |    | ...           |     |
+--------------------------------------------------+
|                     FOOTER                        |
|  [Copyright]  [Social Links]                      |
+--------------------------------------------------+
```

### Components
- **Dropzone**: Dashed border area with upload icon and instructions
- **Collapsible sections**: Settings and subscription sections with toggle buttons
- **Subtitle blocks**: Cards with hover effects, shadow, border
- **Buttons**: Primary (blue), Secondary (gray), Success (green), Danger (red)
- **Input fields**: Dark background with blue focus ring
- **Modals**: Centered overlay dialogs for subscriptions, YouTube, etc.

### Animations & Transitions
- Hover effects on subtitle blocks (translateY, shadow)
- Smooth transitions on background, color, and border changes
- Loading spinner animation for async operations
- Progress bar transition on width change

---

## Technical Implementation

### File Structure
```
frontend/
├── index.html       # Main HTML structure
├── app.js           # JavaScript logic
├── styles.css       # Custom styles (if not inline)
└── assets/
    └── iSegaro.png  # Profile/logo image
```

### Key JavaScript Modules
1. **File Handler**: Parse SRT/VTT files, extract blocks
2. **Renderer**: Display subtitle blocks in editor panel
3. **Translator**: API integration for translation calls
4. **State Manager**: Track progress, settings, subscription status
5. **UI Controller**: Handle button clicks, modal toggles, search

### External Dependencies
- **Tailwind CSS**: Via CDN for utility classes
- **Vazir Font**: Persian font via CDN
- **Inter Font**: Latin font via Google Fonts

### API Integration
- Translation API endpoint for AI-powered translations
- Subscription validation endpoint
- Payment gateway integration
- (Optional) YouTube subtitle fetching service

---

## Accessibility
- Semantic HTML elements (`<header>`, `<main>`, `<footer>`, `<section>`, `<aside>`)
- ARIA labels and roles
- Screen reader support (`sr-only` labels)
- Keyboard navigation (`tabindex`)
- `aria-live` regions for status updates

---

## Future Enhancements
- [ ] Multi-language target support (not just Persian)
- [ ] Light/dark mode toggle
- [ ] User authentication/login
- [ ] Translation history/saved projects
- [ ] Bulk file processing
- [ ] Side-by-side video preview with synced subtitles
- [ ] Export to multiple formats (SRT, VTT, ASS)