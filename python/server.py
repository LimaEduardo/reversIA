from flask import Flask, request
from hello_world import main
app = Flask(__name__)


@app.route('/', methods=['POST'])
def hello_world():
    tabela = request.json['table']
    return main()