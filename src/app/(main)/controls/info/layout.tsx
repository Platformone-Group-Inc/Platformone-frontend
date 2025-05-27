import { ReactNode, Suspense } from "react";

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading Controls...</div>}>
      {children}
    </Suspense>
  );
}
