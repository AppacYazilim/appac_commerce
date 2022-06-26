// Reacts to POST /hello-world

// <
export async function onRequestGet(request: Request) {
  // ...
  return new Response(`Hello world`);
}
