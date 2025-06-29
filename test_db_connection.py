#!/usr/bin/env python3
"""
Test script to verify Neon database connection and basic operations
"""

from app import create_app, db
from app.models import User, ChatHistory
from sqlalchemy import inspect

def test_database_connection():
    """Test the database connection and basic operations"""
    try:
        # Create Flask app context
        app = create_app()
        with app.app_context():
            print("✅ Flask app created successfully")
            
            # Test database connection
            db.engine.connect()
            print("✅ Database connection successful")
            
            # Get table names using inspect
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            print(f"✅ Database tables: {tables}")
            
            # Test basic query
            user_count = User.query.count()
            print(f"✅ User count: {user_count}")
            
            chat_count = ChatHistory.query.count()
            print(f"✅ Chat history count: {chat_count}")
            
            print("\n🎉 All database tests passed! Neon database is working correctly.")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    return True

if __name__ == "__main__":
    test_database_connection() 