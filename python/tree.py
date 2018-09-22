from noh import Noh
from inteligence import *
import copy

class Tree:
    raiz = None
    nivel = 0

    def __init__(self, matrizGame, cor):
        self.raiz = Noh(copy.deepcopy(matrizGame), cor)
        print("-----------------------------")
        print("Nivel da arvore: ", self.nivel)
        print("-----------------------------")
        print(self.raiz)
        self.mountTree()
        print(self.imprimeArvore(self.raiz))

    def mountTree(self, nivel = 0):
        for chave in (self.raiz.dicPossiveisJogadas):
            # pega posicoes de peças inimigas que se transformarao em suas
            listPecasInimigas = self.raiz.dicPossiveisJogadas[chave]

            # pega matriz resultante apos uma jogada
            matrizResultante = getMatrizJogadaRealizada(copy.deepcopy(self.raiz.matrizGame), listPecasInimigas,self.raiz.cor)

            # Cria uma possivel jogada e passa a vez ao adversario (notCor)
            # pegando matriz resultante da sua jogada, cria um noh para jogada seguinte
            self.raiz.nohFilhos.append(Noh(matrizResultante, notCor(self.raiz.cor), self.raiz))

        self.nivel = nivel

    def __str__(self):
        return self.imprimeArvore(self.raiz)

    def imprimeArvore(self, nohAtual):
        saida = ""
        if len(nohAtual.nohFilhos) == 0:
            return nohAtual.getPrint()
        for elemento in nohAtual.nohFilhos:
            saida += self.imprimeArvore(elemento)
        return saida
            
