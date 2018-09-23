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
        self.mountTree(self.raiz, 0)
        print(self)

    def mountTree(self, noh, nivel = 0):
        for chave in (noh.dicPossiveisJogadas):
            # pega posicoes de peças inimigas que se transformarao em suas
            listPecasInimigas = noh.dicPossiveisJogadas[chave]

            # pega matriz resultante apos uma jogada
            matrizResultante = getMatrizJogadaRealizada(copy.deepcopy(noh.matrizGame), listPecasInimigas,noh.cor)

            # Cria uma possivel jogada e passa a vez ao adversario (notCor)
            # pegando matriz resultante da sua jogada, cria um noh para jogada seguinte
            noh.nohFilhos.append(Noh(matrizResultante, notCor(noh.cor), noh))
            #print(noh.nohFilhos)

        self.nivel = nivel

    def __str__(self):
        saida = self.imprimeArvore(self.raiz)
        saida += self.raiz.getPrint()
        return saida

    def imprimeArvore(self, nohAtual):
        saida = ""
        if len(nohAtual.nohFilhos) == 0:
            return nohAtual.getPrint()
        for elemento in nohAtual.nohFilhos:
            saida += self.imprimeArvore(elemento)
        return saida
            
