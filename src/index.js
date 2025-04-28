export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = request.headers.get('x-url');

    if (!targetUrl) {
      return new Response('Bad Request: Missing target URL', { status: 400 });
    }

    try {
      const headers = new Headers(request.headers);
      headers.delete('x-api-key');

      const response = await fetch(targetUrl, {
        method: request.method,
        headers: headers,
        body: request.body
      });

      const arrayBuffer = await response.arrayBuffer();

      return new Response(arrayBuffer, {
        status: response.status,
        headers: response.headers
      });
    } catch (error) {
      return new Response('Error fetching target URL', { status: 500 });
    }
  }
};
