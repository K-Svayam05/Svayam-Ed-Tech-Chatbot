
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <header className="w-full flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-primary">EduChat</h1>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </header>

        <main className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl gap-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Your Personal Educational Assistant
            </h2>
            <p className="text-lg text-gray-700 max-w-xl">
              EduChat adapts to your learning level and helps you master any subject through interactive conversations. Get personalized learning support whenever you need it.
            </p>
            <div className="pt-4">
              <Link to="/signup">
                <Button size="lg" className="mr-4">
                  Get Started
                </Button>
              </Link>
              <Link to="/learn-more">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 w-full max-w-md">
              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <p className="font-medium text-primary">EduChat</p>
                <p className="text-gray-700">How can I help with your studies today?</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-gray-700">I need help understanding photosynthesis.</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="font-medium text-primary">EduChat</p>
                <p className="text-gray-700">Photosynthesis is the process plants use to convert light energy into chemical energy. Let me explain...</p>
              </div>
            </div>
          </div>
        </main>

        <section className="mt-24 w-full max-w-6xl">
          <h3 className="text-2xl font-bold text-center mb-10">How EduChat Helps You Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-primary mb-3">Personalized Learning</h4>
              <p className="text-gray-700">Adapts to your education level and learning style for a customized experience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-primary mb-3">24/7 Availability</h4>
              <p className="text-gray-700">Get help with your studies anytime, anywhere. Never feel stuck again.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-primary mb-3">Interactive Learning</h4>
              <p className="text-gray-700">Learn through conversation, with explanations tailored to how you understand best.</p>
            </div>
          </div>
        </section>

        <footer className="mt-24 w-full max-w-6xl text-center text-gray-600 pb-8">
          <p>© {new Date().getFullYear()} EduChat - Your Educational Assistant</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
