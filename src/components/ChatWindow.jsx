
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, MessageSquare, LogOut } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ChatWindow = ({ onSignOut }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    // Focus input on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Scroll to bottom whenever chat history updates
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage(''); // Clear input
    
    // Add user message to chat immediately for better UX
    setChatHistory(prev => [
      ...prev, 
      { sender: 'user', text: userMessage, timestamp: new Date().toISOString() }
    ]);
    
    try {
      setIsLoading(true);
      setIsTyping(true);
      
      // Slight delay to show typing indicator (simulated response time)
      setTimeout(async () => {
        try {
          const response = await axios.post('/api/chat', {
            userId,
            message: userMessage
          });
          
          setIsTyping(false);
          
          // Add bot response to chat
          setChatHistory(prev => [
            ...prev,
            { 
              sender: 'bot', 
              text: response.data.reply || "Sorry, I couldn't process that request.", 
              timestamp: new Date().toISOString() 
            }
          ]);
        } catch (error) {
          console.error('Chat error:', error);
          toast(`Error sending message: ${error.response?.data?.message || error.message}`);
          
          setIsTyping(false);
          
          // Add error message to chat
          setChatHistory(prev => [
            ...prev,
            { 
              sender: 'bot', 
              text: "I'm having trouble connecting right now. Please try again later.", 
              timestamp: new Date().toISOString(),
              isError: true
            }
          ]);
        } finally {
          setIsLoading(false);
        }
      }, 500);
      
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    if (onSignOut) {
      onSignOut();
    }
    toast("You've been signed out successfully");
  };

  const renderWelcomeMessage = () => {
    return (
      <div className="grid gap-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Welcome to EduChat!</h2>
          <p className="text-muted-foreground">I'm your educational assistant. How can I help you learn today?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {["Tell me about photosynthesis", "Explain Newton's laws", "Help me with fractions", "What is a metaphor?"].map((suggestion, i) => (
            <Button
              key={i}
              variant="outline"
              className="text-left justify-start h-auto py-3 px-4"
              onClick={() => {
                setMessage(suggestion);
                setTimeout(() => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }, 100);
              }}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-lightgray to-white p-4">
      <Card className="flex flex-col h-full shadow-lg">
        <CardHeader className="border-b bg-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary flex items-center">
              <MessageSquare className="mr-2 h-6 w-6 text-primary" />
              EduChat Assistant
            </CardTitle>
            <Button variant="outline" className="interactive-button" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {chatHistory.length === 0 ? (
              renderWelcomeMessage()
            ) : (
              chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.sender === 'user' ? 'justify-end' : 'justify-start'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`max-w-[80%] ${
                      chat.sender === 'user'
                        ? 'chat-bubble chat-bubble-user'
                        : chat.isError
                        ? 'chat-bubble chat-bubble-error'
                        : 'chat-bubble chat-bubble-bot'
                    }`}
                  >
                    {chat.sender === 'user' ? (
                      <div className="flex items-center gap-2 mb-1 text-xs opacity-80">
                        <User size={12} />
                        <span>You</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mb-1 text-xs opacity-80">
                        <span>EduChat</span>
                      </div>
                    )}
                    <p className="break-words">{chat.text}</p>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="max-w-[80%] chat-bubble chat-bubble-bot">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <CardFooter className="border-t p-4 bg-white">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              ref={inputRef}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 input-focus"
              autoComplete="off"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !message.trim()}
              className="interactive-button"
            >
              <Send size={18} className="mr-2" />
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatWindow;
