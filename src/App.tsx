import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Cursor } from "@/components/layout/cursor";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import Portfolio from "@/pages/portfolio";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
      <TooltipProvider>
        <SmoothScrollProvider>
          <SkipLink />
          <ScrollProgress />
          <Cursor />
          <div className="grain-overlay" aria-hidden />
          <Nav />
          <main id="main">
            <Switch>
              <Route path="/" component={Portfolio} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <Toaster />
        </SmoothScrollProvider>
      </TooltipProvider>
  );
}
