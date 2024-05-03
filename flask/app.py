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
resources_collection=db["resources"]
spaces_collection=db["spaces"]



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

    myreservations= [] 
    # Insert user data into MongoDB
    user = {
        'lname':lname,'fname':fname,'username': username,'eid':eid,'designation':designation,'state':state,
        'region':region,'phone':phone,'mail': mail,'password': password,'myreservations':[]
    }
    users_collection.insert_one(user)
    #return {"success":"true"}
    return jsonify({'message': 'User signed up successfully'})

@app.route('/product/<id>' , methods=['POST'])     #to view a single resource
def get_product(id):
    resource = [{k:v for k,v in i.items() if k!='_id'} for i in resources_collection.find({'name':id})]
    print(jsonify(resource))
    if resource:
        return jsonify(resource)
    else:
        return jsonify({"error": "Product not found"}), 404

@app.route('/product' , methods=['GET'])
def get_products():
    resource = [{k:v for k,v in i.items() if k!='_id'} for i in resources_collection.find()]
    print(jsonify(resource))
    if resource:
        return jsonify(resource)
    else:
        return jsonify({"error": "Product not found"}), 404   

@app.route('/myreservation/<name>/<username>' , methods=['GET'])
def update_reservations(name,username):
    count=resources_collection.find_one({'name':name})['avail']
    if count==0:
        resources_collection.update_one({'name':name},{'$set':{'avail':count}})
        return jsonify({"result":"Unavailable","count":count,'name':name,"avail":count})
    resources_collection.update_one({'name':name},{'$set':{'avail':count-1}})
    myreservations=users_collection.find_one({'username':username})['myreservations']
    myreservations.append(name)
    users_collection.update_one({'username':username},{'$set':{'myreservations':myreservations}})
    print(myreservations)
    return jsonify({"result":"Booking Success","count":count-1,'name':name,"avail":count-1})




if __name__ == '_main_':
    app.run(debug=True)
