from flask import jsonify, request
from app.api import bp
from app.models import User
from app import db
from jose import jwt
import os
from datetime import datetime, timedelta
from app.api.validators import validate_registration_input, validate_login_input

def create_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, os.getenv('JWT_SECRET_KEY', 'dev-key'), algorithm='HS256')

@bp.route('/register', methods=['POST'])
@validate_registration_input
def register():
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    # Create new user
    user = User(
        name=data['name'],
        email=data['email'],
        age=data['age'],
        gender=data['gender'],
        country=data['country'],
        education_level=data['education_level'],
        professional_category=data.get('professional_category')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    # Create token
    token = create_token(user.id)
    
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    })

@bp.route('/login', methods=['POST'])
@validate_login_input
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    token = create_token(user.id)
    
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    }) 