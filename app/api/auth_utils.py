from functools import wraps
from flask import jsonify, request
from jose import jwt
import os
from app.models import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            token = token.split('Bearer ')[1]
            payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY', 'dev-key'), algorithms=['HS256'])
            user = User.query.get(payload['user_id'])
            if not user:
                raise Exception('User not found')
        except Exception as e:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(user, *args, **kwargs)
    return decorated 