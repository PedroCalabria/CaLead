"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * False during server rendering and the hydration pass, true afterwards.
 * Screens that branch on viewport width use this to avoid rendering the
 * desktop layout for a frame on a phone.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
