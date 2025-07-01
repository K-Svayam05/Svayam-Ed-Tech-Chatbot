import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignupForm from "./components/SignupForm";
import ChatWindow from "./components/ChatWindow";
import LearnMore from "./pages/LearnMore";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Needed for AnimatePresence

  useEffect(() => {
    // Check if user is already logged in
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    setIsAuthenticated(!!storedUserId && !!storedToken);
    setIsLoading(false);
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* AnimatePresence enables exit animations for page transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
            <Route path="/signup" element={<SignupForm onSignupSuccess={() => setIsAuthenticated(true)} />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <ChatWindow onSignOut={() => setIsAuthenticated(false)} />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
