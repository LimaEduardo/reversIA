import React, { Component } from 'react'
import Casa from './Casa'

import {makeRequest, getIAPlay} from './pythonAction'
// import { Button } from '@material-ui/core/Button';

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
    this.contaPecasForcado = this.contaPecasForcado.bind(this)
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

  //Gambiarra
  contaPecasForcado(){
    return new Promise((resolve,reject) => {
      let pecaPreta = 0
      let pecaBranca = 0
      const {tabuleiro} = this.state
      for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
          if (tabuleiro[i][j] === "P"){
            pecaPreta++
          } else if (tabuleiro[i][j] === "B"){
            pecaBranca++
          }
        }
      }
      resolve([pecaPreta,pecaBranca])
    })
  }

  nextTurn(updatedTable, line, column, quantidadeCasasConquistadas){
    const {changePlayer} = this.props
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
        changePlayer("B", quantidadeCasasConquistadas)
        resolve(["B",limpaTabuleiro])
      } else {
        changePlayer("P", quantidadeCasasConquistadas)
        resolve(["P", limpaTabuleiro])
      }
    })
  }

  getPossibilities(){
    makeRequest(this.state.tabuleiro, this.state.turn).then((possibilidades) => {
      let novoTabuleiro = this.state.tabuleiro
      console.log("--- possibilidades inicio ---")
      for(var key in possibilidades){
        let xy = key.split(" ");
        console.log(xy)
        novoTabuleiro[xy[0]][xy[1]] = "J"
      }
      console.log("--- possibilidades fim ---")
      this.setState({tabuleiro : novoTabuleiro, possibilidades})
    })
  }

  handleClick(line,column){
    console.log("OK")
    const {possibilidades, turn} = this.state
    const {changePlayerForcado} = this.props
    let updatedTable = this.state.tabuleiro
    let chave = ""+line+" "+column
    let casasConquistadas = possibilidades[chave]
    let quantidadeCasasConquistadas = casasConquistadas.length
    for (var indice in casasConquistadas){
      updatedTable[casasConquistadas[indice][0]][casasConquistadas[indice][1]] = turn
    }
    if (updatedTable[line][column] === turn){
      updatedTable[line][column] = turn
      this.nextTurn(updatedTable, line, column, quantidadeCasasConquistadas).then((nextTurn) => {
        this.setState({
          tabuleiro: nextTurn[1],
          turn: nextTurn[0],
          possibilidades: undefined
        }, () => {
          getIAPlay(this.state.tabuleiro, this.state.turn).then((jogadaIA) => {
            this.setState({
              tabuleiro: jogadaIA,
              possibilidades: undefined  
            }, () => {
              this.contaPecasForcado().then((pecas) => {
                console.log(pecas)
                if (turn === "B"){
                  this.setState({turn: "B"})
                  changePlayerForcado("B", pecas)
                } else {
                  this.setState({turn: "P"})
                  changePlayerForcado("P", pecas)
                }
              })
              this.getPossibilities()
            })
          })
        })
      }, (error) => {
        console.log(error)
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
        <button onClick={() => {}}>Click Clicky</button>
      </div>
    )
  }
}

export default Tabuleiro
