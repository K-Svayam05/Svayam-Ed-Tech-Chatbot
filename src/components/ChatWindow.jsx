
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ChatWindow = ({ onSignOut }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
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
      const response = await axios.post('/api/chat', {
        userId,
        message: userMessage
      });
      
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
  };

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <Card className="flex flex-col h-full">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">EduChat Assistant</CardTitle>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {chatHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Welcome to EduChat! How can I help you with your learning today?</p>
              </div>
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
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      chat.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : chat.isError
                        ? 'bg-destructive/10 text-destructive rounded-bl-none'
                        : 'bg-secondary text-foreground rounded-bl-none'
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
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-secondary text-foreground rounded-bl-none">
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
        
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !message.trim()}>
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
