from bson import ObjectId
from flask import Flask, render_template, redirect, request,session, jsonify
from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
rentalDatabase = client["rentalDatabase"]


app = Flask(__name__)
app.secret_key="123456"


@app.route('/')
def HomePage():
   vehiclesCollection = rentalDatabase["vehicles"]
   allVehicles = vehiclesCollection.find()
   return render_template('index.html', vehicles=allVehicles)
   
@app.route('/vehicles')
def VehiclesPage():
   return render_template('vehicles.html')   

@app.route('/booking')
def BookingPage():
   return render_template('booking.html')


@app.route('/bookings', methods=['POST'])
def SubmitBooking():
   customerName = request.form['customerName']
   customerEmail = request.form['customerEmail']
   customerPhone = request.form['customerPhone']
   startDate = request.form['startDate']
   endDate = request.form['endDate']
   totalPrice = request.form['totalPrice']
   
   bookingsCollection = rentalDatabase["bookings"]
   
   bookingData = {
       "customerName": customerName,
       "customerEmail": customerEmail,
       "customerPhone": customerPhone,
       "startDate": startDate,
       "endDate": endDate,
       "totalPrice": totalPrice,
       "status": "confirmed"
   }
   
   bookingsCollection.insert_one(bookingData)
   
   return redirect('/bookings')

@app.route('/bookings')
def BookingsPage():
   bookingsCollection = rentalDatabase["bookings"]
   allBookings = bookingsCollection.find()
   return render_template('bookings.html', bookings=allBookings)

@app.route('/cancel/<bookingId>')
def CancelBooking(bookingId):
   bookingsCollection = rentalDatabase["bookings"]
   bookingsCollection.delete_one({"_id": ObjectId(bookingId)})
   return redirect('/bookings')

@app.route('/login', methods=['GET', 'POST'])
def LoginPage():
   if request.method == 'POST':
       login_details=request.get_json()
       username=login_details.get('username')
       password=login_details.get('password')

       if username == 'admin' and password == 'admin123':
           session['logged_in'] = True
           session['username'] = username
           return jsonify({"success":True})
       else:
           return jsonify({"success":False})
   
   return render_template('login.html')


@app.route('/admin')
def AdminPage():
   if 'logged_in' not in session:
       return redirect('/login')
   
   vehiclesCollection = rentalDatabase["vehicles"]
   allVehicles = vehiclesCollection.find()
   return render_template('admin.html', vehicles=allVehicles)

@app.route('/admin/add', methods=['POST'])
def AddVehicle():
   if 'logged_in' not in session:
       return jsonify({"success": False})
   
   data = request.get_json()
   
   vehiclesCollection = rentalDatabase["vehicles"]
   
   newVehicle = {
       "brand": data['brand'],
       "model": data['model'],
       "type": data['type'],
       "year": int(data['year']),
       "pricePerDay": int(data['pricePerDay']),
       "available": True
   }
   
   vehiclesCollection.insert_one(newVehicle)
   return jsonify({"success": True})

@app.route('/admin/delete/<vehicleId>', methods=['DELETE'])
def DeleteVehicle(vehicleId):
   if 'logged_in' not in session:
       return jsonify({"success": False})
   
   vehiclesCollection = rentalDatabase["vehicles"]
   vehiclesCollection.delete_one({"_id": ObjectId(vehicleId)})
   return jsonify({"success": True})

@app.route('/api/vehicles')
def GetVehicles():
   vehiclesCollection = rentalDatabase["vehicles"]
   
   searchText = request.args.get('search', '')
   vehicleType = request.args.get('vehicleType', '')
   maxPrice = request.args.get('maxPrice', '')
   
   allVehicles = list(vehiclesCollection.find())
   
   filteredVehicles = []
   
   for v in allVehicles:
       match = True
       
       if searchText:
           searchLower = searchText.lower()
           brandLower = v['brand'].lower()
           modelLower = v['model'].lower()
           if searchLower not in brandLower and searchLower not in modelLower:
               match = False
       
       if vehicleType:
           if v['type'] != vehicleType:
               match = False
       
       if maxPrice:
           if v['pricePerDay'] > int(maxPrice):
               match = False
       
       if match:
           v['_id'] = str(v['_id'])
           filteredVehicles.append(v)
   
   return jsonify(filteredVehicles)

if __name__ == '__main__':
   app.run(debug=True)

