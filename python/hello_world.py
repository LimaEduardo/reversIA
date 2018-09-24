from inteligence import *
from tree import Tree
from noh import Noh

def main():
    matTable = [['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', 'B', 'P', '', '', ''], ['', '', '', 'P', 'B', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '']]
    cor = 'P'

    i = 0
    while(i != 40):    
        myTree = Tree(matTable, cor, 3)
        matTable = getMatrizJogadaRealizada(matTable, myTree.melhorJogada, cor)
        print(Noh(matTable, cor))           
        cor = notCor(cor)

        i += 1
main()