# Sharing Your Local Dev Server with Remote Colleagues

This guide explains how to share your local development server with remote team members using tunneling services.

## Quick Start

### Option 1: ngrok (Recommended)

**One-time setup:**

1. Install ngrok globally:
   ```bash
   npm install -g ngrok
   ```

2. Create a free account at https://ngrok.com

3. Add your authtoken (found in ngrok dashboard):
   ```bash
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```

**To share your site:**

```bash
# All-in-one command (starts dev server + ngrok together)
npm run tunnel:ngrok
```

Or manually in two terminals:

```bash
# Terminal 1: Start the tunnel-optimized dev server
npm run tunnel

# Terminal 2: Start ngrok
ngrok http 5173
```

Share the `https://xxxx.ngrok-free.app` URL with your colleagues.

**ngrok Free Tier Notes:**
- URL changes each restart (paid plans get static URLs)
- Visitors see a "Visit Site" interstitial on first visit
- 1 online ngrok agent
- 20,000 requests/month

---

### Option 2: localtunnel (No Sign-up Required)

**To share your site:**

```bash
# All-in-one command
npm run tunnel:localtunnel
```

Or manually:

```bash
# Terminal 1
npm run tunnel

# Terminal 2
npx localtunnel --port 5173
```

You can request a custom subdomain:

```bash
npx localtunnel --port 5173 --subdomain hyve-preview
```

**localtunnel Notes:**
- No account required
- Free and open source
- Visitors must enter their IP address on first visit (spam protection)
- Less reliable than ngrok for long sessions

---

### Option 3: Cloudflare Tunnel (Free, More Reliable)

**One-time setup:**

1. Install cloudflared:
   ```bash
   # Windows (with winget)
   winget install --id Cloudflare.cloudflared

   # macOS
   brew install cloudflared

   # Or download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
   ```

**To share your site:**

```bash
# Terminal 1
npm run tunnel

# Terminal 2
cloudflared tunnel --url http://localhost:5173
```

**Cloudflare Tunnel Notes:**
- No account required for quick tunnels
- No visitor interstitial
- Very reliable
- URLs are random but can be customized with a Cloudflare account

---

### Option 4: Tailscale Funnel (Best for Teams)

If your team already uses Tailscale VPN:

```bash
# Start dev server
npm run tunnel

# Share via Tailscale Funnel
tailscale funnel 5173
```

**Tailscale Notes:**
- Requires Tailscale account and installation
- Persistent URLs
- Best security (identity-aware)
- Ideal for teams already using Tailscale

---

## Comparison Table

| Service          | Sign-up Required | Free Tier Limits           | Visitor Interstitial | Reliability |
| ---------------- | ---------------- | -------------------------- | -------------------- | ----------- |
| ngrok            | Yes              | 20k req/month, 1 agent     | Yes                  | Excellent   |
| localtunnel      | No               | Unlimited                  | IP verification      | Good        |
| Cloudflare       | No (quick mode)  | Unlimited                  | No                   | Excellent   |
| Tailscale Funnel | Yes              | Depends on plan            | No                   | Excellent   |

---

## Available npm Scripts

| Script                  | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run tunnel`        | Start dev server in tunnel mode                |
| `npm run tunnel:ngrok`  | Start dev server + ngrok together              |
| `npm run tunnel:localtunnel` | Start dev server + localtunnel together   |

---

## Troubleshooting

### Hot Module Replacement (HMR) not working through tunnel

The Vite config has been updated to support HMR through tunnels. If you still have issues:

1. Make sure you're using `npm run tunnel` (not `npm run dev`)
2. For ngrok, the WebSocket should work automatically
3. Try a hard refresh (Ctrl+Shift+R) if changes aren't appearing

### "Invalid Host header" error

This is handled by the `TUNNEL=true` environment variable, which configures the server to accept external connections.

### Connection timeouts

Some tunnel services have idle timeouts. Keep the browser tab active or consider upgrading to a paid tier for longer sessions.

### Colleagues can't access the site

1. Make sure you shared the full HTTPS URL (not HTTP)
2. For ngrok free tier, they need to click through the interstitial
3. For localtunnel, they need to verify their IP address

---

## Security Considerations

When using tunnels:

- Your local dev server is exposed to the internet
- Only share URLs with trusted colleagues
- Tunnels should not be used for production
- The tunnel URL is temporary - stop the tunnel when done
- Development security headers are relaxed in tunnel mode for compatibility
