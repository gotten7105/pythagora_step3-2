from flask import Flask
app = Flask(__name__)


@app.route("/store")
def get_stores():
    return {"stores" : stores}


stores = [
    {
    "name" : "store1",
    "items" : [
        {
            "name" : "chair",
            "price" : 15.99
            },
        ]
    }
    ]