from flask import jsonify, request
from app.api import bp
from app.models import User
from app import db
from app.api.auth_utils import token_required

@bp.route('/profile', methods=['GET'])
@token_required
def get_profile(user):
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'age': user.age,
        'gender': user.gender,
        'country': user.country,
        'education_level': user.education_level,
        'professional_category': user.professional_category
    })

@bp.route('/profile', methods=['PUT'])
@token_required
def update_profile(user):
    data = request.get_json()
    
    # Update only provided fields
    if 'name' in data:
        user.name = data['name']
    if 'age' in data:
        user.age = data['age']
    if 'gender' in data:
        user.gender = data['gender']
    if 'country' in data:
        user.country = data['country']
    if 'education_level' in data:
        user.education_level = data['education_level']
    if 'professional_category' in data:
        user.professional_category = data['professional_category']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Profile updated successfully',
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'age': user.age,
            'gender': user.gender,
            'country': user.country,
            'education_level': user.education_level,
            'professional_category': user.professional_category
        }
    }) 