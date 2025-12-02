from flask import Flask, render_template, redirect, request
from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
rentalDatabase = client["rentalDatabase"]


app = Flask(__name__)


@app.route('/')
def HomePage():
   return render_template('index.html')
   
@app.route('/vehicles')
def VehiclesPage():
   return render_template('vehicles.html')   

@app.route('/booking')
def BookingPage():
   return render_template('booking.html')


@app.route('/booking', methods=['POST'])
def SubmitBooking():
   customerName = request.form['customerName']
   customerEmail = request.form['customerEmail']
   customerPhone = request.form['customerPhone']
   startDate = request.form['startDate']
   endDate = request.form['endDate']
   totalPrice = request.form['totalPrice']
   
   
   
   return redirect('/bookings')

if __name__ == '__main__':
   app.run(debug=True)

