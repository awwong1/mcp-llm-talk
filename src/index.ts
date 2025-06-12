/**
 * Entrypoint for the Cloudflare Worker.
 */
import nerdamer from "nerdamer";

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase();

    if (pathname.startsWith("/api/nerdamer")) {
      // This endpoint evaluates a mathematical expression using the Nerdamer library.
      // It expects a query parameter 'expr' with the expression to evaluate.
      // All other parameters are passed through as is.

      const searchParams = url.searchParams;
      const expr = searchParams.get("expr") ?? "";
      const params = Array.from(searchParams.entries()).filter(
        ([key]) => key !== "expr"
      );
      try {
        const result = nerdamer(expr, Object.fromEntries(params))
        return new Response(JSON.stringify({
          text: result.text(),
          latex: result.toTeX(),
        }), {
          headers: { "Content-Type": "application/json" },
        })
      } catch (error) {
        return new Response(JSON.stringify({ error: "An error occurred while processing the request." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    if (pathname.startsWith("/api")) {
      return new Response(JSON.stringify({ name: "Cloudflare" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return env.ASSETS.fetch(request);
  }
};
