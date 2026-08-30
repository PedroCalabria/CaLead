import type { Metadata, Viewport } from "next";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Toast } from "@/components/ui/Toast";
import { StoreProvider } from "@/state/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Icebreak — lead qualification and ice breakers for outbound teams",
  description:
    "Icebreak reads the company website and the contact's LinkedIn, scores the lead against the criteria your team defined, shows the evidence behind the score, and writes the opener your rep uses on the first touch.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
          <Toast />
          <ConfirmDialog />
        </StoreProvider>
      </body>
    </html>
  );
}
