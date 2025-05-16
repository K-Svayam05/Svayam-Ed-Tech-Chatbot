
import { useState, useEffect } from 'react';
import SignupForm from './components/SignupForm';
import ChatWindow from './components/ChatWindow';

function App() {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  const handleSignupSuccess = (newUserId) => {
    setUserId(newUserId);
  };

  const handleSignOut = () => {
    setUserId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {userId ? (
        <ChatWindow onSignOut={handleSignOut} />
      ) : (
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      )}
    </div>
  );
}

export default App;
