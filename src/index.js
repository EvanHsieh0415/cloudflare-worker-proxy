export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = request.headers.get('x-url');

    if (!targetUrl) {
      return new Response('Bad Request: Missing target URL', { status: 400 });
    }

    try {
      const nHeaders = new Headers(request.headers);
      nHeaders.delete('x-api-key');

      const { method, body, status, headers } = request;
      
      const response = await fetch(targetUrl, {
        method,
        headers: nHeaders,
        body
      });

      const arrayBuffer = await response.arrayBuffer();

      return new Response(arrayBuffer, {
        status,
        headers: response.headers
      });
    } catch (error) {
      return new Response('Error fetching target URL', { status: 500 });
    }
  }
};
