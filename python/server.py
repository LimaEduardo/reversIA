from flask import Flask, request
app = Flask(__name__)


@app.route('/', methods=['POST'])
def hello_world():
    tabela = request.json['table']
    print(tabela)
    return []