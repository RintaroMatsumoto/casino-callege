export async function onRequest(context) {
  const { request, env } = context
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const db = env.CASINO_CALLEGE_DB

  if (request.method === 'GET') {
    const result = await db.prepare('SELECT value FROM counter WHERE id = 1').first()
    return Response.json({ count: result?.value || 0 }, { headers: corsHeaders })
  }

  if (request.method === 'POST') {
    await db.prepare('UPDATE counter SET value = value + 1 WHERE id = 1').run()
    const result = await db.prepare('SELECT value FROM counter WHERE id = 1').first()
    return Response.json({ count: result.value }, { headers: corsHeaders })
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders })
}
