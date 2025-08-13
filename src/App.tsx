import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/portfolio";
import NotFound from "@/pages/not-found";
import { useLenis } from "@/hooks/use-lenis";
import { useCursor } from "@/hooks/use-cursor";
import { useIsMobile } from "./hooks/use-mobile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useLenis();
  const { cursorRef } = useCursor();
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!isMobile && (
          <>
            <div ref={cursorRef} className="cursor" />
          </>
        )}
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
