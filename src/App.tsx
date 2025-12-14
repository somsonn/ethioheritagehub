import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Guides from "./pages/Guides";
import Hotels from "./pages/Hotels";
import Transport from "./pages/Transport";
import Artisans from "./pages/Artisans";
import TouristDashboard from "./pages/TouristDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/dashboard/tourist" element={<TouristDashboard />} />
            <Route path="/dashboard/provider" element={<ProviderDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;