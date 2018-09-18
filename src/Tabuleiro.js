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
      turn: "P"
    }

    this.handleClick = this.handleClick.bind(this)
    this.nextTurn = this.nextTurn.bind(this)
    this.sendInfo = this.sendInfo.bind(this)
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
    })
  }

  nextTurn(){
    return new Promise((resolve,reject) => {
      let currentTurn = this.state.turn
      if (currentTurn == "P"){
        resolve("B")
      }
      resolve("P")
    })
  }

  sendInfo(){
    makeRequest(this.state.tabuleiro)
  }

  handleClick(line,column){
    let updatedTable = this.state.tabuleiro
    if (updatedTable[line][column] === ""){
      updatedTable[line][column] = this.state.turn
      this.nextTurn().then((nextTurn) => {
        this.setState({
          tabuleiro: updatedTable,
          turn: nextTurn
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
        <button onClick={() => this.sendInfo()}>Clicky Clicky</button>
      </div>
    )
  }
}

export default Tabuleiro
