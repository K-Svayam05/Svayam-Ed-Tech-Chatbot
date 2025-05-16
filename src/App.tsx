
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignupForm from "./components/SignupForm";
import ChatWindow from "./components/ChatWindow";
import LearnMore from "./pages/LearnMore";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUserId = localStorage.getItem('userId');
    setIsAuthenticated(!!storedUserId);
    setIsLoading(false);
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
