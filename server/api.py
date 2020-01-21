from flask import Flask, request, jsonify
from flask_cors import CORS
import json, ast
from predictor import predict_color

app = Flask(__name__)
CORS(app)

training_data = []

def normalize_params(params):
    normalized_r = params['R']/255
    normalized_g = params['G']/255
    normalized_b = params['B']/255
    normalized_background = 0
    if params.get('color') == 'white':
        normalized_background = 0
    return {
        "r": normalized_r,
        "g": normalized_g,
        "b": normalized_b,
        "background": normalized_background
    }

@app.route("/api/addChoice", methods=['POST'])
def add_user_choice():
    data = request.data.decode('utf-8')
    params = ast.literal_eval(data)
    with open('userChoices.txt', 'a') as f:
        json.dump(normalize_params(params),f)
    return jsonify(success=True)

@app.route("/api/pickColor", methods=['GET'])
def pick_color():
    normalized_params = {
        'r': int(request.args.get('R')) / 255,
        'g': int(request.args.get('G')) / 255,
        'b': int(request.args.get('B')) / 255,
    }
    color = predict_color(normalized_params)
    return jsonify(color)

if __name__ == '__main__':
    app.run(host='192.168.2.42', port=5000)