from flask import Flask, request, jsonify, render_template, make_response
import json
from flask_cors import CORS
from db_control import crud, mymodels
import requests
from flask_sqlalchemy import SQLAlchemy

# Azure Database for MySQL
# REST APIでありCRUDを持っている
app = Flask(__name__)
CORS(app, origins=["*"]) # 許可するオリジンを指定

app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///C:\Users\w24ca\Desktop\Tech0\cheers0103\LinkFlaskNext-main\SQLite\Cheers_DB.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'  # ここでテーブル名を指定
    user_id = db.Column(db.Integer, primary_key=True)
    mail_address = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

@app.route('/users')
def list_users():
    users = User.query.all()
    for user in users:
        print(user.user_id, type(user.user_id))
        print(user.mail_address, type(user.mail_address))
        print(user.password, type(user.password))
    return render_template('users.html', users=users)

@app.route("/")
def index():
    return "<p>Flask top page!</p>"

# @app.route("/customers", methods=['POST'])
# def create_customer():
#     values = request.get_json()
#     # values = {
#     #     "customer_id": "C005",
#     #     "customer_name": "佐藤Aこ",
#     #     "age": 64,
#     #     "gender": "女"
#     # }
#     tmp = crud.myinsert(mymodels.Customers, values)
#     result = crud.myselect(mymodels.Customers, values.get("customer_id"))
#     return result, 200

# @app.route("/customers", methods=['GET'])
# def read_one_customer():
#     model = mymodels.Customers
#     target_id = request.args.get('customer_id') #クエリパラメータ
#     result = crud.myselect(mymodels.Customers, target_id)
#     return result, 200

# @app.route("/allcustomers", methods=['GET'])
# def read_all_customer():
#     model = mymodels.Customers
#     result = crud.myselectAll(mymodels.Customers)
#     return result, 200

# @app.route("/customers", methods=['PUT'])
# def update_customer():
#     print("I'm in")
#     values = request.get_json()
#     values_original = values.copy()
#     model = mymodels.Customers
#     # values = {  "customer_id": "C004",
#     #             "customer_name": "鈴木C子",
#     #             "age": 44,
#     #             "gender": "男"}
#     tmp = crud.myupdate(model, values)
#     result = crud.myselect(mymodels.Customers, values_original.get("customer_id"))
#     return result, 200

# @app.route("/customers", methods=['DELETE'])
# def delete_customer():
#     model = mymodels.Customers
#     target_id = request.args.get('customer_id') #クエリパラメータ
#     result = crud.mydelete(model, target_id)
#     return result, 200

@app.route("/fetchtest")
def fetchtest():
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    return response.json(), 200

HARDCODED_EMAIL = "sample@mail.com"
HARDCODED_PASSWORD = "password123"

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email == HARDCODED_EMAIL and password == HARDCODED_PASSWORD:
        return {"message": "ログイン成功"}, 200
    else:
        return {"message": "認証失敗"}, 401

if __name__ == '__main__':
    app.run(debug=True)