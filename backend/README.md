# Cloudflare Worker - AI Translator

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat&logo=cloudflare&logoColor=white)
![Llama 3](https://img.shields.io/badge/Model-Llama%203-10B981?style=flat)

A Cloudflare Worker that provides AI-powered text translation using Cloudflare's AI API with the Llama 3 8B Instruct model.

## Features

- 🤖 AI-powered text translation
- 🌐 CORS-enabled for web applications
- 📦 Simple JSON API interface
- ⚡ Fast and lightweight

## Prerequisites

- Cloudflare Workers account with Workers AI enabled
- Node.js and npm installed
- `wrangler` CLI installed

```bash
npm install -g wrangler
```

## Getting Started

### Installation

```bash
npm install
```

### Configuration

1. Authenticate with Cloudflare:
```bash
npx wrangler login
```

2. Create a `wrangler.toml` file (if not present):
```toml
name = "ai-translator"
main = "worker.js"
compatibility_date = "2024-01-01"

[ai]
binding = "AI"
```

### Deployment

```bash
npx wrangler deploy
```

### Local Development

To test locally:
```bash
npx wrangler dev
```

The worker will be available at `http://localhost:8787`.

## API Reference

### Endpoint

```
POST /
```

### Request Headers

```
Content-Type: application/json
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | string | Yes | The text to translate |
| `target_language` | string | Yes | The target language for translation |

### Example Request

```bash
curl -X POST https://your-worker.workers.dev \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Hello, world!",
    "target_language": "Spanish"
  }'
```

### Response

```json
{
  "response": "¡Hola, mundo!",
  "tokens": 42
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `response` | string | The translated text |
| `tokens` | number | Total tokens used for the translation |

### Error Responses

```json
{
  "error": "Translation failed",
  "details": "Error message"
}
```

## Configuration

The worker uses the `@cf/meta/llama-3-8b-instruct` model by default. To change the model, modify `MODEL_NAME` in `worker.js`:

```javascript
const MODEL_NAME = '@cf/meta/llama-3-8b-instruct';
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
