// Serves the site's static files on Cloudflare, adding security headers and sending www.<your domain> to the bare
// domain. Nothing is logged, counted or stored.

// Baseline security headers added to every response. CSP is intentionally
// omitted — the inline scripts, styles and SVG in index.html need a
// considered policy that's worth designing separately.
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'Permissions-Policy': 'interest-cohort=(), browsing-topics=(), geolocation=(), camera=(), microphone=(), payment=()',
};

function withSecurity(response) {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Apex hostname for the canonical 301 redirect. Set this to the domain you
// serve the site from (no scheme, no www). The redirect collapses the
// www subdomain so Google Search Console doesn't report duplicate URLs as
// "Alternate page with proper canonical tag." Leave as null/empty to skip
// the redirect entirely (e.g. while previewing on workers.dev).
const APEX_HOST = 'your-domain.example';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Canonicalize host — 301 www.<apex> → <apex>, keeping path and query so
    // deep links (?utm_*, etc.) carry through.
    if (APEX_HOST && url.hostname === 'www.' + APEX_HOST) {
      url.hostname = APEX_HOST;
      return withSecurity(Response.redirect(url.toString(), 301));
    }

    return withSecurity(await env.ASSETS.fetch(request));
  },
};
