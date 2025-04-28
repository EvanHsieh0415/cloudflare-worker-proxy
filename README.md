# Cloudflare Worker Proxy

This project is a Cloudflare Worker that acts as a proxy to fetch a URL provided in the URI. It authenticates requests using an API key set in the `.env` file.

## Setup

1. Clone the repository.
2. Create a `.env` file in the root directory of the project and add your API key:
   ```
   API_KEY=your_api_key_here
   ```

## Deployment

1. Install the Cloudflare Wrangler CLI if you haven't already:
   ```
   npm install -g @cloudflare/wrangler
   ```
2. Authenticate Wrangler with your Cloudflare account:
   ```
   wrangler login
   ```
3. Publish the worker:
   ```
   wrangler publish
   ```
