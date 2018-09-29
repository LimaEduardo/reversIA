import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from inteligence import *
from tree import Tree
from noh import Noh


app = Flask(__name__, static_url_path='', static_folder='')
CORS(app, support_credentials=True)

@app.route('/get_possibilidades', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_possibilidades():
    tabela = request.json['table']
    print(tabela)
    cor = request.json['color']
    possibilidades = json.dumps(getDicionarioDePossibilidades(tabela,cor))
    response = app.response_class(
        response=possibilidades,
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/get_jogada_ia', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def get_jogada_ia():
    tabela = request.json['table']
    cor = request.json['color']
    arvore = Tree(tabela, cor, 3)
    tabela = getMatrizJogadaRealizada(tabela, arvore.melhorJogada, cor)
    response = app.response_class(
        response=tabela,
        status=200,
        mimetype='application/json'
    )
    return response

app.run(debug=True)