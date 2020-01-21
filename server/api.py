from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/addChoice", methods=['POST'])
def add_user_choice():
    data = request.data
    print('lower is data')
    print(data)
    return 'Hello world'

if __name__ == '__main__':
    app.run(host='192.168.2.42', port=5000)