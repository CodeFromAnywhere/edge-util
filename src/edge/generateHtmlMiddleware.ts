/**
Turn types into openapi defs
Generate a test fn, then test from there without stream
Test  fn with stream
Fix if needed

Test tool use through openapi-chat-completion for anthropic. Should work now if above works.

Create and test content-deploy agent.

Make .html.md files be used as source through middleware.

To optimise agents, now work on special agent tools in openapi-chat-completion? Maybe later

Iterate on FE, then Ship openapisearch.com --> Show OpenAPI Initiative, ask for meeting

Backend host --> backend middleware.
*/
function generateDeterministicString(input: string): string {
  // Simple hash function
  function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Generate a longer string based on the hash
  function expandString(num: number): string {
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    while (result.length < 48) {
      num = simpleHash(num.toString());
      result += charset[num % charset.length];
    }
    return result;
  }

  // Get the initial hash
  const hash = simpleHash(input);

  // Expand the hash to a 48-character string
  return expandString(hash);
}

export const generateHtmlMiddleware = async (request: Request) => {
  const url = new URL(request.url);
  const chunks = url.pathname.split(".");
  const requestedFormat = chunks.pop();
  const name = chunks.join(".");
  console.log("middleware", name);
  if (request.headers.get("X-Original-Format") !== null) {
    // prevent infinite loop
    return;
  }

  if (requestedFormat !== "html") {
    return;
  }

  const alternateUrl = `${url.origin}${url.pathname.replace(".html", ".md")}`;

  const response = await fetch(alternateUrl, {
    headers: { "X-Original-Format": requestedFormat },
  });

  if (!response.ok) {
    return;
  }

  const rawContent = await response.text();

  // TODO: also take into account the profile.json etag or content to ensure all websites change when the agent itself changes.
  const hash = generateDeterministicString(rawContent);
  console.log(hash);
  const contentUrl = `https://${hash}.gptideas.com/${hash}.html`;

  const exists = await fetch(contentUrl, { redirect: "error" })
    .then(async (res) => {
      return { ok: res.ok, content: await res.text() };
    })
    .catch((e) => {
      return { ok: false, content: undefined };
    });

  if (exists.ok && exists.content) {
    return new Response(exists.content, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }

  if (!process.env.ANTHROPIC_TOKEN) {
    return new Response("Please add an ANTHROPIC_TOKEN to your env", {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }

  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      start: async (controller) => {
        // TODO: call the codegen agent, and stream it instead of directly returning :)
        const anthropicResult = `<div>test</div>`;
        controller.enqueue(encoder.encode(anthropicResult));

        const result = await fetch("https://content.actionschema.com/set", {
          method: "POST",
          body: JSON.stringify({
            slug: hash,
            code: anthropicResult,
            prompt: rawContent,
            extension: "html",
          }),
        }).then((res) => res.json());

        console.log(result);

        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
};
