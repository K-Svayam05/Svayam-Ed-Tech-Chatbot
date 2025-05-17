from app import create_app, db
from app.models import User
from sqlalchemy import text

def test_db_connection():
    print("\n=== Testing Database Connection ===")
    app = create_app()
    
    with app.app_context():
        try:
            # Try to query the database
            db.session.execute(text('SELECT 1'))
            print("✅ Database connection successful!")
            
            # Check if tables exist
            try:
                User.query.first()
                print("✅ User table exists and is accessible!")
            except Exception as e:
                print("❌ Error accessing User table:", str(e))
                
        except Exception as e:
            print("❌ Database connection failed:", str(e))

if __name__ == "__main__":
    test_db_connection() 