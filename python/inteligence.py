def getPosClique(matriz, cor):
    dicPossiveisPos = {}
    for indiceLinha, lista in enumerate(matriz):
        for indiceColuna,valor in enumerate(lista):
            if valor == cor:
                possiveisPos = procuraPosVazias(matriz, indiceLinha, indiceColuna)
                for chave in possiveisPos:
                    if chave in dicPossiveisPos:
                        dicPossiveisPos[chave] += possiveisPos[chave]
                    else:
                        dicPossiveisPos[chave] = possiveisPos[chave]

    print(dicPossiveisPos)


''' Possiveis direçoes a percorrer a partir de um elemento
    [ -1 , -1 ] [ -1 , 0 ] [ -1 , 1 ]
    [  0 , -1 ] [Elemento] [  0 , 1 ]
    [ -1 ,  1 ] [  1 , 0 ] [  1 , 1 ]
'''

def procuraPosivelPos(mat, linha, coluna):
    direcoes = [[-1, -1], [-1 , 0], [-1 , 1], [0 , -1], [0, 1], [-1 ,1], [1, 0], [1, 1]]
    possiveisPos = {}
    for direcao in direcoes:
        acrescimoX = direcao[0]
        acrescimoY = direcao[1]
        listaOponente = percorreVetor(mat, linha, coluna, acrescimoX, acrescimoY)

        quantOponentes = len(listaOponente)
        xChave = (quantOponentes + 1) * acrescimoX
        yChave = (quantOponentes + 1) * acrescimoY
        possiveisPos[str(xChave) + " " +str(yChave)] = listaOponente
    return possiveisPos


def percorreVetor(mat, lin, col, acrescimoX, acrescimoY):
    corMinha = mat[linha][coluna]
    corOponente = "P" if minhaCor == "B" else "B"

    # Comeca pelo elemento a seguir do seu
    linAtual = lin + acrescimoX 
    colAtual = col + acrescimoY
    corPosAtual = matriz[linAtual][colAtual]

    posOponentes = []
    while(corPosAtual != '' and corPosAtual != corMinha):
        posOponentes.append([linAtual,colAtual])

        linAtual += acrescimoX
        colAtual += acrescimoY 

    if corPosAtual != '':
        posOponentes = []

    return posOponentes