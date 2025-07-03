import { ReactNode, Suspense } from "react";
import FallbackLoader from "@/components/other/fallback-loader";

export default function SuspenseLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<FallbackLoader />}>{children}</Suspense>;
}
