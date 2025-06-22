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
    { label: 'Primary School (Grades 1-8)', value: 'primary' },
    { label: 'Secondary School (Grades 9-10)', value: 'secondary' },
    { label: 'Higher Secondary (Grades 11-12)', value: 'higher_secondary' },
    { label: 'College/University', value: 'college' },
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
    if (formData.education_level === 'working_professional' && !formData.education_details) {
      toast("Please specify your experience level");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`/api/register`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Store token and user ID
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      
      toast("Signup successful!");
      
      // Call the callback function to notify parent component
      if (onSignupSuccess) {
        onSignupSuccess(response.data.user.id);
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

  // Check if we need to show education-specific fields
  const showStudentFields = ['primary', 'secondary', 'higher_secondary', 'college'].includes(formData.education_level);
  const showProfessionalFields = formData.education_level === 'working_professional';

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

            {showStudentFields && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="current_grade">Current Grade/Year</Label>
                  <Input
                    id="current_grade"
                    name="current_grade"
                    placeholder="e.g., Grade 8, 2nd Year"
                    value={formData.current_grade}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="school_board">School Board (Optional)</Label>
                  <Input
                    id="school_board"
                    name="school_board"
                    placeholder="e.g., CBSE, ICSE, IB"
                    value={formData.school_board}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {showProfessionalFields && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="education_details">Experience Level</Label>
                  <Select
                    name="education_details"
                    onValueChange={(value) => handleSelectChange("education_details", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<35">Less than 35 years</SelectItem>
                      <SelectItem value="36-50">36-50 years</SelectItem>
                      <SelectItem value=">50">More than 50 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="field_of_work">Field of Work</Label>
                  <Input
                    id="field_of_work"
                    name="field_of_work"
                    placeholder="e.g., Software Engineering, Medicine"
                    value={formData.field_of_work}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="grid gap-2">
              <Label htmlFor="subjects_of_interest">Subjects of Interest</Label>
              <Input
                id="subjects_of_interest"
                name="subjects_of_interest"
                placeholder="e.g., Physics, History, Programming (comma-separated)"
                value={formData.subjects_of_interest}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="learning_style">Preferred Learning Style</Label>
              <Select
                name="learning_style"
                onValueChange={(value) => handleSelectChange("learning_style", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your learning style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual (Diagrams, Charts)</SelectItem>
                  <SelectItem value="auditory">Auditory (Lectures, Discussions)</SelectItem>
                  <SelectItem value="reading_writing">Reading/Writing (Notes, Articles)</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic (Hands-on, Interactive)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="preferred_language">Preferred Language</Label>
              <Input
                id="preferred_language"
                name="preferred_language"
                placeholder="e.g., English, Spanish"
                value={formData.preferred_language}
                onChange={handleChange}
              />
            </div>

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
