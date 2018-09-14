import React, { Component } from 'react'

const styles = {
    root: {
        border: '1px solid black',
        width: 40,
        height: 40
    }
}

export class Casa extends Component {
  constructor(props){
    super(props)
    this.renderPiece = this.renderPiece.bind(this)
    this.defineColor = this.defineColor.bind(this)
  }

  defineColor(){
    const {value} = this.props
    var color
    if(value !== ""){
      if(value === "P"){
        color = "black"
      } else {
        color = "white"
      }
    } else {
      color = ""
    }
    return color
  }

  renderPiece(){
    let color = this.defineColor()
    if (color){
      let pieceStyle = {
        width: 40,
        height: 40,
        backgroundColor: color,
        borderRadius: "50%"
      }
      return (
        <div style={pieceStyle}/>
      )
    }
    return null
  }

  render() {
    const {handleClickFunction, line, column} = this.props
    return (
      <div onClick={() => {handleClickFunction(line,column)}} style={styles.root}>
       {this.renderPiece()}
      </div>
    )
  }
}

export default Casa
