import copy

def notCor(cor):
    if cor == 'P':
        return 'B'
    else:
        return 'P'

def getMatrizJogadaRealizada(mat, listPecasAVirar, cor):
    matriz = mat.copy()
    for chave in listPecasAVirar:
        x = chave[0]
        y = chave[1]
        matriz[x][y] = cor
    return matriz

def getDicionarioDePossibilidades(matriz, cor):
    mat = copy.deepcopy(matriz)
    dicPossiveisPos = {}
    for indiceLinha, lista in enumerate(matriz):
        for indiceColuna, valor in enumerate(lista):
            if valor == cor:
                possiveisPos = procuraPossiveisPos(mat, indiceLinha, indiceColuna)
                for chave in possiveisPos:
                    if chave in dicPossiveisPos:
                        dicPossiveisPos[chave] += possiveisPos[chave]
                    else:
                        dicPossiveisPos[chave] = possiveisPos[chave]

    return dicPossiveisPos

''' Possiveis direçoes a percorrer a partir de um elemento
    [ -1 , -1 ] [ -1 , 0 ] [ -1 , 1 ]
    [  0 , -1 ] [Elemento] [  0 , 1 ]
    [  1 , -1 ] [  1 , 0 ] [  1 , 1 ]
'''

def procuraPossiveisPos(matriz, linha, coluna):
    mat = copy.deepcopy(matriz)
    direcoes = [[-1, -1], [-1 , 0], [-1 , 1], [0 , -1], [0, 1], [1 ,-1], [1, 0], [1, 1]]
    possiveisPos = {}
    for direcao in direcoes:
        acrescimoX = direcao[0]
        acrescimoY = direcao[1]
        listaOponente = percorreVetor(mat, linha, coluna, acrescimoX, acrescimoY)
        quantOponentes = len(listaOponente)
        
        if quantOponentes != 0:            
            xChave = linha + ((quantOponentes + 1) * acrescimoX)
            yChave = coluna + ((quantOponentes + 1) * acrescimoY)
            listaOponente.append([xChave, yChave])
            possiveisPos[str(xChave) + " " +str(yChave)] = listaOponente
    return possiveisPos


def percorreVetor(matriz, lin, col, acrescimoX, acrescimoY):
    mat = copy.deepcopy(matriz)
    corMinha = mat[lin][col]
    corOponente = notCor(corMinha)

    # Comeca pelo elemento a seguir do seu
    linAtual = lin + acrescimoX 
    colAtual = col + acrescimoY
    if linAtual >= len(mat) or linAtual < 0 or colAtual >= len(mat[0]) or colAtual < 0:
        return []
    corPosAtual = mat[linAtual][colAtual]

    posOponentes = []
    while(corPosAtual != '' and corPosAtual != corMinha):
        posOponentes.append([linAtual,colAtual])

        linAtual += acrescimoX
        colAtual += acrescimoY 
        if not (linAtual < len(mat) and colAtual < len(mat[0])):
            return []
        corPosAtual = mat[linAtual][colAtual]

    if corPosAtual != '':
        posOponentes = []

    return posOponentes