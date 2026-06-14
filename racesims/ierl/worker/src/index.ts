import type { Env } from './types';
import { handleApi } from './api';
import { runScrape } from './scraper';

export default {
  async fetch(req: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname.startsWith('/api/')) {
      // CORS preflight (kiosk POSTs application/json from the Pages origin).
      if (req.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'access-control-allow-origin': '*',
            'access-control-allow-methods': 'GET, POST, OPTIONS',
            'access-control-allow-headers': 'content-type',
            'access-control-max-age': '86400',
          },
        });
      }

      // Admin force-refresh — gated by ADMIN_TOKEN.
      if (url.pathname === '/api/admin/scrape' && req.method === 'POST') {
        const token = url.searchParams.get('token') ?? req.headers.get('x-admin-token') ?? '';
        if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
          return new Response(JSON.stringify({ error: 'forbidden' }), {
            status: 403,
            headers: { 'content-type': 'application/json' },
          });
        }
        const result = await runScrape(env, { force: true });
        return new Response(JSON.stringify(result, null, 2), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      }

      return handleApi(req, env, url);
    }

    // Worker only serves /api/*. Pages serves the rest.
    return new Response('IERL Worker — public traffic goes to Pages', {
      status: 404,
      headers: { 'content-type': 'text/plain' },
    });
  },

  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(
      runScrape(env).catch((e) => {
        console.error('scheduled scrape failed', e);
      })
    );
  },
};
