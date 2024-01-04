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
    user_name = db.Column(db.String(80), nullable=False)
    company = db.Column(db.String(80), nullable=False)
    user_class = db.Column(db.String(80), nullable=False)
    working_area = db.Column(db.String(80), nullable=False)
    user_category1 = db.Column(db.String(80), nullable=False)
    user_category2 = db.Column(db.String(80), nullable=False)
    user_category3 = db.Column(db.String(80), nullable=False)

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

@app.route("/user", methods=['GET'])
def read_user_info():
    mail_address = request.args.get('mail_address') # クエリパラメータの変更
    user = User.query.filter_by(mail_address=mail_address).first()

    if user:
        # ユーザー情報が存在する場合
        user_info = {
        "user_name": user.user_name,
        "company": user.company,
        "user_class":user.user_class,
        "working_area": user.working_area,
        "user_category1": user.user_category1,
        "user_category2": user.user_category2,
        "user_category3": user.user_category3,
        }

        # インデックス付きのリストに変換
        user_info = [{'index': i, **user_info} for i in range(len(user_info))]

        return json.dumps(user_info), 200, {'Content-Type': 'application/json'}
    else:
        # ユーザー情報が存在しない場合
        return jsonify({"error": "user not found"}), 404






if __name__ == "__main__":
    app.run(debug=True)
