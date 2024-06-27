export async function onRequest(context) {
  console.log('Request URL:', context.request.url);
  console.log('Request method:', context.request.method);
  console.log('Request headers:', Object.fromEntries(context.request.headers));

  const origin = context.request.headers.get('Origin');
  const allowedOrigins = ['https://background.jlepis2010.workers.dev'];

  console.log("here?")
  if (origin && allowedOrigins.includes(origin)) {
    if (context.request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, CF-Access-Client-Id, CF-Access-Client-Secret',
          'Access-Control-Max-Age': '86400',
          'Access-Control-Allow-Credentials': 'true',
        },
      });
    }

    const response = await context.next();

    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, CF-Access-Client-Id, CF-Access-Client-Secret');
    response.headers.set('Access-Control-Max-Age', '86400');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // Set Content-Type for images
    if (context.request.url.endsWith('.jpg') || context.request.url.endsWith('.jpeg')) {
      response.headers.set('Content-Type', 'image/jpeg');
    } else if (context.request.url.endsWith('.png')) {
      response.headers.set('Content-Type', 'image/png');
    }
    // Add other image types as needed

    return response;
  } else {
    // If origin is not allowed, pass the request through without modification
    return context.next();
  }
}