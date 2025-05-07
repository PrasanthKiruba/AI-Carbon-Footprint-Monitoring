from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

model = joblib.load('carbon_emission_model.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.form
    input_data = [
        float(data['industry_output']),
        float(data['transport_distance']),
        float(data['energy_consumption'])
    ]
    prediction = model.predict([input_data])[0]
    return jsonify({'predicted_emission': round(prediction, 2)})

if __name__ == '__main__':
    app.run(debug=True)
