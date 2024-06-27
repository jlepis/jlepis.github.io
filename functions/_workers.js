export async function onRequest(context) {
  const response = await context.next();
  
  // Get the origin of the request
  const origin = context.request.headers.get('Origin');
  
  // List of allowed origins
  const allowedOrigins = ['https://background.jlepis2010.workers.dev/'];
  
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    response.headers.set('Access-Control-Max-Age', '86400');
  }
  
  return response;
}