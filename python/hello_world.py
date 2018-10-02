from inteligence import *
from tree import Tree
from noh import Noh

def main():
    matTable = []
    matTable.append(['', '', '', '', '', '', '', ''])
    matTable.append(['', '', '', '', '', '', '', ''])
    matTable.append(['', '', '', '', '', '', '', ''])
    matTable.append(['', '', '', 'B', 'P', '', '', ''])
    matTable.append(['', '', '', 'P', 'B', '', '', ''])
    matTable.append(['', '', '', '', '', '', '', ''])
    matTable.append(['', '', '', '', '', '', '', ''])
    matTable.append(['', '', '', '', '', '', '', ''])


    # matTable.append(["", "", "B", "P", "J", "", "", ""])
    # matTable.append(["", "", "B", "P", "", "", "", ""])
    # matTable.append(["", "", "B", "P", "J", "", "", ""])
    # matTable.append(["", "", "", "B", "P", "", "", ""])
    # matTable.append(["", "", "", "P", "B", "", "", ""])
    # matTable.append(["", "", "", "", "", "", "", ""])
    # matTable.append(["", "", "", "", "", "", "", ""])
    # matTable.append(["", "", "", "", "", "", "", ""])

    
    cor = 'P'
    print(getDicionarioDePossibilidades(matTable, cor))

    print(Noh(matTable, cor, 0))
    
    i = 0
    print(i)    
    myTree = Tree(matTable, cor, 3)
    pecasMelhorJogada =  myTree.pecasAVirarJogadaAtual

    while i != 60 and len(pecasMelhorJogada) > 0 :      
        matTable = getMatrizJogadaRealizada(matTable, pecasMelhorJogada, cor)
        print(Noh(matTable, cor))           
        cor = notCor(cor)

        i += 1
        print(i)    
        myTree = Tree(matTable, cor, 3)
        pecasMelhorJogada =  myTree.pecasAVirarJogadaAtual

    if len(pecasMelhorJogada) == 0:
        print("END GAME")
    else:
        print("aqui deu caca; lin 31 | Hello world")
main()