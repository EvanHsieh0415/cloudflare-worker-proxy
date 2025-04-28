import { config } from 'dotenv';
config();

const API_KEY = process.env.API_KEY;

async function handleRequest(request) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  const apiKey = request.headers.get('x-api-key');

  if (!apiKey || apiKey !== API_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!targetUrl) {
    return new Response('Bad Request: Missing target URL', { status: 400 });
  }

  try {
    const response = await fetch(targetUrl);
    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });
  } catch (error) {
    return new Response('Error fetching target URL', { status: 500 });
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
