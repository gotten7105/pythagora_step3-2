from flask import Flask
from flask import render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from datetime import datetime
import pytz
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required ,current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cheers.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(24)
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(pytz.timezone('Asia/Tokyo')))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))   # 外部キーとして追加

class User(UserMixin, db.Model):
    __tablename__ = 'users'  # ここでテーブル名を指定
    user_id = db.Column(db.Integer, primary_key=True)
    mail_address = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    user_name = db.Column(db.String(80), nullable=True)
    company = db.Column(db.String(80), nullable=True)
    user_class = db.Column(db.String(80), nullable=True)
    working_area = db.Column(db.String(80), nullable=True)
    user_category1 = db.Column(db.String(80), nullable=True)
    user_category2 = db.Column(db.String(80), nullable=True)
    user_category3 = db.Column(db.String(80), nullable=True)
    def get_id(self):
        return str(self.user_id)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/', methods = ['GET','POST'])
@login_required
def index():
    if request.method == 'GET':
        posts = Post.query.all()
    return render_template('index.html', posts = posts)

@app.route('/signup', methods=['GET','POST'])
def signup():
    mail_address = request.json.get('mail_address')
    password = request.json.get('password')

    if not mail_address or not password:
        return jsonify({"error": "メールアドレスまたはパスワードが空です"}), 400

    existing_mail_address = User.query.filter_by(mail_address=mail_address).first()
    if existing_mail_address:
        return jsonify({"error": "このメールアドレスは既に使用されています"}), 400

    new_user = User(mail_address=mail_address, password=generate_password_hash(password, method='pbkdf2:sha256'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "ユーザー登録が完了しました。"}), 200

@app.route('/login', methods = ['GET', 'POST'])
def login():
    mail_address = request.json.get('mail_address')
    password = request.json.get('password')

    user = User.query.filter_by(mail_address=mail_address).first()
    
    if user is None or not check_password_hash(user.password, password):
        return jsonify({"error": "ユーザー名またはパスワードが一致しません"}), 401
    
    login_user(user)
    return jsonify({"message": "ログイン成功", "user_id": user.user_id}), 200

    
@app.route('/mypage')
@login_required
def mypage():
    posts = Post.query.filter_by(user_id=current_user.id).all()
    return render_template('mypage.html', posts=posts)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/login')

@app.route('/delete_user/<int:user_id>', methods=['GET'])
@login_required
def delete_user(user_id):
    # ログインしているユーザーが自分自身のアカウントのみ削除できるようにする
    if current_user.id != user_id:
        return "権限がありません", 403

    user_to_delete = User.query.get(user_id)
    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
        logout_user()
        return redirect('/login')
    else:
        return "ユーザーが見つかりません", 404

@app.route('/create', methods=['GET', 'POST'])
@login_required
def create():
    if request.method == 'POST':
        title = request.form.get('title')
        body = request.form.get('body')

        post = Post(title=title, body=body, user_id=current_user.id)  # ユーザーIDを割り当てる
        
        db.session.add(post)
        db.session.commit()
        return redirect('/mypage')
    else:
        return render_template('create.html')

    
@app.route('/<int:id>/update', methods = ['GET','POST'])
@login_required
def update(id):
    post = Post.query.get(id)
    if request.method == 'GET':
        return render_template('update.html', post=post)
    else:
        post.title = request.form.get('title')
        post.body = request.form.get('body')

        db.session.commit()
        return redirect('/')
    
@app.route('/<int:id>/delete', methods = ['GET'])
@login_required
def delete(id):
    post = Post.query.get(id)
    
    db.session.delete(post)
    db.session.commit()
    return redirect('/')