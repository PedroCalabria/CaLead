"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useStore } from "@/state/store";

/**
 * Leaving the ICP screen with unsaved criteria asks first, matching the
 * design. Everywhere else this is a plain push.
 */
export function useGuardedNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { dirty, discardCriteria, askConfirm } = useStore();

  return useCallback(
    (href: string) => {
      const leavingIcp = pathname.startsWith("/icp") && !href.startsWith("/icp");
      if (leavingIcp && dirty) {
        askConfirm({
          title: "Leave without saving?",
          body: "Your criteria changes have not been saved. Leaving this screen discards them.",
          confirm: "Discard and leave",
          cancel: "Stay here",
          tone: "danger",
          onConfirm: () => {
            discardCriteria();
            router.push(href);
          },
        });
        return;
      }
      router.push(href);
    },
    [pathname, dirty, askConfirm, discardCriteria, router],
  );
}
