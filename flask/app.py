import json
from flask import Flask, jsonify, redirect, render_template, request, session
from flask_cors import CORS  # type: ignore
from pymongo import MongoClient # type: ignore
from bson import ObjectId, json_util # type: ignore


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
spaces_collection=db["Spaces"]
a_collection=db["Cabin A"]
b_collection=db["CabinB"]
admin_collection=db["Admin"]


@app.route('/signin', methods=['POST'])
def signin():
    
    #print(request.json)   
    username = request.json['username']
    password = request.json['password']
    #print(username)
    #print(password)
    # Query MongoDB to find user with provided credentials
    admin=admin_collection.find_one({'username':username,'password':password})
    if admin:
        # If admin exists, set session variables for authentication
        session['id'] = str(admin['_id'])
        session['username'] = admin['username']
        admin_json = json.loads(json_util.dumps(admin))
        return jsonify({'successfull': True, 'admin': admin_json})
       # return  {"success":"true"}
       # return redirect('/dashboard')  # Redirect to dashboard or any other page
    else:
        user = users_collection.find_one({'username': username, 'password': password})
        #print(json.dumps (user))
        if user:
            # If user exists, set session variables for authentication
            session['id'] = str(user['_id'])
            session['username'] = user['username']
            user_json = json.loads(json_util.dumps(user))
            return jsonify({'success': True, 'user': user_json})
        # return  {"success":"true"}
        # return redirect('/dashboard')  # Redirect to dashboard or any other page
        else:
            return {"result":"false"}  # Show error message
    
@app.route('/signout', methods=['POST'])
def signout():
    session.pop('username', None)
    session.pop('id', None)    
    return {"out":"true"}


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

    myreservations= {} 
    # Insert user data into MongoDB
    user = {
        'lname':lname,'fname':fname,'username': username,'eid':eid,'designation':designation,'state':state,
        'region':region,'phone':phone,'mail': mail,'password': password,'myreservations':{}
    }
    users_collection.insert_one(user)
    #return {"success":"true"}
    return jsonify({'message': 'User signed up successfully'})



@app.route('/product/<name>' , methods=['POST'])     #to view a single resource
def get_product(name):
    resource = [{k:v for k,v in i.items() if k!='_id'} for i in resources_collection.find_one({'name':name})]
    print(jsonify(resource))
    if resource:
        return jsonify(resource)
    else:
        return jsonify({"error": "Product not found"}), 404



@app.route('/product' , methods=['GET'])
def get_products():
    # if not is_user_logged_in():
    #     return jsonify({"redirect":"true"})
    resource = [{k:v for k,v in i.items() if k!='_id'} for i in resources_collection.find()]
    print(jsonify(resource))
    if resource:
        return jsonify(resource)
    else:
        return jsonify({"error": "Product not found"})   



@app.route('/resources/<name>/<username>' , methods=['GET'])
def update_reservations(name,username):
    count=resources_collection.find_one({'name':name})['avail']
    if count==0:
        resources_collection.update_one({'name':name},{'$set':{'avail':count}})
        return jsonify({"result":"Unavailable","count":count,'name':name,"avail":count})
    resources_collection.update_one({'name':name},{'$set':{'avail':count-1}})
    myreservations=users_collection.find_one({'username':username})['myreservations']
    print(myreservations)
    count=myreservations.get(name,0)
    myreservations.update({name:count+1})
    # myreservations.append(name)
    users_collection.update_one({'username':username},{'$set':{'myreservations':myreservations}})
    # print(myreservations)
    return jsonify({"result":"Booked","count":count-1,'name':name,"avail":count-1})
    return jsonify({})



@app.route('/spaces/<name>/<username>' , methods=['GET'])   
def update_spaces(name,username):
    count=spaces_collection.find_one({'name':name})['avail']
    if count==0:
        spaces_collection.update_one({'name':name},{'$set':{'avail':count}})
        return jsonify({"result":"Unavailable","count":count,'name':name,"avail":count})
    myreservations=users_collection.find_one({'username':username})['myreservations']
    space=myreservations.get("space","")
    if space:
        return jsonify({"result":"Cannot be booked(One room per person)"})
    myreservations.update({"space":name})
    spaces_collection.update_one({'name':name},{'$set':{'avail':count-1}})
    users_collection.update_one({'username':username},{'$set':{'myreservations':myreservations}})
    print(myreservations)
    return jsonify({"result":"Booked","count":count-1,'name':name,"avail":count-1})



@app.route('/cabina/<name>/<username>' , methods=['GET'])   #update cabin a
def update_cabina(name,username):
    count=a_collection.find_one({'name':name})['avail']
    if count==0:
        a_collection.update_one({'name':name},{'$set':{'avail':count}})
        return jsonify({"result":"Unavailable","count":count,'name':name,"avail":count})
    myreservations=users_collection.find_one({'username':username})['myreservations']
    cabin=myreservations.get("cabin","")
    if cabin:
        return jsonify({"result":"Cannot be booked(One cabin per person)"})
    myreservations.update({"cabin":name})
    a_collection.update_one({'name':name},{'$set':{'avail':count-1}})
    users_collection.update_one({'username':username},{'$set':{'myreservations':myreservations}})
    print(myreservations)
    return jsonify({"result":"Booked","count":count-1,'name':name,"avail":count-1})

@app.route('/cabina', methods=['GET'])
def get_availability():
    cabins = a_collection.find({}, {"name": 1, "avail": 1})
    availability_data = []
    for cabin in cabins:
        name = cabin.get("name")
        avail = cabin.get("avail", 0)
        availability_data.append({"name": name, "avail": avail})
    return jsonify(availability_data)

@app.route('/cabinb/<name>/<username>' , methods=['GET'])   #update cabin a
def update_cabinb(name,username):
    count=b_collection.find_one({'name':name})['avail']
    if count==0:
        b_collection.update_one({'name':name},{'$set':{'avail':count}})
        return jsonify({"result":"Unavailable","count":count,'name':name,"avail":count})
    myreservations=users_collection.find_one({'username':username})['myreservations']
    cabin=myreservations.get("cabin","")
    if cabin:
        return jsonify({"result":"Cannot be booked(One cabin per person)"})
    myreservations.update({"cabin":name})
    b_collection.update_one({'name':name},{'$set':{'avail':count-1}})
    users_collection.update_one({'username':username},{'$set':{'myreservations':myreservations}})
    print(myreservations)
    return jsonify({"result":"Booked","count":count-1,'name':name,"avail":count-1})

@app.route('/cabinb', methods=['GET'])
def get_availability_b():
    cabins = b_collection.find({}, {"name": 1, "avail": 1})
    availability_data = []
    for cabin in cabins:
        name = cabin.get("name")
        avail = cabin.get("avail", 0)
        availability_data.append({"name": name, "avail": avail})
    return jsonify(availability_data)


@app.route('/cartr/<username>', methods=['GET'])  
def get_user_bookings(username):
    user = users_collection.find_one({'username': username})
    if user:
        cart = user.get('myreservations', {})
        cart_items=[]
        for booking_name in cart:
            cart_item = resources_collection.find_one({'name': booking_name})
            if cart_item:
                cart_item['_id'] = str(cart_item.get('_id'))
                cart_items.append(cart_item)
        return jsonify({'cart':cart_items,'myreservations':cart})
    else:
        return jsonify({'message': 'User not found'})
    
@app.route('/carts/<username>', methods=['GET'])        
def get_user_booking(username):
    user = users_collection.find_one({'username': username})
    if user:
        cart = user.get('myreservations', [])
        #return jsonify({'cart': cart})
        cart_items=[]
        for booking_name in cart:
            # print(booking_name)
            cart_item1 = spaces_collection.find_one({'name': cart[booking_name]})
            cart_item2 = a_collection.find_one({'name': cart[booking_name]})
            cart_item3 =b_collection.find_one({'name': cart[booking_name]})

            if cart_item1:
                cart_item1['_id'] = str(cart_item1.get('_id'))
                cart_items.append(cart_item1)
            if cart_item2:
                cart_item2['_id'] = str(cart_item2.get('_id'))
                cart_items.append(cart_item2)
            if cart_item3:
                cart_item3['_id'] = str(cart_item3.get('_id'))
                cart_items.append(cart_item3)
            
        return jsonify({'cart':cart_items})
    else:
        return jsonify({'message': 'User not found'})

@app.route('/cancel/<reservation_name>', methods=['POST'])
def cancel_reservation(reservation_name):
    username = request.json.get('username')  
    item=users_collection.find_one({"username":username})
    if reservation_name in item["myreservations"]:
        resource = resources_collection.find_one({"name": reservation_name})
        if resource:
            resources_collection.update_one({"name": reservation_name}, {"$inc": {"avail": 1}})
            myreservations=users_collection.find_one({'username':username})['myreservations']
            print(myreservations)
            if myreservations[reservation_name]==1:
                users_collection.update_one({"username": username},{"$unset": {f"myreservations.{reservation_name}": 1}})  
            else:          
                users_collection.update_one({"username": username},{"$inc": {f"myreservations.{reservation_name}": -1}})            
            return jsonify({"message": "cancelled successfully", "reservation_name": reservation_name})
    else:
        myspaces = item.get("myreservations", {})
        for key, value in myspaces.items():
            if value == reservation_name:
                collection = None
                if a_collection.find_one({"name":reservation_name}) :
                    collection = a_collection
                elif b_collection.find_one({"name":reservation_name}):
                    collection = b_collection
                elif spaces_collection.find_one({"name":reservation_name}) :
                    collection = spaces_collection
                if collection is not None:
                    collection.update_one({"name": reservation_name}, {"$inc": {"avail": 1}})
                    users_collection.update_one({"username": username}, {"$unset": {f"myreservations.{key}": 1}})
                    return jsonify({"message": "Cancelled successfully", "reservation_name": reservation_name})
    return jsonify({"error": "Resource not found"})

if __name__ == '_main_':
    app.run(debug=True)
