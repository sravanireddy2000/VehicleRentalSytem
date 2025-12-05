from bson import ObjectId
from flask import Flask, render_template, redirect, request
from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
rentalDatabase = client["rentalDatabase"]


app = Flask(__name__)

@app.route('/add-sample-vehicles')
def AddSampleVehicles():
   vehiclesCollection = rentalDatabase["vehicles"]
   
   sampleVehicles = [
       {
           "brand": "Toyota",
           "model": "Camry",
           "type": "sedan",
           "year": 2023,
           "pricePerDay": 5000000,
           "available": True,
           "features": ["AC", "GPS", "Bluetooth"]
       },
       {
           "brand": "Honda",
           "model": "CRV",
           "type": "suv",
           "year": 2022,
           "pricePerDay": 7500000,
           "available": True,
           "features": ["AC", "4WD", "Camera"]
       },
       {
           "brand": "Mercedez",
           "model": "S10",
           "type": "suv",
           "year": 2023,
           "pricePerDay": 1000000,
           "available": True,
           "features": ["AC", "Comfortable","GPS"]
       }
   ]
   
   vehiclesCollection.insert_many(sampleVehicles)
   return "Sample vehicles added!"


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

if __name__ == '__main__':
   app.run(debug=True)

