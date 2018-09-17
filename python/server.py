from flask import Flask
from hello_world import main
app = Flask(__name__)

@app.route('/')
def hello_world():
    return main()