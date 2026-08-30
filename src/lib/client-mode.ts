/**
 * Client-side half of PIPELINE_MODE. Must agree with the server's — see SETUP.md.
 * Defaults to mock so a checkout with no configuration still runs.
 */
export function isMockMode(): boolean {
  return (process.env.NEXT_PUBLIC_PIPELINE_MODE ?? "mock") === "mock";
}
