from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    country = db.Column(db.String(100))
    
    # Detailed educational information
    education_level = db.Column(db.String(50))  # primary, secondary, higher_secondary, college
    current_grade = db.Column(db.String(20))    # e.g., "Grade 8", "12th", "3rd Year"
    school_board = db.Column(db.String(100))    # e.g., CBSE, ICSE, IB, etc.
    subjects_of_interest = db.Column(db.JSON)   # List of subjects the user is interested in
    preferred_language = db.Column(db.String(50))  # Language preference for explanations
    learning_style = db.Column(db.String(50))   # visual, auditory, reading/writing, kinesthetic
    
    # For working professionals
    professional_category = db.Column(db.String(20))  # <35, 36-50, >50
    field_of_work = db.Column(db.String(100))        # Current profession/field
    
    # System fields
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship with ChatHistory
    chat_history = db.relationship('ChatHistory', backref='user', lazy='dynamic')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class ChatHistory(db.Model):
    __tablename__ = 'chat_history'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Enhanced context tracking
    context = db.Column(db.JSON)  # Store conversation context
    subject_area = db.Column(db.String(100))  # Subject classification of the conversation
    difficulty_level = db.Column(db.String(50))  # Easy, Medium, Hard
    concepts_covered = db.Column(db.JSON)  # Key concepts covered in the conversation
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message': self.message,
            'response': self.response,
            'timestamp': self.timestamp.isoformat(),
            'context': self.context,
            'subject_area': self.subject_area,
            'difficulty_level': self.difficulty_level,
            'concepts_covered': self.concepts_covered
        } 