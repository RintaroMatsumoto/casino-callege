export async function onRequest(context) {
  const { request, env } = context;
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const db = env.CASINO_CALLEGE_DB;
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) return new Response('Missing userId', { status: 400, headers: corsHeaders });

  if (request.method === 'GET') {
    const result = await db.prepare('SELECT data, lastVisit, streak FROM progress WHERE userId = ?').bind(userId).first();
    return Response.json(result || { data: '{}', lastVisit: '', streak: 0 }, { headers: corsHeaders });
  }

  if (request.method === 'PUT') {
    const body = await request.json();
    const { data, lastVisit, streak } = body;
    await db.prepare(
      'INSERT INTO progress (userId, data, lastVisit, streak) VALUES (?, ?, ?, ?) ON CONFLICT(userId) DO UPDATE SET data = ?, lastVisit = ?, streak = ?'
    ).bind(userId, data, lastVisit, streak, data, lastVisit, streak).run();
    return Response.json({ ok: true }, { headers: corsHeaders });
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders });
}
