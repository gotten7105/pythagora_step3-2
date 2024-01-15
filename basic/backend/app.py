from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import func
from sqlalchemy import desc
import json
import re
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests
import uuid
import hashlib

app = Flask(__name__)
CORS(app, origins=["*"]) # 許可するオリジンを指定

app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///C:\Users\zip-b\Tech0 step3-2\SQlite_DB\Cheers_DB.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'  # ここでテーブル名を指定
    user_id = db.Column(db.Integer, nullable=False)
    mail_address = db.Column(db.String(120), primary_key=True, unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    user_name = db.Column(db.String(80), nullable=False)
    company = db.Column(db.String(80), nullable=False)
    working_area = db.Column(db.String(80), nullable=False)
    user_category1 = db.Column(db.String(80), nullable=False)
    user_category2 = db.Column(db.String(80), nullable=False)
    user_category3 = db.Column(db.String(80), nullable=False)
    user_shop1 = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'))
    user_shop2 = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'))
    user_shop3 = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'))
    last_update = db.Column(db.String(80), nullable=True)

class Event(db.Model):
    __tablename__ = 'events'  # ここでテーブル名を指定
    event_id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, nullable=True)
    event_name = db.Column(db.String(80), nullable=False)
    mail_address = db.Column(db.String(80), nullable=False)
    guest_email = db.Column(db.String(80), nullable=False)
    event_date = db.Column(db.String(80), nullable=True)
    event_time = db.Column(db.String(80), nullable=True)
    event_charge = db.Column(db.Integer, nullable=True)
    event_area = db.Column(db.String(80), nullable=True)
    attendees = db.Column(db.Integer, nullable=True)
    last_update = db.Column(db.String(80), nullable=True)

class Guest(db.Model):
    __tablename__ = 'guests'  # ここでテーブル名を指定
    guest_id = db.Column(db.Integer, primary_key=True)
    guest_email = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    guest_category1 = db.Column(db.String(80), nullable=True)
    guest_category2 = db.Column(db.String(80), nullable=True)
    guest_category3 = db.Column(db.String(80), nullable=True)
    guest_memo = db.Column(db.String(300), nullable=True)
    last_update = db.Column(db.String(80), nullable=True)

class Restaurant(db.Model):
    __tablename__ = 'restaurants'  # ここでテーブル名を指定
    restaurant_id = db.Column(db.Integer, primary_key=True)
    restaurant_name = db.Column(db.String(120), unique=True, nullable=False)
    genre = db.Column(db.String(120), nullable=False)
    average_charge = db.Column(db.Integer, nullable=True)
    restaurant_address = db.Column(db.String(120), nullable=True)
    restaurant_url = db.Column(db.String(120), nullable=True)
    restaurant_image = db.Column(db.String(300), nullable=True)
    regular_holiday = db.Column(db.String(120), nullable=True)
    restaurant_public_evaluation = db.Column(db.Integer, nullable=True)
    open_time = db.Column(db.String(80), nullable=True)
    last_update = db.Column(db.String(80), nullable=True)

class Participant_information(db.Model):
    __tablename__ = 'participant_information'  # ここでテーブル名を指定
    uuid = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    attendance = db.Column(db.Integer, nullable=True)
    restaurant_evaluation = db.Column(db.Integer, nullable=True)
    restaurant_comment = db.Column(db.String(300), nullable=True)
    event_evaluation = db.Column(db.Integer, nullable=True)
    event_comment = db.Column(db.String(300), nullable=True)
    last_update = db.Column(db.String(80), nullable=True)


def extract_id_from_url(url):
    match = re.search(r'/(\d+)/?$', url)
    return int(match.group(1)) if match else 0


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
    mail_address = request.args.get('mail_address')
    user = User.query.filter_by(mail_address = mail_address).first()

    if user:
        # ユーザーが存在する場合、詳細情報を返す
        user_info = {
            "user_name": user.user_name,
            "company": user.company,
            "working_area": user.working_area,
            "user_category1": user.user_category1,
            "user_category2": user.user_category2,
            "user_category3": user.user_category3
        }
        return jsonify(user_info)
    else:
        # ユーザーが存在しない場合
        return jsonify({"message": "ユーザーが存在しません"})

@app.route("/event", methods=['POST'])
def create_event():
    data = request.get_json()
    event_name = data['event_name']
    guest_email = data['guest_email']
    mail_address = data['mail_address']
    restaurant_id = 0
    event_date = ""
    event_time = ""
    event_charge = 0
    event_area = ""
    attendees = 0
    last_update = ""
    print(data)

    # Event インスタンスを作成
    new_event = Event(
        event_name = event_name,
        guest_email = guest_email,
        mail_address = mail_address,
        restaurant_id = restaurant_id,
        event_date = event_date,
        event_time = event_time,
        event_charge = event_charge,
        event_area = event_area,
        attendees = attendees,
        last_update = datetime.now()
        )
    print(new_event)

    # データベースに追加
    db.session.add(new_event)

    # 変更をコミット
    db.session.commit()

    return jsonify({"event_id": new_event.event_id}), 201

@app.route("/event", methods=['GET'])
def read_event_info():
    event_id = request.args.get('event_id')
    event = Event.query.filter_by(event_id = event_id).first()

    if event:
        # イベントが存在する場合、詳細情報を返す
        event_info = {
            "event_name" : event.event_name,
            "guest_email" : event.guest_email,
            "event_date" : event.event_date,
            "event_time" : event.event_time,
            "event_charge" : event.event_charge,
            "event_area" : event.event_area,
            "attendees" : event.attendees
            }
        return jsonify(event_info)
    else:
        # ユーザーが存在しない場合
        return jsonify({"message": "イベントが存在しません"})

@app.route("/daytime", methods=['POST'])
def event_daytime():
    data = request.get_json()
    event_id = data['event_id']
    event_date = data['event_date']
    event_time = data['event_time']

    # 既存のイベントを取得
    event = Event.query.filter_by(event_id=event_id).first()

    if event:
        # イベントのデータを更新
        event.event_date = event_date
        event.event_time = event_time
        event.last_update = datetime.now()

        # データベースに変更をコミット
        db.session.commit()

        return jsonify({"message": "Event updated successfully", "event_id": event_id}), 200
    else:
        # イベントが存在しない場合
        return jsonify({"message": "Event not found"}), 404


@app.route("/guest", methods=['GET'])
def read_guest_info():
    guest_email = request.args.get('guest_email')
    event = Guest.query.filter_by(guest_email = guest_email).first()

    if event:
        # イベントが存在する場合、詳細情報を返す
        event_info = {
            "guest_id" : event.guest_id,
            "guest_email" : event.guest_email,
            "guest_category1" : event.guest_category1,
            "guest_category2" : event.guest_category2,
            "guest_category3" : event.guest_category3,
            "guest_memo" : event.guest_memo,
            }
        return jsonify(event_info)
    else:
        # ユーザーが存在しない場合
        return jsonify({"message": "ゲストが存在しません"})


@app.route("/restaurant", methods=['POST'])
def post_restaurant():
    data = request.get_json()
    event_id = data['event_id']
    restaurant_id = data['restaurant_id']

    # 既存のイベントを取得
    event = Event.query.filter_by(event_id=event_id).first()

    if event:
        # イベントのデータを更新
        event.restaurant_id = restaurant_id
        event.last_update = datetime.now()

        # データベースに変更をコミット
        db.session.commit()

        return jsonify({"message": "Event updated successfully", "event_id": event_id}), 200
    else:
        # イベントが存在しない場合
        return jsonify({"message": "Event not found"}), 404


@app.route("/restaurant", methods=['GET'])
def get_restaurant():
    mail_address = request.args.get('mail_address')
    user = User.query.filter_by(mail_address=mail_address).first()

    if user:
        shops = []
        for shop_id in [user.user_shop1, user.user_shop2, user.user_shop3]:
            if shop_id:
                shop = Restaurant.query.get(shop_id)
                if shop:
                    shop_info = {
                        "restaurant_id": shop.restaurant_id,
                        "restaurant_name": shop.restaurant_name,
                        "genre": shop.genre,
                        "average_charge": shop.average_charge,
                        "restaurant_address": shop.restaurant_address,
                        "restaurant_url": shop.restaurant_url,
                        "restaurant_image": shop.restaurant_image,
                        "regular_holiday": shop.regular_holiday,
                        "restaurant_public_evaluation": shop.restaurant_public_evaluation
                    }
                    shops.append(shop_info)

        result_json = json.dumps(shops, ensure_ascii=False)
        return result_json
    else:
        return jsonify({"message": "User not found"}), 404


@app.route("/set_restaurant", methods=['GET'])
def get_restaurant_info():
    event_id = request.args.get('event_id')
    event_data = db.session.query(
        Event.restaurant_id,
        Restaurant.restaurant_name, Restaurant.genre, Restaurant.average_charge,
        Restaurant.restaurant_address, Restaurant.restaurant_url,
        Restaurant.restaurant_image, Restaurant.regular_holiday,
        Restaurant.restaurant_public_evaluation, Restaurant.open_time,
    ).join(Restaurant, Restaurant.restaurant_id == Event.restaurant_id
    ).filter(Event.event_id == event_id
    ).first()

    if not event_data:
        return jsonify({"message": "Event or Restaurant not found"}), 404

    event_info = {
        "restaurant_id": event_data.restaurant_id,
        "restaurant_name": event_data.restaurant_name,
        "genre": event_data.genre,
        "average_charge": event_data.average_charge,
        "restaurant_address": event_data.restaurant_address,
        "restaurant_url": event_data.restaurant_url,
        "restaurant_image": event_data.restaurant_image,
        "regular_holiday": event_data.regular_holiday,
        "restaurant_public_evaluation": event_data.restaurant_public_evaluation,
        "open_time": event_data.open_time,
    }
    return jsonify(event_info)



@app.route("/eventlog", methods=['GET'])
def get_guest_events():
    guest_email = request.args.get('guest_email')
    current_date = datetime.now().strftime("%Y-%m-%d")  # 現在の日付を取得
    guest = Guest.query.filter_by(guest_email=guest_email).first()

    if not guest:
        return jsonify({"message": "Guest not found"}), 404

    # イベント情報と関連するユーザー、レストラン情報を取得
    events_data = db.session.query(
        Event.event_id, Event.restaurant_id, Event.mail_address, Event.event_name,
        Event.event_date, Event.event_charge, Event.attendees, User.user_name,
        Restaurant.restaurant_name, Restaurant.genre, Restaurant.restaurant_address,
        Restaurant.restaurant_image, Restaurant.restaurant_public_evaluation
    ).join(User, User.mail_address == Event.mail_address
    ).join(Restaurant, Restaurant.restaurant_id == Event.restaurant_id
    ).filter(Event.guest_email == guest_email,
            Event.event_date < current_date  # 現在の日付より古いイベントのみを取得
    ).order_by(Event.event_date.desc()).limit(3)

    event_logs = []
    for event in events_data:
        # 各イベントに対する参加情報を取得
        participant_info = Participant_information.query.filter_by(event_id=event.event_id).all()

        # レストラン評価とイベント評価の平均を計算
        restaurant_evaluation_avg = db.session.query(func.avg(Participant_information.restaurant_evaluation)).filter_by(event_id=event.event_id).scalar()
        event_evaluation_avg = db.session.query(func.avg(Participant_information.event_evaluation)).filter_by(event_id=event.event_id).scalar()

        # コメントの結合
        total_restaurant_comment = "\n".join([p.restaurant_comment for p in participant_info if p.restaurant_comment])
        total_event_comment = "\n".join([p.event_comment for p in participant_info if p.event_comment])

        event_log = {
            "event_name": event.event_name,
            "restaurant_evaluation_ave": round(float(restaurant_evaluation_avg), 2) if restaurant_evaluation_avg is not None else None,
            "event_evaluation_ave": round(float(event_evaluation_avg), 2) if event_evaluation_avg is not None else None,
            "event_date": event.event_date if event.event_date else None,
            "average_charge": event.event_charge,
            "user_name": event.user_name,
            "guest_email": guest_email,
            "attendees": event.attendees,
            "total_restaurant_comment": total_restaurant_comment,
            "total_event_comment": total_event_comment,
            "restaurant_name": event.restaurant_name,
            "genre": event.genre,
            "restaurant_address": event.restaurant_address,
            "restaurant_image": event.restaurant_image,
            "restaurant_public_evaluation": event.restaurant_public_evaluation
        }
        event_logs.append(event_log)

    result_json = json.dumps(event_logs, ensure_ascii=False)
    return result_json


@app.route("/recommend_random", methods=['GET'])
def get_recommend_random():
    data = request.args.get('select')
    print(data)

    cate_array2 = ["日本料理", "海鮮","鮨", "天ぷら", "鍋", "郷土料理", "居酒屋", "焼き鳥",
                "焼肉", "ステーキ", "イタリアン", "ダイニングバー", "フレンチ",
                "スペイン料理", "中華料理", "韓国料理",
                "日本酒", "焼酎", "ワイン", "スイーツ", "ダーツ",
                "カラオケ", "飲み放題あり", "個室", "貸切可", "禁煙", "喫煙可"]

    flask_array2 = {}
    query_array2 = []
    for i in range(27):
        if data[i] == "1":
            flask_array2[cate_array2[i]] = True
            query_array2.append(cate_array2[i])

    subquery = db.session.query(
        Event.restaurant_id,
        func.avg(Participant_information.restaurant_evaluation).label("average_evaluation")
    ).join(Event, Event.event_id == Participant_information.event_id) \
    .group_by(Event.restaurant_id).subquery()

    results = {}
    for category in query_array2:
        if category == '鮨':
            # 「鮨」または「寿司」を含むレストランを取得
            restaurants = Restaurant.query.filter(
                (Restaurant.genre.like("%鮨%")) | (Restaurant.genre.like("%寿司%"))
            ).order_by(func.random()).limit(3).all()
        else:
            # その他のカテゴリを含むレストランを取得
            restaurants = Restaurant.query.filter(
                Restaurant.genre.like(f"%{category}%")
            ).order_by(func.random()).limit(3).all()

        category_results = []
        for restaurant in restaurants:
            # 平均評価を取得
            avg_evaluation = db.session.query(subquery.c.average_evaluation) \
                                    .filter(subquery.c.restaurant_id == restaurant.restaurant_id) \
                                    .scalar()

            category_results.append({
                "restaurant_id": restaurant.restaurant_id,
                "restaurant_name": restaurant.restaurant_name,
                "genre": restaurant.genre,
                "average_charge": restaurant.average_charge,
                "restaurant_address": restaurant.restaurant_address,
                "restaurant_url": restaurant.restaurant_url,
                "restaurant_image": restaurant.restaurant_image,
                "regular_holiday": restaurant.regular_holiday,
                "restaurant_public_evaluation": restaurant.restaurant_public_evaluation,
                "average_evaluation": float(avg_evaluation) if avg_evaluation else None  # 平均評価を追加
            })

        results[category] = category_results

    return jsonify(results)


@app.route("/recommend_restaurant_public_evaluation", methods=['GET'])
def get_recommend_restaurant_public_evaluation():
    data = request.args.get('select')
    print(data)

    cate_array2 = ["日本料理", "海鮮","鮨", "天ぷら", "鍋", "郷土料理", "居酒屋", "焼き鳥",
                "焼肉", "ステーキ", "イタリアン", "ダイニングバー", "フレンチ",
                "スペイン料理", "中華料理", "韓国料理",
                "日本酒", "焼酎", "ワイン", "スイーツ", "ダーツ",
                "カラオケ", "飲み放題あり", "個室", "貸切可", "禁煙", "喫煙可"]

    flask_array2 = {}
    query_array2 = []
    for i in range(27):
        if data[i] == "1":
            flask_array2[cate_array2[i]] = True
            query_array2.append(cate_array2[i])

    subquery = db.session.query(
        Event.restaurant_id,
        func.avg(Participant_information.restaurant_evaluation).label("average_evaluation")
    ).join(Event, Event.event_id == Participant_information.event_id) \
    .group_by(Event.restaurant_id).subquery()

    results = {}  # results を空の辞書として初期化

    for category in query_array2:
        if category == '鮨':
            # 「鮨」または「寿司」を含むレストランを取得（評価の高い順）
            restaurants = Restaurant.query.filter(
                (Restaurant.genre.like("%鮨%") | Restaurant.genre.like("%寿司%")),
                Restaurant.restaurant_public_evaluation != ''
            ).order_by(Restaurant.restaurant_public_evaluation.desc()).limit(3).all()
        else:
            # その他のカテゴリを含むレストランを取得（評価の高い順）
            restaurants = Restaurant.query.filter(
                Restaurant.genre.like(f"%{category}%"),
                Restaurant.restaurant_public_evaluation != ''
            ).order_by(Restaurant.restaurant_public_evaluation.desc()).limit(3).all()

        category_results = []
        for restaurant in restaurants:
            # 平均評価を取得
            avg_evaluation = db.session.query(subquery.c.average_evaluation) \
                                    .filter(subquery.c.restaurant_id == restaurant.restaurant_id) \
                                    .scalar()

            category_results.append({
                "restaurant_id": restaurant.restaurant_id,
                "restaurant_name": restaurant.restaurant_name,
                "genre": restaurant.genre,
                "average_charge": restaurant.average_charge,
                "restaurant_address": restaurant.restaurant_address,
                "restaurant_url": restaurant.restaurant_url,
                "restaurant_image": restaurant.restaurant_image,
                "regular_holiday": restaurant.regular_holiday,
                "restaurant_public_evaluation": restaurant.restaurant_public_evaluation,
                "average_evaluation": float(avg_evaluation) if avg_evaluation else None  # 平均評価を追加
            })

        results[category] = category_results

    return jsonify(results)


@app.route("/recommend_average_evaluation", methods=['GET'])
def get_recommend_average_evaluation():
    data = request.args.get('select')
    print(data)

    cate_array2 = ["日本料理", "海鮮","鮨", "天ぷら", "鍋", "郷土料理", "居酒屋", "焼き鳥",
                "焼肉", "ステーキ", "イタリアン", "ダイニングバー", "フレンチ",
                "スペイン料理", "中華料理", "韓国料理",
                "日本酒", "焼酎", "ワイン", "スイーツ", "ダーツ",
                "カラオケ", "飲み放題あり", "個室", "貸切可", "禁煙", "喫煙可"]

    flask_array2 = {}
    query_array2 = []
    for i in range(27):
        if data[i] == "1":
            flask_array2[cate_array2[i]] = True
            query_array2.append(cate_array2[i])

    subquery = db.session.query(
        Event.restaurant_id,
        func.avg(Participant_information.restaurant_evaluation).label("average_evaluation")
    ).join(Event, Event.event_id == Participant_information.event_id) \
    .group_by(Event.restaurant_id).subquery()

    results = {}
    for category in query_array2:
        if category == '鮨':
            # ジャンルが「鮨」の場合、「寿司」を含むレストランも取得する
            query = Restaurant.query.join(
                subquery, Restaurant.restaurant_id == subquery.c.restaurant_id
            ).filter(
                (Restaurant.genre.like("%鮨%") | Restaurant.genre.like("%寿司%")),
                subquery.c.average_evaluation.isnot(None)
            )
        else:
            # それ以外のカテゴリは通常通り処理を行う
            query = Restaurant.query.join(
                subquery, Restaurant.restaurant_id == subquery.c.restaurant_id
            ).filter(
                Restaurant.genre.like(f"%{category}%"),
                subquery.c.average_evaluation.isnot(None)
            )

        # 平均評価で降順に並べ替えて上位3件を取得
        query = query.order_by(desc(subquery.c.average_evaluation)).limit(3)
        restaurants = query.all()

        category_results = []
        for restaurant in restaurants:
            avg_evaluation = db.session.query(subquery.c.average_evaluation) \
                                    .filter(subquery.c.restaurant_id == restaurant.restaurant_id) \
                                    .scalar()

            avg_evaluation_rounded = round(float(avg_evaluation), 2) if avg_evaluation else None

            category_results.append({
                "restaurant_id": restaurant.restaurant_id,
                "restaurant_name": restaurant.restaurant_name,
                "genre": restaurant.genre,
                "average_charge": restaurant.average_charge,
                "restaurant_address": restaurant.restaurant_address,
                "restaurant_url": restaurant.restaurant_url,
                "restaurant_image": restaurant.restaurant_image,
                "regular_holiday": restaurant.regular_holiday,
                "restaurant_public_evaluation": restaurant.restaurant_public_evaluation,
                "average_evaluation": avg_evaluation_rounded
            })

        results[category] = category_results

    return jsonify(results)


@app.route("/recommend_new_open", methods=['GET'])
def get_recommend_new_open():
    data = request.args.get('select')
    print(data)

    cate_array2 = ["日本料理", "海鮮","鮨", "天ぷら", "鍋", "郷土料理", "居酒屋", "焼き鳥",
                "焼肉", "ステーキ", "イタリアン", "ダイニングバー", "フレンチ",
                "スペイン料理", "中華料理", "韓国料理",
                "日本酒", "焼酎", "ワイン", "スイーツ", "ダーツ",
                "カラオケ", "飲み放題あり", "個室", "貸切可", "禁煙", "喫煙可"]

    flask_array2 = {}
    query_array2 = []
    for i in range(27):
        if data[i] == "1":
            flask_array2[cate_array2[i]] = True
            query_array2.append(cate_array2[i])

    subquery = db.session.query(
        Event.restaurant_id,
        func.avg(Participant_information.restaurant_evaluation).label("average_evaluation")
    ).join(Event, Event.event_id == Participant_information.event_id) \
    .group_by(Event.restaurant_id).subquery()

    results = {}
    for category in query_array2:
    # ジャンルが「鮨」の場合は「鮨」または「寿司」が含まれるレストランを抽出する
        if category == '鮨':
            # ジャンルが「鮨」の場合、「寿司」を含むレストランも取得する
            restaurants = Restaurant.query.filter(
                (Restaurant.genre.like("%鮨%") | Restaurant.genre.like("%寿司%")),
            )
        else:
            # それ以外のカテゴリは通常通り処理を行う
            restaurants = Restaurant.query.filter(
                Restaurant.genre.like(f"%{category}%")
            )

        # restaurant_url の末尾の数字に基づいてレコードを降順に並べ替える
        sorted_restaurants = sorted(restaurants, key=lambda r: extract_id_from_url(r.restaurant_url), reverse=True)[:3]


        category_results = []
        for restaurant in sorted_restaurants:
            avg_evaluation = db.session.query(subquery.c.average_evaluation) \
                                    .filter(subquery.c.restaurant_id == restaurant.restaurant_id) \
                                    .scalar()

            avg_evaluation_rounded = round(float(avg_evaluation), 2) if avg_evaluation else None

            category_results.append({
                "restaurant_id": restaurant.restaurant_id,
                "restaurant_name": restaurant.restaurant_name,
                "genre": restaurant.genre,
                "average_charge": restaurant.average_charge,
                "restaurant_address": restaurant.restaurant_address,
                "restaurant_url": restaurant.restaurant_url,
                "restaurant_image": restaurant.restaurant_image,
                "regular_holiday": restaurant.regular_holiday,
                "restaurant_public_evaluation": restaurant.restaurant_public_evaluation,
                "average_evaluation": avg_evaluation_rounded
            })

        results[category] = category_results

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/attendance", methods=['POST'])
@jwt_required()
def register_attendance():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        event_id = data['event_id']
        attendance = data['attendance']

        participant = Participant_information.query.filter_by(event_id=event_id, user_id=current_user_id).first()
        if participant:
            participant.attendance = attendance
        else:
            new_participant = Participant_information(
                uuid=str(uuid.uuid4()),  # UUIDを文字列に変換して設定
                event_id=event_id,
                user_id=current_user_id,
                attendance=1 if attendance == 'attend' else 0,  # 出席なら1、欠席なら0を設定
                last_update=datetime.now()
            )
            db.session.add(new_participant)

        db.session.commit()
        return jsonify({"message": "Attendance information registered successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error registering attendance: {str(e)}")
        return jsonify({"message": "Internal Server Error"}), 500

@app.route("/attendance_list", methods=['GET'])
def get_attendance_list():
    try:
        event_id = request.args.get('event_id')  # イベントIDをクエリパラメータから取得

        # イベントIDに紐づく出席者情報をデータベースから取得
        attendees = Participant_information.query.filter_by(event_id=event_id).all()

        # 出席者情報をリストに整形
        attendance_list = []
        for attendee in attendees:
            user = User.query.filter_by(user_id=attendee.user_id).first()
            if user:
                attendee_info = {
                    "user_id": user.user_id,
                    "user_name": user.user_name,
                    "company": user.company,
                    "attendance": attendee.attendance,  # attendance情報を含める
                    # 他のユーザー情報も必要に応じて追加
                }
                attendance_list.append(attendee_info)

        # JSON形式で出席者リストを返す
        return jsonify(attendance_list), 200

    except Exception as e:
        app.logger.error(f"Error fetching attendance list: {str(e)}")
        return jsonify({"message": "Internal Server Error"}), 500