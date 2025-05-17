from flask import jsonify, request
from app.api import bp
from app.models import User, ChatHistory
from app import db
from app.ai.gemini_model import GeminiAIModel
import os
from functools import wraps
from datetime import datetime, timedelta
from flask import current_app
from app.api.auth_utils import token_required

# Initialize the Gemini AI model
ai_model = GeminiAIModel()

def rate_limit(f):
    @wraps(f)
    def decorated(user, *args, **kwargs):
        # Get recent messages in the last minute
        one_minute_ago = datetime.utcnow() - timedelta(minutes=1)
        recent_messages = ChatHistory.query.filter(
            ChatHistory.user_id == user.id,
            ChatHistory.timestamp >= one_minute_ago
        ).count()
        
        # Limit to 10 messages per minute
        if recent_messages >= 10:
            return jsonify({'error': 'Rate limit exceeded. Please wait a minute.'}), 429
        
        return f(user, *args, **kwargs)
    return decorated

@bp.route('/chat', methods=['POST'])
@token_required
@rate_limit
def chat(user):
    data = request.get_json()
    message = data.get('message')
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    try:
        # Prepare user context
        user_context = {
            'education_level': user.education_level,
            'current_grade': user.current_grade,
            'learning_style': user.learning_style,
            'subjects_of_interest': user.subjects_of_interest or [],
            'country': user.country,
            'professional_category': user.professional_category,
            'field_of_work': user.field_of_work
        }
        
        # Generate response using Gemini AI
        ai_response = ai_model.generate_response(message, user_context)
        
        # Save chat history
        chat_history = ChatHistory(
            user_id=user.id,
            message=message,
            response=ai_response,
            context=user_context
        )
        
        # Update user's last active timestamp
        user.last_active = datetime.utcnow()
        
        db.session.add(chat_history)
        db.session.commit()
        
        return jsonify({
            'response': ai_response,
            'chat_id': chat_history.id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/chat/history', methods=['GET'])
@token_required
def get_chat_history(user):
    history = ChatHistory.query.filter_by(user_id=user.id).order_by(ChatHistory.timestamp.desc()).all()
    return jsonify([chat.to_dict() for chat in history]) 