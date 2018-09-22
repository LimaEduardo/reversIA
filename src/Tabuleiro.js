import React, { Component } from 'react'
import Casa from './Casa'

import makeRequest from './pythonAction'

const styles = {
    root: {
        marginTop: 20,
        background: '#00af13',
        width: 480,
        height: 490,
        display: 'flex',
        flexWrap: "wrap",
        border: '7px solid black',
    },
    casa: {
      display: "inline-block",
      flexGrow: 1,
      width: 60,
    }
}

export class Tabuleiro extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabuleiro: undefined,
      pronto: false,
      turn: "P",
      possibilidades: undefined
    }

    this.handleClick = this.handleClick.bind(this)
    this.nextTurn = this.nextTurn.bind(this)
    this.getPossibilities = this.getPossibilities.bind(this)
  }

  componentDidMount(){
    let novoTabuleiro = []
    for(var i = 0; i < 8; i++ ){
      novoTabuleiro[i] = []
      for(var j = 0; j < 8; j++ ){
        novoTabuleiro[i][j] = "";
      }
    }
    novoTabuleiro[3][3] = "B"
    novoTabuleiro[3][4] = "P"
    novoTabuleiro[4][3] = "P"
    novoTabuleiro[4][4] = "B"
    this.setState({
      tabuleiro: novoTabuleiro,
      pronto: true
    }, () => {
      this.getPossibilities()
    })
  }

  nextTurn(updatedTable, line, column){
    return new Promise((resolve,reject) => {
      const {turn, possibilidades} = this.state
      const limpaTabuleiro = updatedTable
      const chaveParaNaoDeletar = ""+line+" "+column // Chave que não é para ser apagada
      for(var key in possibilidades){
        if (key === chaveParaNaoDeletar){
          continue
        }
        let xy = key.split(" ");
        limpaTabuleiro[xy[0]][xy[1]] = ""
      }
      if (turn === "P"){
        resolve(["B",limpaTabuleiro])
      }
      resolve(["P", limpaTabuleiro])
    })
  }

  getPossibilities(){
    makeRequest(this.state.tabuleiro, this.state.turn).then((possibilidades) => {
      let novoTabuleiro = this.state.tabuleiro
      for(var key in possibilidades){
        let xy = key.split(" ");
        novoTabuleiro[xy[0]][xy[1]] = "J"
      }
      this.setState({tabuleiro : novoTabuleiro, possibilidades})
    })
  }

  handleClick(line,column){
    const {possibilidades, turn} = this.state
    let updatedTable = this.state.tabuleiro
    let chave = ""+line+" "+column
    console.log(possibilidades)
    console.log(possibilidades[chave])
    console.log(possibilidades[chave][0])
    let casasConquistadas = possibilidades[chave]
    
    for (var indice in casasConquistadas){
      updatedTable[casasConquistadas[indice][0]][casasConquistadas[indice][1]] = turn
    }

    if (updatedTable[line][column] === "J"){
      updatedTable[line][column] = turn
      this.nextTurn(updatedTable, line, column).then((nextTurn) => {
        console.log(nextTurn[1])
        this.setState({
          tabuleiro: nextTurn[1],
          turn: nextTurn[0],
          possibilidades: undefined
        }, () => {
          this.getPossibilities()
        })
      })
    }
  }

  render() {
    const {tabuleiro, pronto} = this.state
    return (
      <div style={styles.root}>
        {pronto ? (
          tabuleiro.map((linha, indiceLinha) => (
            linha.map((coluna, indiceColuna) => (
              <div style={styles.casa} key={""+indiceLinha+indiceColuna}>
                <Casa line={indiceLinha} column={indiceColuna} value={tabuleiro[indiceLinha][indiceColuna]} handleClickFunction={this.handleClick}/>
              </div>
            ))
          )
        )) : null}
        <button onClick={() => this.getPossibilities()}>Clicky Clicky</button>
      </div>
    )
  }
}

export default Tabuleiro
