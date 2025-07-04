import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SvayamLogo from "@/components/SvayamLogo";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-slate-950 to-navy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto px-4 py-6 flex flex-col items-center">
        <header className="w-full flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <SvayamLogo size="sm" />
            <motion.h1
              className="text-2xl font-bold text-white"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            >
              Svayam
            </motion.h1>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Link to="/login">
              <motion.div
                whileHover={{ x: 4, boxShadow: "0 4px 24px 0 rgba(10,38,71,0.15)" }}
                whileTap={{ scale: 0.96 }}
                className=""
              >
                <Button
                  variant="outline"
                  className="rounded-full border-white/40 text-white bg-white/10 hover:bg-navy hover:text-white flex items-center gap-2 px-6 py-2 font-semibold shadow-none transition-all duration-300"
                  style={{ borderWidth: 2 }}
                >
                  <LogIn className="w-4 h-4 mr-1 opacity-80" /> Log In
                </Button>
              </motion.div>
            </Link>
            <Link to="/signup">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(99,102,241,0.7)",
                    // "0 0 16px 4px rgba(99,102,241,0.4)",
                    "0 0 0 0 rgba(99,102,241,0.7)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className=""
              >
                <Button
                  className="rounded-full border-2 border-sky-400 text-sky-400 bg-transparent font-bold px-8 py-2 shadow-none hover:bg-sky-50 hover:text-blue-700 focus:ring-2 focus:ring-sky-400/60 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Sign Up <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </div>
        </header>

        <main className="w-full">
          {/* Hero Section */}
          <section className="mb-24 py-16 text-center">
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 60 }}
            >
              <SvayamLogo size="lg" />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 60 }}
            >
              Unlock Your Learning Potential
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
            >
              A Chatbot That Understands You
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 60 }}
            >
              Experience education tailored to your unique background and how you learn best.
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Button size="lg" className="px-8 py-6 text-lg flex items-center">
                    Sign Up Now <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/learn-more">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Button size="lg" variant="navy" className="px-8 py-6 text-lg bg-white">
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </section>

          {/* Chat Demo with fade-in animation */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="bg-primary/20 rounded-lg p-4 border-l-4 border-primary animate-fade-in">
                  <p className="font-medium text-primary-foreground">Svayam</p>
                  <p className="text-gray-300">Welcome! How can I help with your learning today?</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 border-r-4 border-gray-400 animate-fade-in">
                  <p className="font-medium text-gray-200">You</p>
                  <p className="text-gray-300">Can you explain photosynthesis in a way that connects to what I learned in 10th grade in India?</p>
                </div>
                <div className="bg-primary/20 rounded-lg p-4 border-l-4 border-primary animate-fade-in">
                  <p className="font-medium text-primary-foreground">Svayam</p>
                  <p className="text-gray-300">
                    Sure! Remember how you learned about cellular respiration in Class 10 CBSE? Photosynthesis is like the reverse process. 
                    While respiration breaks down glucose to release energy (as you saw in the equation C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy), 
                    photosynthesis builds glucose using energy from sunlight (6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂).
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Content Sections */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <Card className="bg-white/5 border-white/10 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-4">Tired of One-Size-Fits-All Learning?</h3>
                  <p className="text-gray-300">
                    The traditional approach to learning often assumes everyone starts from the same place and learns in the same way. 
                    But your educational journey is unique, shaped by your experiences, your country's curriculum, and your individual 
                    learning style. Generic explanations can feel disconnected, making it harder to grasp new concepts and truly build 
                    upon what you already know.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-4">Meet the Chatbot Designed Just for You</h3>
                  <p className="text-gray-300">
                    Imagine a learning tool that recognizes your individuality. Our AI-powered chatbot goes beyond standard interactions. 
                    When you join, you tell us about your educational background – your age, what you're studying, and where you're learning from. 
                    Our system uses this information to build a personalized profile, understanding the concepts and knowledge base you've likely 
                    developed through your specific country's educational system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-20 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">Learn Anything, Connected to What You Already Know</h3>
            <p className="text-lg text-gray-300 mb-8">
              This is where the magic happens. When you ask our chatbot a question, it doesn't just give you a standard answer. 
              It leverages your personalized profile to explain new ideas by relating them to topics and concepts you've likely 
              already encountered in your studies. This contextual approach makes complex subjects more accessible, helping you 
              build connections and deepen your understanding naturally. It's like having a tutor who knows your academic history 
              and can explain things in a way that just clicks.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-24">
            <h3 className="text-3xl font-bold text-white mb-10 text-center">Your Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10">
                <h4 className="text-xl font-semibold text-white mb-3">Faster, More Effective Learning</h4>
                <p className="text-gray-400">Understand new concepts quickly by connecting them to your existing knowledge.</p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10">
                <h4 className="text-xl font-semibold text-white mb-3">Explanations That Resonate</h4>
                <p className="text-gray-400">Get answers tailored to your educational background and learning level.</p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10">
                <h4 className="text-xl font-semibold text-white mb-3">Seamless Knowledge Building</h4>
                <p className="text-gray-400">Bridge gaps and build a stronger foundation by seeing how new information fits with what you already know.</p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10">
                <h4 className="text-xl font-semibold text-white mb-3">Explore Any Topic</h4>
                <p className="text-gray-400">Feel confident asking about anything, knowing the explanation will be personalized for you.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Learn Your Way?</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community and experience the future of personalized education. Sign up today to create your unique 
              learning profile and start exploring the world of knowledge with a chatbot that truly understands you.
            </p>
            <Link to="/signup">
              <Button size="lg" className="px-8 py-6 text-lg">
                Sign Up Now
              </Button>
            </Link>
          </section>
        </main>

        <footer className="w-full max-w-6xl text-center text-gray-400 pb-8 mt-12">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <SvayamLogo size="sm" />
            <p className="text-sm">Svayam - Khud se Seekho!</p>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Svayam - Khud se Seekho!</p>
        </footer>
      </div>
    </motion.div>
  );
};

export default Index;
