from functools import wraps
from flask import request, jsonify
from email_validator import validate_email, EmailNotValidError

def validate_registration_input(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        data = request.get_json()
        
        # Basic required fields - check for presence and non-empty value
        required_fields = ['name', 'email', 'password', 'age', 'gender', 'country', 'education_level']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Missing or empty required field: {field}'}), 400
        
        # Validate email
        try:
            emailinfo = validate_email(data['email'], check_deliverability=False)
            data['email'] = emailinfo.normalized
        except EmailNotValidError:
            return jsonify({'error': 'Invalid email address'}), 400
        
        # Validate age
        try:
            age = int(data['age'])
            if age < 5 or age > 120:
                return jsonify({'error': 'Age must be between 5 and 120'}), 400
        except ValueError:
            return jsonify({'error': 'Age must be a number'}), 400
        
        # Validate education level
        valid_education_levels = ['primary', 'secondary', 'higher_secondary', 'college', 'working_professional']
        if data['education_level'] not in valid_education_levels:
            return jsonify({'error': f'Education level must be one of: {", ".join(valid_education_levels)}'}), 400
        
        # Validate learning style if provided
        valid_learning_styles = ['visual', 'auditory', 'reading/writing', 'kinesthetic']
        if 'learning_style' in data and data['learning_style'] and data['learning_style'] not in valid_learning_styles:
            return jsonify({'error': f'Learning style must be one of: {", ".join(valid_learning_styles)}'}), 400
        
        # Validate professional category based on education_details from the form
        if data['education_level'] == 'working_professional':
            valid_categories = ['<35', '36-50', '>50']
            education_details = data.get('education_details')
            if not education_details or education_details not in valid_categories:
                return jsonify({'error': f'For working professionals, experience level must be one of: {", ".join(valid_categories)}'}), 400
        
        return f(*args, **kwargs)
    return decorated

def validate_login_input(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        try:
            emailinfo = validate_email(data['email'], check_deliverability=False)
            data['email'] = emailinfo.normalized
        except EmailNotValidError:
            return jsonify({'error': 'Invalid email address'}), 400
        
        return f(*args, **kwargs)
    return decorated 