import json
from flask import Flask, request
from inteligence import getDicionarioDePossibilidades
app = Flask(__name__)

@app.route('/', methods=['POST'])
def hello_world():
    tabela = request.json['table']
    cor = request.json['color']
    possibilidades = json.dumps(getDicionarioDePossibilidades(tabela,cor))
    print(possibilidades)
    response = app.response_class(
        response=possibilidades,
        status=200,
        mimetype='application/json'
    )
    return response