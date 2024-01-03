from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///C:\Users\zip-b\Tech0 step3-2\SQlite_DB\Cheers_DB.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'  # ここでテーブル名を指定
    user_id = db.Column(db.Integer, primary_key=True)
    mail_address = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

#@app.route('/users')
#def list_users():
#    users = User.query.all()
#    return render_template('users.html', users=users)

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

if __name__ == "__main__":
    app.run(debug=True)
