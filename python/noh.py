from inteligence import *
import copy

def ehRaiz(noh):
    if noh.nohPai == None:
        return False
    else:
        return True

class Noh:
    
    def __init__(self, matrizGame, cor, nohPai = None):
        self.matrizGame = copy.deepcopy(matrizGame)
        self.nohPai = nohPai
        self.cor = cor
        self.nohFilhos = []
        self.dicPossiveisJogadas = {}

        # Pega o dicionario de jogadas possiveis 
        self.dicPossiveisJogadas = getDicionarioDePossibilidades(copy.deepcopy(self.matrizGame), self.cor)

    def __str__(self):
        return getPrint()

    def getPrint(self):
        saida = "\n   "
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
        saida += "\n"
        saida += "Filhos: " + str(self.nohFilhos)
        saida += "\nPai: " + str(ehRaiz(self))
        return saida
    
