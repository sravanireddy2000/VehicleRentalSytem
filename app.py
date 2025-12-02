from flask import Flask, render_template
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


if __name__ == '__main__':
   app.run(debug=True)

