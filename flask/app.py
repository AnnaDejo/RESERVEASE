import json
from flask import Flask, jsonify, redirect, render_template, request, session
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId, json_util


app = Flask(__name__)
app.secret_key = "your_secret_key" 
CORS(app) 

#app.config['MONGO_URI'] = 'mongodb://localhost:27017/your_database_name'
#mongo = PyMongo(app)

mongo_url = "mongodb+srv://FathimaIsmail:greencurtain@reservease.lxifjr8.mongodb.net/"

# Initialize MongoDB client
client = MongoClient(mongo_url)

# Access the database
db = client["ReservEase"]
users_collection = db["users"]



@app.route('/signin', methods=['POST'])
def signin():
    
    #print(request.json)   
    username = request.json['username']
    password = request.json['password']
    #print(username)
    #print(password)
    # Query MongoDB to find user with provided credentials
    user = users_collection.find_one({'username': username, 'password': password})
    #print(json.dumps (user))
    if user:
        # If user exists, set session variables for authentication
        session['user_id'] = str(user['_id'])
        session['username'] = user['username']
        user_json = json.loads(json_util.dumps(user))
        return jsonify({'success': True, 'user': user_json})
       # return  {"success":"true"}
       # return redirect('/dashboard')  # Redirect to dashboard or any other page
    else:
        return {"result":"false"}  # Show error message
    
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json  # Assuming JSON data is sent from Angular frontend
    lname=data.get('lname')
    fname=data.get('fname')
    eid=data.get('eid')
    designation=data.get('designation')
    state=data.get('state')
    region=data.get('region')
    phone=data.get('phone')
    username = data.get('username')
    mail = data.get('mail')
    password = data.get('password')

    existing_user = users_collection.find_one({'username': username})
    if existing_user:
        return jsonify({'alert': 'User already exists'})

    # Insert user data into MongoDB
    user = {
        'lname':lname,'fname':fname,'username': username,'eid':eid,'designation':designation,'state':state,
        'region':region,'phone':phone,'mail': mail,'password': password
    }
    users_collection.insert_one(user)
    #return {"success":"true"}
    return jsonify({'message': 'User signed up successfully'})

@app.route('/api/user_data', methods=['GET'])
def get_user_data():
    username = request.headers.get('username')
    user_data = users_collection.db.users.find_one({'username': username})
    return jsonify(user_data)

@app.route('/api/user_data', methods=['GET'])
def getUserData():
    username = request.headers.get('username')
    user_data = users_collection.db.users.find_one({'username': username})
    if user_data:
        return jsonify(user_data)
    else:
        return jsonify({'message': 'User not found'}), 404

if __name__ == '_main_':
    app.run(debug=True)
