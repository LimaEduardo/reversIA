from inteligence import *

def main():
    matTable = [['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', 'P', 'B', 'P', '', '', ''], ['', '', '', 'P', 'B', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '']]
    matTable = getDicionarioDePossibilidades(matTable, 'B')

    print(matTable)

main()