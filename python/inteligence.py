def getMatrizJogada(matriz, listPos, cor):
    for chave in listPos:
        x,y = map(int, chave.split(" "))
        matriz[x][y] = cor
    return matriz

def getDicionarioDePossibilidades(matriz, cor):
    dicPossiveisPos = {}
    for indiceLinha, lista in enumerate(matriz):
        for indiceColuna,valor in enumerate(lista):
            if valor == cor:
                possiveisPos = procuraPossiveisPos(matriz, indiceLinha, indiceColuna)
                for chave in possiveisPos:
                    if chave in dicPossiveisPos:
                        dicPossiveisPos[chave] += possiveisPos[chave]
                    else:
                        dicPossiveisPos[chave] = possiveisPos[chave]

    return dicPossiveisPos


''' Possiveis direçoes a percorrer a partir de um elemento
    [ -1 , -1 ] [ -1 , 0 ] [ -1 , 1 ]
    [  0 , -1 ] [Elemento] [  0 , 1 ]
    [ -1 ,  1 ] [  1 , 0 ] [  1 , 1 ]
'''

def procuraPossiveisPos(mat, linha, coluna):
    direcoes = [[-1, -1], [-1 , 0], [-1 , 1], [0 , -1], [0, 1], [-1 ,1], [1, 0], [1, 1]]
    possiveisPos = {}
    for direcao in direcoes:
        acrescimoX = direcao[0]
        acrescimoY = direcao[1]
        listaOponente = percorreVetor(mat, linha, coluna, acrescimoX, acrescimoY)
        quantOponentes = len(listaOponente)
        
        if quantOponentes != 0:            
            xChave = linha + ((quantOponentes + 1) * acrescimoX)
            yChave = coluna + ((quantOponentes + 1) * acrescimoY)
            possiveisPos[str(xChave) + " " +str(yChave)] = listaOponente
    return possiveisPos


def percorreVetor(mat, lin, col, acrescimoX, acrescimoY):
    corMinha = mat[lin][col]
    corOponente = "P" if corMinha == "B" else "B"

    # Comeca pelo elemento a seguir do seu
    linAtual = lin + acrescimoX 
    colAtual = col + acrescimoY
    if not (linAtual < len(mat) and colAtual < len(mat[0])):
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