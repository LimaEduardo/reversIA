from inteligence import *
import copy

def ehRaiz(noh):
    if noh.nohPai == None:
        return False
    else:
        return True

class Noh:
    dicPossiveisJogadas = {}

    def __init__(self, matrizGame, cor, nivel, nohPai = None, chave = 'raiz', alfaBeta = 0):
        self.matrizGame = copy.deepcopy(matrizGame)
        self.nohPai = nohPai
        self.cor = cor
        self.nohFilhos = []
        self.nivel = nivel
        self.chave = chave
        self.alfaBeta = alfaBeta

        # Pega o dicionario de jogadas possiveis 
        self.dicPossiveisJogadas = getDicionarioDePossibilidades(copy.deepcopy(matrizGame), self.cor)
        # print(matrizGame, self.cor)
        # print("CHHAVE: ",  self.chave)
        # print(self.dicPossiveisJogadas)

    def __str__(self):
        print(self.matrizGame)
        return self.getPrint()

    def getPrint(self):
        saida = "\n " + self.cor + " " 
        for col in range(len(self.matrizGame[0])):
            saida += " " + str(col) + " "
        saida += "\n"
        for indice, linha in enumerate(self.matrizGame):
            saida += " " +str(indice)+ " "
            for valor in linha:
                if valor == '':
                    saida += " ° "
                else:
                    saida += " " + valor + " "
            saida += "\n"
        #saida += "\n"
        for chave in self.dicPossiveisJogadas:
            saida += " \'"+ chave + "\' "
        #saida += "\n"
        saida += "\n Ultima jogada: " + self.chave
        saida += " | Peças ganhas: " + str(self.alfaBeta)
        saida += " | Nivel na arvore: "+ str(self.nivel)
        saida += "\nFilhos: " + str(self.nohFilhos)
        # saida += "\nPai: " + str(ehRaiz(self))
        saida += "\n"
        return saida
    
