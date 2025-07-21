import FallbackLoader from "@/components/other/fallback-loader";
import { Suspense } from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return <Suspense fallback={<FallbackLoader />}>{children}</Suspense>;
};

export default Layout;
