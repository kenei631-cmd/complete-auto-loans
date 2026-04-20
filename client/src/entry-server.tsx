/**
 * entry-server.tsx
 * Server-side rendering entry point.
 * Called by the Express server to render each page to an HTML string.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { renderToString } from "react-dom/server";
import superjson from "superjson";
import { Router } from "wouter";
import App from "./App";
import { trpc } from "./lib/trpc";

export interface RenderResult {
  html: string;
}

export async function render(url: string): Promise<RenderResult> {
  // Parse the path from the URL (strip query string)
  const urlObj = new URL(url, "http://localhost");
  const ssrPath = urlObj.pathname;

  // Create a fresh QueryClient per request to avoid state leaking between requests
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Don't retry on server — fail fast
        retry: false,
        // Don't refetch on server
        staleTime: Infinity,
      },
    },
  });

  // Create a tRPC client that points to the local server
  // On the server, we use a relative URL which resolves to localhost
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: `http://localhost:${process.env.PORT || 3000}/api/trpc`,
        transformer: superjson,
      }),
    ],
  });

  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Router with ssrPath tells wouter which route to render on the server */}
        <Router ssrPath={ssrPath}>
          <App />
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  );

  return { html };
}
