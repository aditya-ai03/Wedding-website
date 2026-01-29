import type { ReactNode } from "react";

import background2 from "@/assets/background_2.png";
import paperTexture from "@/assets/background-3.jpeg";
import { cn } from "@/lib/utils";

type MobilePageWrapperProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Mobile-only wrapper that matches the Homepage background structure.
 * Hidden on `md` and above to avoid affecting desktop layout.
 */
export default function MobilePageWrapper({ children, className }: MobilePageWrapperProps) {
  return (
    <div className={cn("min-h-screen bg-white md:hidden", className)}>
      <div className="flex flex-col items-center px-4 md:px-8">
        <div
          className="w-full flex justify-center bg-white relative"
          style={{
            // Base: repeating paper texture for full scroll
            backgroundImage: `url(${paperTexture})`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: "top center",
            // Larger tile reduces visible repetition seams
            backgroundSize: "100% 3200px",
            minHeight: "100vh",
          }}
        >
          {/* Top overlay: envelope flap + first paper area, fading out to avoid a visible seam */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
            style={{
              // Ensure any transparent parts of the PNG render as white (not paper texture)
              backgroundColor: "white",
              backgroundImage: `url(${background2})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top center",
              backgroundSize: "100% auto",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
            }}
          />

          <div className="relative z-10 w-full flex justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}

