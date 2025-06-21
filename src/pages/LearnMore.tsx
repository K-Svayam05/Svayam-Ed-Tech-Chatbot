import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SvayamLogo } from "@/components/SvayamLogo";
import { Star, Users, TrendingUp } from "lucide-react";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <header className="w-full flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <SvayamLogo size="sm" />
            <h1 className="text-2xl font-bold text-primary">Svayam</h1>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Learn More About Svayam</h2>
          
          <section className="bg-white rounded-lg p-8 shadow-md mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-4">What is Svayam?</h3>
            <p className="text-gray-700 mb-4">
              Svayam is an AI-powered educational assistant designed to help students of all ages and education levels. 
              Whether you're in primary school or a working professional, Svayam adapts to your specific learning needs.
            </p>
            <p className="text-gray-700">
              Our mission is to make education more accessible and personalized through conversational learning. Think of Svayam 
              as your personal tutor, available 24/7 to answer questions and explain concepts in a way that makes sense to you.
            </p>
          </section>
          
          <section className="bg-white rounded-lg p-8 shadow-md mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-4">How It Works</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Create Your Profile</h4>
                  <p className="text-gray-600">Sign up with your basic information and education level so we can personalize your experience.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Ask Questions</h4>
                  <p className="text-gray-600">Type any question or topic you need help with into the chat interface.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Get Personalized Responses</h4>
                  <p className="text-gray-600">Receive explanations tailored to your education level and learning style.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Continue Learning</h4>
                  <p className="text-gray-600">Ask follow-up questions to deepen your understanding or move on to new topics.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-lg p-8 shadow-md mb-12">
            <h3 className="text-2xl font-semibold text-primary mb-4">Benefits of Using Svayam</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="text-green-500 mr-2">✓</div>
                <p><span className="font-medium">Learn at your own pace</span> - No rushing through concepts you don't understand</p>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mr-2">✓</div>
                <p><span className="font-medium">Accessible anytime</span> - Get help whenever you need it, not just during school hours</p>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mr-2">✓</div>
                <p><span className="font-medium">Personalized learning</span> - Content adapted to your education level and learning style</p>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mr-2">✓</div>
                <p><span className="font-medium">Builds confidence</span> - Practice concepts and ask questions without fear of judgment</p>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mr-2">✓</div>
                <p><span className="font-medium">Adaptive Learning</span> - Get explanations tailored to your age and education level</p>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mr-2">✓</div>
                <p><span className="font-medium">24/7 Availability</span> - Learn anytime, anywhere, at your own pace</p>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mr-2">✓</div>
                <p><span className="font-medium">Engaging Content</span> - Interactive and conversational learning keeps you motivated</p>
              </li>
              <li className="flex items-start">
                <div className="text-green-500 mr-2">✓</div>
                <p><span className="font-medium">Continuous improvement</span> - Svayam learns from interactions to better support your needs</p>
              </li>
            </ul>
          </section>
          
          <div className="flex justify-center">
            <Link to="/signup">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
        
        <footer className="mt-24 w-full text-center text-gray-600 pb-8">
          <p>© {new Date().getFullYear()} Svayam - Your Educational Assistant</p>
        </footer>
      </div>
    </div>
  );
};

export default LearnMore;
