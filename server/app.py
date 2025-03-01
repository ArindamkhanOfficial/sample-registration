from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

# Configure MySQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1234@localhost/registration_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'

# Create tables
with app.app_context():
    db.create_all()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    
    # Validate input data
    if not all(key in data for key in ['name', 'email', 'phone', 'city']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        # Check if user with email already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 409
        
        # Create new user
        new_user = User(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            city=data['city']
        )
        
        # Add to database
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            'message': 'Registration successful',
            'user_id': new_user.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_list = []
        
        for user in users:
            users_list.append({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'phone': user.phone,
                'city': user.city
            })
        
        return jsonify({
            'users': users_list,
            'count': len(users_list)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)