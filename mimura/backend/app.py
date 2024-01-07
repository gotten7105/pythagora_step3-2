from flask import Flask, request, jsonify, render_template, make_response
import json
from flask_cors import CORS
import requests
from flask_sqlalchemy import SQLAlchemy

# Azure Database for MySQL
# REST APIでありCRUDを持っている
app = Flask(__name__)
CORS(app, origins=["*"]) # 許可するオリジンを指定

app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///C:\Users\w24ca\Desktop\Tech0\新しいフォルダー\cheers\SQLite\Cheers_DB.db'
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

@app.route("/")
def index():
    return "<p>Flask top page!</p>"

@app.route("/fetchtest")
def fetchtest():
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    return response.json(), 200

# HARDCODED_EMAIL = "sample@mail.com"
# HARDCODED_PASSWORD = "password123"

# @app.route("/login", methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     if email == HARDCODED_EMAIL and password == HARDCODED_PASSWORD:
#         return {"message": "ログイン成功"}, 200
#     else:
#         return {"message": "認証失敗"}, 401

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
        # ユーザーが存在する場合、詳細情報を返す
        user_info = {
        "user_name": user.user_name,
        "company": user.company,
        "working_area": user.working_area,
        "user_category1": user.user_category1,
        "user_category2": user.user_category2,
        "user_category3": user.user_category3,
        }
        # インデックス付きのリストに変換
        user_info = [{'index': i, **user_info} for i in range(len(user_info))]
        return json.dumps(user_info), 200, {'Content-Type': 'application/json'}
    else:
        # ユーザーが存在しない場合
        return jsonify({"error": "user not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)


    
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
    
#     @app.route('/users')
# def list_users():
#     users = User.query.all()
#     for user in users:
#         print(user.user_id, type(user.user_id))
#         print(user.mail_address, type(user.mail_address))
#         print(user.password, type(user.password))
#     return render_template('users.html', users=users)