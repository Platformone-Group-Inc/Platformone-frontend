// "use client";
// import { ReactNode } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// interface Props {
//   children: ReactNode;
// }

// export default function QueryProvider({ children }: Props) {
//   const queryClient = new QueryClient();
//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// }


"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client outside of the component to persist between renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data fetching behavior
      staleTime: 5 * 60 * 1000, // 5 minutes - how long data stays fresh
      gcTime: 10 * 60 * 1000, // 10 minutes - how long inactive data remains in cache
      
      // Refetching controls
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: false, // Don't refetch when component mounts if data exists
      refetchOnReconnect: false, // Don't refetch on network reconnection
      refetchInterval: false, // Disable periodic refetching
      
      // Error handling
      retry: 1, // Only retry failed requests once
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      
      // Performance optimizations
     // placeholderData: "keepPrevious", // Keep showing previous data while fetching
      
      // Network performance
      networkMode: "online", // Only make requests when online
      
      // Data transformation and structure
      structuralSharing: true, // Enable structural sharing between query results
    },
    // mutations: {
    //   // Mutation behavior
    //   retry: 1, // Only retry failed mutations once
    //   networkMode: "online", // Only make mutation requests when online
    // },
  },
});

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
