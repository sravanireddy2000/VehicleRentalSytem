from flask import Flask, render_template
from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
rentalDatabase = client["rental_database"]


app = Flask(__name__)



@app.route('/')
def HomePage():
   return render_template('index.html')
   
if __name__ == '__main__':
   app.run(debug=True)

