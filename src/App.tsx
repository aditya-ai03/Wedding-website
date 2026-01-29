import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RSVPPage from "./pages/RSVP";
import DressCode from "./pages/DressCode";
import FAQ from "./pages/FAQ";
import Accommodation from "./pages/Accommodation";
import ExperienceIndia from "./pages/ExperienceIndia";
import TravelArrival from "./pages/TravelArrival";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rsvp" element={<RSVPPage />} />
          <Route path="/travel-arrival" element={<TravelArrival />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/dress-code" element={<DressCode />} />
          <Route path="/experience-india" element={<ExperienceIndia />} />
          <Route path="/faqs" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
