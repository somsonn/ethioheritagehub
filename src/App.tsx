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
import ProviderDetails from "./pages/ProviderDetails";
import MockPayment from "./pages/MockPayment";

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
            <Route path="/payment/mock" element={<MockPayment />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:id" element={<ProviderDetails />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<ProviderDetails />} />
            <Route path="/transports" element={<Transport />} />
            <Route path="/transports/:id" element={<ProviderDetails />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/artisans/:id" element={<ProviderDetails />} />
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