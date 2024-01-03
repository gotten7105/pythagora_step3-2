from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask_cors import CORS
import json

import requests

app = Flask(__name__)
CORS(app, origins=["*"]) # 許可するオリジンを指定

app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///C:\Users\zip-b\Tech0 step3-2\SQlite_DB\Cheers_DB.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'  # ここでテーブル名を指定
    user_id = db.Column(db.Integer, primary_key=True)
    mail_address = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    mail_address = data['mail_address']
    password = data['password']

    user = User.query.filter_by(mail_address=mail_address, password=password).first()

    if user:
        # ログイン成功
        response = make_response(jsonify(success=True), 200)
    else:
        # ログイン失敗
        response = make_response(jsonify(success=False), 401)

    return response

if __name__ == "__main__":
    app.run(debug=True)
