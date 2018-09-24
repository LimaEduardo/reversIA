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
        # print(self.filhos[2][1], self.filhos[2][1].dicPossiveisJogadas)
        print(self)
        

    def mountTree(self, noh, nivel):
        # nivelMax == 0: somente a Raiz | nivelMAX < 0: Não porcessamos tambem!
        if self.nivelMax <= 0:
            return
        
        if nivel == self.nivelMax:
            return


        for chave in noh.dicPossiveisJogadas:
            # pega posicoes de peças inimigas que se transformarao em suas
            listPecasInimigas = noh.dicPossiveisJogadas[chave]
            # pega matriz resultante apos uma jogada na chave referente
            matrizResultante = getMatrizJogadaRealizada(copy.deepcopy(noh.matrizGame), listPecasInimigas, noh.cor)
            # Cria uma possivel jogada e passa a vez ao adversario (notCor)
            # matrizReultante | Cor do proximo | nivel que esta na arvore | nohPai | Chave: jogada que gerou o noh | quantidade de peças adquiridas
            filho = Noh(matrizResultante, notCor(noh.cor), (noh.nivel + 1), noh, chave, len(listPecasInimigas))
            noh.nohFilhos.append(filho)
            self.filhos[noh.nivel + 1].append(filho)
            #print(noh.nohFilhos)

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
            
