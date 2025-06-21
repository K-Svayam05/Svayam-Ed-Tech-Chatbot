import google.generativeai as genai
import os
from typing import Dict, Any

class GeminiAIModel:
    def __init__(self):
        # Configure Google AI with the API key from environment variable
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable is not set")
        
        genai.configure(api_key=api_key)
        # Using gemini-2.5-flash-preview-04-17 model
        self.model = genai.GenerativeModel('gemini-2.5-flash-preview-04-17')
        
    def generate_response(self, query: str, user_context: Dict[str, Any]) -> str:
        """Generate a response using Gemini AI based on the query and user context."""
        try:
            # Create a context-aware prompt
            prompt = f"""You are an educational AI assistant. Provide a personalized, well-structured response to the following question.

USER CONTEXT:
- Education Level: {user_context.get('education_level', 'Not specified')}
- Age: {user_context.get('age', 'Not specified')}
- Country: {user_context.get('country', 'Not specified')}
- Learning Style: {user_context.get('learning_style', 'Not specified')}

QUESTION: {query}

INSTRUCTIONS:
1. **Personalize the response** based on the user's education level and age:
   - For primary students (ages 5-10): Use simple language, relate to everyday experiences, use stories and analogies they would understand
   - For secondary students (ages 11-16): Use more detailed explanations but still accessible, relate to their school subjects
   - For higher secondary/college: Use more advanced concepts and academic language

2. **Structure your response** with clear formatting:
   - Use markdown formatting with ## for main headings and ### for subheadings
   - Use bullet points (•) for lists
   - Use **bold** for important terms
   - Include examples relevant to their age group
   - Break down complex concepts into simple steps

3. **Make it relatable**:
   - Connect concepts to things they know from their age/education level
   - Use examples from their daily life or previous studies
   - If they're from a specific country, use relevant cultural references when appropriate

4. **Keep it engaging**:
   - Ask follow-up questions to encourage learning
   - Provide practical applications they can understand
   - Use analogies appropriate for their age group

Please provide a clear, educational response that follows these guidelines.
"""
            
            # Generate response
            response = self.model.generate_content(prompt)
            return response.text
            
        except Exception as e:
            return f"I apologize, but I encountered an error while generating a response: {str(e)}" 