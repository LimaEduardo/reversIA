from noh import Noh
from inteligence import *
import copy

class Tree:
    def __init__(self, matrizGame, cor, nivel):
        self.raiz = Noh(copy.deepcopy(matrizGame), cor, 0)
        self.nivelMax = nivel
        self.filhos = {}
        for i in range(self.nivelMax):
            self.filhos[i+1] = []
        self.mountTree(self.raiz, 0)

        chaveMelhorJogada = self.encontraMelhorJogada()
        if chaveMelhorJogada == "-1 -1":   # '-1 -1' parametro de fim de game
            self.pecasAVirarJogadaAtual = []
        else:
            # self.raiz.dicPossiveisJogadas[chaveMelhorJogada] -> me retorna uma LISTA
            self.pecasAVirarJogadaAtual = self.raiz.dicPossiveisJogadas[chaveMelhorJogada]

    def mountTree(self, noh, nivel):
        # nivelMax == 0: somente a Raiz | nivelMax < 0: Não porcessamos tambem!
        if self.nivelMax <= 0:
            return
        
        if nivel == self.nivelMax:
            return

        if len(noh.dicPossiveisJogadas) == 0:
            return

        if noh.cor == self.raiz.cor:
            alfaB = 1
        else:
            alfaB = -1
            
        for chave in noh.dicPossiveisJogadas:
            # pega posicoes de peças inimigas que se transformarao em suas
            listPecasInimigas = noh.dicPossiveisJogadas[chave]
            # pega matriz resultante apos uma jogada na chave referente
            matrizResultante = getMatrizJogadaRealizada(noh.matrizGame, listPecasInimigas, noh.cor)
            # Cria uma possivel jogada e passa a vez ao adversario (notCor)
            # matrizReultante | Cor do proximo | nivel que esta na arvore | nohPai | Chave: jogada que gerou o noh | quantidade de peças adquiridas
            
            filho = Noh(matrizResultante, notCor(noh.cor), (noh.nivel + 1), noh, chave, noh.alfaBeta + (alfaB * len(listPecasInimigas)) )
            noh.nohFilhos.append(filho)
            self.filhos[noh.nivel + 1].append(filho)


        for nohF in noh.nohFilhos:
            self.mountTree(nohF, nivel + 1)
        


    def __str__(self):
        saida = self.imprimeArvore(self.raiz)
        return saida

    def imprimeArvore(self, nohAtual):
        saida = ''
        if len(nohAtual.nohFilhos) == 0:
            return nohAtual.getPrint()
        saida += nohAtual.getPrint()
        for elemento in nohAtual.nohFilhos:
            saida += self.imprimeArvore(elemento)
        return saida
            
    def encontraNivelParaJogada(self):
        nv = self.nivelMax
        while nv > 0:
            if len(self.filhos[nv]) > 0:
                return nv
            nv -= 1
        return 0

    def encontraMelhorJogada(self):

        nivel = self.encontraNivelParaJogada()
        if nivel == 0:
            return "-1 -1"

        nohMaiorSaldo = self.filhos[nivel][0]

        for noh in self.filhos[nivel]:
            if noh.alfaBeta > nohMaiorSaldo.alfaBeta:
                nohMaiorSaldo = noh
        # print(nohMaiorSaldo.alfaBeta)
        while(nohMaiorSaldo.nivel > 1):
            nohMaiorSaldo = nohMaiorSaldo.nohPai

        return nohMaiorSaldo.chave