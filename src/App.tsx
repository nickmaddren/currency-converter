import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyConverter } from "./components/CurrencyConverter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary
      fallback={<p>If you're seeing this, Nick messed something up.</p>}
    >
      <QueryClientProvider client={queryClient}>
        <main className="h-screen py-6 bg-gray-100">
          <div className="card mx-auto max-w-xl p-8 bg-white">
            <h1 className="text-2xl mb-4">Nick's Currency Converter 💸</h1>
            <CurrencyConverter />
          </div>
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
