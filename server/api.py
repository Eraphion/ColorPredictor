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

@app.route("/api/assessPrediction", methods=['POST'])
def assess_prediction():
    data = request.data.decode('utf-8')
    params = ast.literal_eval(data)
    with open('statistics.txt') as stats_file_read:
        stats = json.load(stats_file_read)
        liked_count = stats['liked']
        disliked_count=stats['disliked']
        used_count=stats['used_count']
    if params['liked']:
        liked_count = int(liked_count) + 1
    else:
        disliked_count = int(disliked_count) + 1
    new_stats={
        'liked': liked_count,
        'disliked': disliked_count,
        'used_count': used_count
    }
    with open('statistics.txt', 'w') as stats_file_write:
        json.dump(new_stats, stats_file_write)
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(host='192.168.2.42', port=5000)