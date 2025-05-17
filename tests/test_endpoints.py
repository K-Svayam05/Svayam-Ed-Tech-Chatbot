import requests
import json
from pprint import pprint
import sys
import time

BASE_URL = 'http://localhost:5000/api'

def test_registration():
    print("\n=== Testing Registration ===")
    url = f"{BASE_URL}/register"
    data = {
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "Test@123",  # More secure password
        "age": 25,
        "gender": "male",
        "country": "India",
        "education_level": "higher_secondary",
        "current_grade": "12th",
        "school_board": "CBSE",
        "subjects_of_interest": ["Physics", "Mathematics", "Computer Science"],
        "preferred_language": "English",
        "learning_style": "visual"
    }
    
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        pprint(response.json())
        return response.json().get('token')
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure the Flask server is running.")
        sys.exit(1)
    except Exception as e:
        print(f"Error during registration: {str(e)}")
        return None

def test_login():
    print("\n=== Testing Login ===")
    url = f"{BASE_URL}/login"
    data = {
        "email": "testuser@example.com",
        "password": "Test@123"
    }
    
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        pprint(response.json())
        return response.json().get('token')
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure the Flask server is running.")
        sys.exit(1)
    except Exception as e:
        print(f"Error during login: {str(e)}")
        return None

def test_get_profile(token):
    print("\n=== Testing Get Profile ===")
    url = f"{BASE_URL}/profile"
    headers = {'Authorization': f'Bearer {token}'}
    
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")
    pprint(response.json())

def test_update_profile(token):
    print("\n=== Testing Update Profile ===")
    url = f"{BASE_URL}/profile"
    headers = {'Authorization': f'Bearer {token}'}
    data = {
        "subjects_of_interest": ["Physics", "Mathematics", "Computer Science", "AI"],
        "learning_style": "reading/writing"
    }
    
    response = requests.put(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    pprint(response.json())

def test_chat(token):
    print("\n=== Testing Chat ===")
    url = f"{BASE_URL}/chat"
    headers = {'Authorization': f'Bearer {token}'}
    data = {
        "message": "Explain the concept of gravity in simple terms"
    }
    
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    pprint(response.json())

def test_chat_history(token):
    print("\n=== Testing Chat History ===")
    url = f"{BASE_URL}/chat/history"
    headers = {'Authorization': f'Bearer {token}'}
    
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")
    pprint(response.json())

def main():
    try:
        # First, let's try to register a new user
        token = test_registration()
        
        if not token:
            print("Waiting 2 seconds before trying login...")
            time.sleep(2)  # Add a small delay between registration and login
            # If registration fails (user might exist), try login
            token = test_login()
        
        if token:
            # Test other endpoints with the token
            test_get_profile(token)
            test_update_profile(token)
            test_chat(token)
            test_chat_history(token)
        else:
            print("Failed to get authentication token")
    except KeyboardInterrupt:
        print("\nTests interrupted by user")
    except Exception as e:
        print(f"Unexpected error during tests: {str(e)}")

if __name__ == "__main__":
    main() 