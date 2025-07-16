import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/portfolio";
import NotFound from "@/pages/not-found";
import { useLenis } from "@/hooks/use-lenis";
import { useCursor } from "@/hooks/use-cursor";

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
  const { cursorRef, followerRef } = useCursor();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="cursor" ref={cursorRef}></div>
        <div className="cursor-follower" ref={followerRef}></div>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
