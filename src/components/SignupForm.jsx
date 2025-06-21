import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Link } from 'react-router-dom';

const SignupForm = ({ onSignupSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    country: '',
    education_level: '',
    education_details: ''
  });
  const navigate = useNavigate();

  const educationLevels = [
    { label: 'Primary (1-8)', value: 'primary' },
    { label: 'Secondary (9-10)', value: 'secondary' },
    { label: 'Higher Secondary (11-12)', value: 'higher_secondary' },
    { label: 'College', value: 'college' },
    { label: 'Working Professional', value: 'working_professional' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.gender || !formData.country || !formData.education_level) {
      toast("Please fill in all required fields");
      return;
    }

    // Validate age is a number
    if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      toast("Please enter a valid age");
      return;
    }

    // Additional validation for Working Professional
    if (formData.education_level === 'Working Professional' && !formData.education_details) {
      toast("Please specify your experience level");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Store the user ID in local storage
      localStorage.setItem('userId', response.data.userId);
      
      toast("Signup successful!");
      
      // Call the callback function to notify parent component
      if (onSignupSuccess) {
        onSignupSuccess(response.data.userId);
      }
      
      // Navigate to chat page
      navigate('/chat');
    } catch (error) {
      console.error('Signup error:', error);
      toast(`Signup failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if we need to show the education details field
  const showEducationDetails = formData.education_level === 'Working Professional';

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-b from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-primary">Join Svayam</CardTitle>
          <CardDescription>
            Sign up to start chatting with our educational assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                name="gender" 
                onValueChange={(value) => handleSelectChange("gender", value)} 
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="education_level">Education Level</Label>
              <Select 
                name="education_level"
                onValueChange={(value) => handleSelectChange("education_level", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {showEducationDetails && (
              <div className="grid gap-2">
                <Label htmlFor="education_details">Work Experience</Label>
                <Select 
                  name="education_details"
                  onValueChange={(value) => handleSelectChange("education_details", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your work experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<35">Less than 35 years</SelectItem>
                    <SelectItem value="36-50">36-50 years</SelectItem>
                    <SelectItem value=">50">More than 50 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
