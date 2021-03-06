import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        border: '1px solid black',
        width: 60,
        height: 60,
        "&:hover": {
          border: '1px solid white',
        }
    },
    rootAlreadyMarked: {
      border: '1px solid black',
      width: 60,
      height: 60,
  }
})

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
      } else if (value === "B") {
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
        width: 60,
        height: 60,
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
    const {classes, handleClickFunction, line, column, value} = this.props
    return (
      <div onClick={() => {if (value === "J") {handleClickFunction(line,column)}}} className={value !== "J" ? classes.rootAlreadyMarked : classes.root}>
       {this.renderPiece()}
      </div>
    )
  }
}

export default withStyles(styles)(Casa)
