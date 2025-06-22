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
    
    # Pre-process subjects_of_interest
    if 'subjects_of_interest' in data and isinstance(data['subjects_of_interest'], str):
        data['subjects_of_interest'] = [subject.strip() for subject in data['subjects_of_interest'].split(',')]

    # Normalize gender input
    if 'gender' in data and isinstance(data['gender'], str):
        data['gender'] = data['gender'].lower()

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
    )
    user.set_password(data['password'])

    # Add education-specific fields
    if data['education_level'] in ['primary', 'secondary', 'higher_secondary', 'college']:
        user.current_grade = data.get('current_grade')
        user.school_board = data.get('school_board')
    
    # Add professional-specific fields
    if data['education_level'] == 'working_professional':
        professional_category = data.get('education_details')
        if professional_category:
            user.professional_category = professional_category
        user.field_of_work = data.get('field_of_work')

    # Add common optional fields
    user.subjects_of_interest = data.get('subjects_of_interest', [])
    user.preferred_language = data.get('preferred_language')
    user.learning_style = data.get('learning_style')

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