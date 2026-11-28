// Same-origin clients can check readiness without exposing provider diagnostics.
export const config = {
  path: '/api/agent/status',
  method: 'GET',
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

export default function status(request: Request): Response {
  const available = process.env.AGENT_ENABLED === 'true' && Boolean(process.env.ANTHROPIC_API_KEY?.trim());
  return Response.json({ available: request.method === 'GET' && available }, {
    status: request.method === 'GET' ? 200 : 405,
    headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
}
