from flask import Flask, request, jsonify
from flask_cors import CORS
import json, ast
from predictor import predict_color

app = Flask(__name__)
CORS(app)

def normalize_params(params):
    normalized_r = params['R']/255
    normalized_g = params['G']/255
    normalized_b = params['B']/255
    normalized_background = 1
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
    stats = read_statistics()
    stats['records_count'] = stats['records_count'] + 1
    with open('statistics.txt', 'w') as stats_file:
        json.dump(stats, stats_file)
    data = request.data.decode('utf-8')
    params = ast.literal_eval(data)
    with open('userChoices.txt', 'a') as f:
        f.seek(0,2)
        f.write('|')
        json.dump(normalize_params(params),f)
    return jsonify(success=True)

@app.route("/api/pickColor", methods=['GET'])
def pick_color():
    stats = read_statistics()
    stats['used_total_count'] = stats['used_total_count'] + 1
    with open('statistics.txt', 'w') as stats_file:
        json.dump(stats, stats_file)
    normalized_params = {
        'r': float(request.args.get('R')) / 255,
        'g': float(request.args.get('G')) / 255,
        'b': float(request.args.get('B')) / 255,
    }
    color = predict_color(normalized_params)
    return jsonify(color)


def read_statistics():
    with open('statistics.txt') as stats_file:
        try:
            stats = json.load(stats_file)
            liked_count = stats['liked_count']
            disliked_count=stats['disliked_count']
            used_total_count=stats['used_total_count']
            records_count=stats['records_count']
        except json.decoder.JSONDecodeError:
            liked_count = 0
            disliked_count = 0
            used_total_count = 0
            records_count = 0

    return {
        'liked_count': int(liked_count),
        'disliked_count': int(disliked_count),
        'used_total_count': int(used_total_count),
        'records_count': int(records_count)
    }


@app.route("/api/assessPrediction", methods=['POST'])
def assess_prediction():
    data = request.data.decode('utf-8')
    params = ast.literal_eval(data)
    stats = read_statistics()
    is_liked = params['liked'] == 'True'
    if is_liked:
        stats['liked_count'] = stats['liked_count'] + 1
    else:
        stats['disliked_count'] = stats['disliked_count'] + 1
    with open('statistics.txt', 'w') as stats_file:
        json.dump(stats, stats_file)
    return jsonify(success=True)

@app.route("/api/statistics", methods=['GET'])
def get_statistics():
    return jsonify(read_statistics())

if __name__ == '__main__':
    app.run(host='192.168.2.42', port=5000)