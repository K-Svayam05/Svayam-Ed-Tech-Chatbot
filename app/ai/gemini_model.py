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
            prompt = f"""As an educational AI assistant, please provide a helpful response to the following question.
            Consider the user's context:
            - Education Level: {user_context.get('education_level', 'Not specified')}
            - Current Grade: {user_context.get('current_grade', 'Not specified')}
            - Learning Style: {user_context.get('learning_style', 'Not specified')}
            - Subjects of Interest: {', '.join(user_context.get('subjects_of_interest', ['Not specified']))}
            - Country: {user_context.get('country', 'Not specified')}
            
            Question: {query}
            
            Please provide a clear, educational response that:
            1. Is appropriate for the user's education level
            2. Uses examples and explanations that match their learning style
            3. Relates to their subjects of interest when relevant
            4. Is culturally appropriate for their country
            """
            
            # Generate response
            response = self.model.generate_content(prompt)
            return response.text
            
        except Exception as e:
            return f"I apologize, but I encountered an error while generating a response: {str(e)}" 