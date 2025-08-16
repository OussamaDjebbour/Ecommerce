import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { SearchProvider } from "./context/useSearchContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//     <div>guuuuuuuuuu</div>
//     {/* <QueryClientProvider client={queryClient}>
//       <SearchProvider>
//         <App />
//       </SearchProvider>
//     </QueryClientProvider> */}
//   </StrictMode>,
// );

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
