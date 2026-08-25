import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, useRef } from "react";


const queryClient = new QueryClient();

function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const el = spotlightRef.current;
    if (!el) return;

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const factor = 0.18;
      currentX += (mouseX - currentX) * factor;
      currentY += (mouseY - currentY) * factor;
      
      // Use CSS variables instead of transform translation to prevent Safari from intercepting pointer events on composited moving layers
      el.style.setProperty('--mouse-x', `${currentX}px`);
      el.style.setProperty('--mouse-y', `${currentY}px`);
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth <= 768) return null;

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        background: "radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)"
      }}
    />
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CursorSpotlight />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
