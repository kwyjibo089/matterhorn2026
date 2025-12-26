// Cloudflare Pages Function - /api/hit
// Handles analytics tracking with KV storage

export async function onRequestPost(context) {
  try {
    const { clientId } = await context.request.json();
    if (!clientId) return new Response('clientId required', { status: 400 });
    
    // Get current stats from KV
    const stats = await context.env.ANALYTICS.get('stats', { type: 'json' }) || { 
      total: 0, 
      unique: {} 
    };
    
    // Track unique visitor
    if (!stats.unique[clientId]) {
      stats.unique[clientId] = { firstSeen: Date.now(), hits: 0 };
    }
    
    // Deduplicate: only count 1 hit per day per client
    const lastHit = stats.unique[clientId].lastHit || 0;
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    if (Date.now() - lastHit >= oneDayMs) {
      stats.unique[clientId].hits++;
      stats.unique[clientId].lastHit = Date.now();
      stats.total++;
      
      // Save to KV
      await context.env.ANALYTICS.put('stats', JSON.stringify(stats));
    }
    
    return new Response(JSON.stringify({ 
      ok: true, 
      total: stats.total, 
      unique: Object.keys(stats.unique).length 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// GET /api/hit - return stats
export async function onRequestGet(context) {
  try {
    const stats = await context.env.ANALYTICS.get('stats', { type: 'json' }) || { 
      total: 0, 
      unique: {} 
    };
    
    return new Response(JSON.stringify({ 
      total: stats.total, 
      unique: Object.keys(stats.unique).length 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
