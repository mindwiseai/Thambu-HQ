// NOTE: As of 2026-04-15 the public tunnel is handled by Tailscale Funnel,
// not Cloudflare. Tailscale is managed by its own daemon; it persists the
// funnel config across restarts on its own. PM2 only manages the bot itself.
//
// The stable webhook URL is: https://mindwise.tail301de7.ts.net/webhook
//
// Fallback: if Tailscale ever fails, uncomment the `racesims-tunnel` entry
// below to fall back to a Cloudflare quick tunnel (rotating URL, re-paste
// into Meta each time).

module.exports = {
  apps: [
    {
      name: 'racesims-ai',
      script: 'src/index.js',
      cwd: '/Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims/racesims-ai-assistant',
      env: {
        NODE_ENV: 'production'
      },
      watch: false,
      max_memory_restart: '200M',
      error_file: './data/error.log',
      out_file: './data/output.log',
      time: true,
      restart_delay: 5000,
      max_restarts: 10
    }
    // FALLBACK — re-add if Tailscale Funnel is ever unavailable:
    // {
    //   name: 'racesims-tunnel',
    //   script: './cloudflared',
    //   args: 'tunnel --url http://localhost:3000 --no-autoupdate',
    //   cwd: '/Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims/racesims-ai-assistant',
    //   interpreter: 'none',
    //   watch: false,
    //   autorestart: true,
    //   max_memory_restart: '200M',
    //   error_file: './data/tunnel.log',
    //   out_file: './data/tunnel.log',
    //   time: true,
    //   restart_delay: 5000,
    //   max_restarts: 20
    // }
  ]
};
