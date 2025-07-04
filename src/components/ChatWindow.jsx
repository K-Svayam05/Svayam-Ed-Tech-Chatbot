import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, MessageSquare, LogOut, History } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';

const getSampleQuestions = (educationLevel) => {
  switch (educationLevel) {
    case 'primary':
      return [
        "Why is the sky blue?",
        "Help me with adding fractions.",
        "Tell me a story about a historical figure.",
        "What are the different states of matter?"
      ];
    case 'secondary':
      return [
        "Explain the process of photosynthesis.",
        "What are Newton's laws of motion?",
        "Help me solve a quadratic equation.",
        "What is the significance of the Magna Carta?"
      ];
    case 'higher_secondary':
    case 'college':
    case 'working_professional':
      return [
        "Discuss the theory of relativity.",
        "What are the main causes of inflation?",
        "Explain the basics of machine learning.",
        "What is the role of a neurotransmitter?"
      ];
    default:
      return [
        "Explain a complex topic simply.",
        "Help me with a math problem.",
        "Tell me something interesting.",
        "Give me a writing prompt."
      ];
  }
};

const ChatWindow = ({ onSignOut }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [sampleQuestions, setSampleQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [streamingBotMessage, setStreamingBotMessage] = useState("");
  
  useEffect(() => {
    // Focus input on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Scroll to bottom whenever chat history or streaming message updates
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatHistory, streamingBotMessage]);

  useEffect(() => {
    // Fetch last 5 chats for the user in sidebar
    const fetchRecentChats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const res = await axios.get(`/api/chat/history?limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecentChats(res.data);
      } catch (err) {
        console.error('Failed to load recent chats:', err);
      }
    };
    fetchRecentChats();
  }, [userId]);

  useEffect(() => {
    // Fetch user profile and set sample questions
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const res = await axios.get(`/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const user = res.data;
        setSampleQuestions(getSampleQuestions(user.education_level));
        
      } catch (err) {
        console.error('Failed to load user profile:', err);
        setSampleQuestions(getSampleQuestions(null)); // Set default questions on error
      }
    };

    fetchUserProfile();
  }, [userId]);

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
      setStreamingBotMessage("");
      
      // Slight delay to show typing indicator (simulated response time)
      setTimeout(async () => {
        try {
          const response = await axios.post(`/api/chat`, {
            message: userMessage,
            user_id: userId
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          
          setIsTyping(false);
          
          // Streaming effect (character by character)
          const answer = response.data.response || "Sorry, I couldn't process that request.";
          let i = 0;
          setStreamingBotMessage("");
          const streamInterval = setInterval(() => {
            i++;
            setStreamingBotMessage(answer.slice(0, i));
            if (i >= answer.length) {
              clearInterval(streamInterval);
              setChatHistory(prev => [
                ...prev,
                { sender: 'bot', text: answer, timestamp: new Date().toISOString() }
              ]);
              setStreamingBotMessage("");
            }
          }, 12); // ~80 chars/sec
        } catch (error) {
          console.error('Chat error:', error);
          toast(`Error sending message: ${error.response?.data?.message || error.message}`);
          
          setIsTyping(false);
          setStreamingBotMessage("");
          
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
      setStreamingBotMessage("");
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
    localStorage.removeItem('token');
    if (onSignOut) {
      onSignOut();
    }
    toast("You've been signed out successfully");
    navigate('/');
  };

  const renderWelcomeMessage = () => {
    return (
      <div className="grid gap-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Welcome to Svayam!</h2>
          <p className="text-muted-foreground">I'm your educational assistant. How can I help you learn today?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sampleQuestions.map((suggestion, i) => (
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

  const renderMessage = (text) => {
    // Improved markdown rendering with images and diagrams
    const lines = text.split('\n');
    const elements = [];
    let diagramBlock = false;
    let diagramContent = [];
    lines.forEach((line, index) => {
      // Diagram block start
      if (line.trim().startsWith('[diagram]')) {
        diagramBlock = true;
        diagramContent = [];
        return;
      }
      // Diagram block end
      if (diagramBlock && line.trim().startsWith('[/diagram]')) {
        diagramBlock = false;
        // Render a placeholder SVG for now
        elements.push(
          <div key={`diagram-${index}`} className="my-4 flex justify-center">
            <svg width="180" height="100" className="rounded-lg shadow" style={{background:'#0a2647'}}>
              <rect x="10" y="20" width="160" height="60" rx="12" fill="#38bdf8" />
              <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" dy=".3em">Diagram</text>
            </svg>
          </div>
        );
        diagramContent = [];
        return;
      }
      if (diagramBlock) {
        diagramContent.push(line);
        return;
      }
      // Markdown image ![alt](url)
      const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        elements.push(
          <div key={`img-${index}`} className="my-4 flex justify-center">
            <img src={imgMatch[2]} alt={imgMatch[1]} className="rounded-lg shadow max-h-60" />
          </div>
        );
        return;
      }
      // Headings
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-2xl font-bold text-sky-200 mt-4 mb-2">{line.substring(3)}</h2>);
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-lg font-semibold text-sky-300 mt-3 mb-1">{line.substring(4)}</h3>);
        return;
      }
      // Bullet points (remove asterisks or •)
      if (/^\s*([*•-])\s+/.test(line)) {
        elements.push(<li key={index} className="ml-6 list-disc text-base text-sky-100">{line.replace(/^\s*([*•-])\s+/, '')}</li>);
        return;
      }
      // Bold (**text**)
      let html = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-sky-100">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-sky-300">$1</em>');
      if (html !== line) {
        elements.push(<p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: html }} />);
        return;
      }
      // Empty line
      if (line.trim() === '') {
        elements.push(<br key={index} />);
        return;
      }
      // Regular text
      elements.push(<p key={index} className="mb-2 text-sky-100">{line}</p>);
    });
    return elements;
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-lightgray to-white">
      {/* Sidebar with recent chats */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary flex items-center">
              <History className="mr-2 h-5 w-5" />
              Recent Chats
            </h2>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {recentChats.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No recent chats</p>
            ) : (
              recentChats.map((chat, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {chat.message.substring(0, 50)}...
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(chat.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
            {recentChats.length >= 5 && (
              <div className="text-center pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toast('Upgrade to premium to view more chat history!')}
                >
                  Show More
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex flex-col h-full shadow-lg">
          <CardHeader className="border-b bg-white">
            <CardTitle className="text-2xl font-bold text-primary flex items-center">
              <MessageSquare className="mr-2 h-6 w-6 text-primary" />
              Svayam Assistant
            </CardTitle>
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
                          <span>Svayam</span>
                        </div>
                      )}
                      <div className={`break-words ${chat.sender === 'bot' ? 'text-lg leading-relaxed text-sky-100 bg-navy rounded-xl p-3' : ''}`}>
                        {renderMessage(chat.text)}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {/* Streaming bot message */}
              {streamingBotMessage && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-[80%] chat-bubble chat-bubble-bot">
                    <div className="flex items-center gap-2 mb-1 text-xs opacity-80">
                      <span>Svayam</span>
                    </div>
                    <div className="break-words text-lg leading-relaxed text-sky-100 bg-navy rounded-xl p-3">
                      {renderMessage(streamingBotMessage)}
                    </div>
                  </div>
                </div>
              )}
              {isTyping && !streamingBotMessage && (
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
    </div>
  );
};

export default ChatWindow;
