from flask import Flask
from flask_cors import CORS
import requests  # requestsモジュールのインポート

app = Flask(__name__)
CORS(app)

# 既存のエンドポイント定義...

@app.route("/fetchtest")
def fetchtest():
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    return response.json(), 200
