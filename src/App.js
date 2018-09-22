import React, { Component } from 'react';
import Welcome from './Welcome'

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

import Tabuleiro from './Tabuleiro'

import Background from './assets/wood-pattern.png';
import Chip from './assets/chip.png'
import Users from './assets/users.png'


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  iconsContainer: {
    marginTop: 20
  },
  iconContainer: {
    marginTop: 20,
    marginBottom: 30,
    "&:hover": {
      backgroundColor: "#d8d8d8",
    }
  },
  icons: {
    height: 150,
    width: 150,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  root: {
    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Background})`,
    backgroundSize: "cover",
    height: "100vh"
  },
  turnContainer: {
    backgroundColor : "#eaeaea"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  displayTypography: {
    color: "#000000"
  }
})

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: true,
      mode: "IA",
      turn: "P",
      p1Points: 2,
      p2Points: 2
    }

    this.renderWelcome = this.renderWelcome.bind(this)
    this.handleChoice = this.handleChoice.bind(this)
    this.changePlayer = this.changePlayer.bind(this)
    this.renderPlayer = this.renderPlayer.bind(this)
    this.renderPaper = this.renderPaper.bind(this)
  }

  handleChoice(choice){
    this.setState({
      mode: choice,
      open: false
    })
  }

  renderWelcome(){
    const {classes} = this.props
    return (
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div style={{top: "50%",left: "50%", transform: `translate(-50%, -50%)`,}} className={classes.paper}>
            <Typography align="center" variant="title" >
              Welcome to Reversi! 
            </Typography>
            <Typography style={{marginTop: 20}} variant="subheading" align="center">
              What mode do you wanna play?
            </Typography>
            <Grid container onClick={() => this.handleChoice("IA")} className={classes.iconsContainer}>
              <Grid item className={classes.iconContainer} md={6}>
                <img className={classes.icons} justify="center" src={Chip}></img>
                <Typography variant="subheading" align="center">
                  Human vs. AI
                </Typography>
              </Grid>
              <Grid item onClick={() => this.handleChoice("Human")} className={classes.iconContainer} md={6}>
                <img className={classes.icons} justify="center" src={Users}></img>
                <Typography variant="subheading" align="center">
                  Human vs. Human
                </Typography>
              </Grid>
            </Grid>
          </div>
      </Modal>
    )
  }

  renderPlayer(){
    const {turn} = this.state
    if (turn === "P"){
      return "Preto"
    } else if (turn === "B"){
      return "Branco"
    } else {
      return ""
    }
    
  }

  changePlayer(turn, quantidadeCasasConquistadas){
    let p1Points = this.state.p1Points
    let p2Points = this.state.p2Points
    console.log(quantidadeCasasConquistadas)
    if (turn === "B"){
      p1Points += quantidadeCasasConquistadas + 1
      p2Points -= quantidadeCasasConquistadas
    } else if (turn === "P") {
      p1Points -= quantidadeCasasConquistadas
      p2Points += quantidadeCasasConquistadas + 1
    }
    this.setState({turn,p1Points,p2Points})
  }

  renderPaper(player){
    const {classes} = this.props
    const {p1Points, p2Points} = this.state
    let playerName, points
    if (player === "P"){
      playerName = "Preto"
      points = p1Points
    } else if (player === "B") {
      playerName = "Branco"
      points = p2Points
    }
    return (
      <Paper className={classes.paper} elevation={1}>
        <Typography variant="headline" align="center" className={classes.displayTypography} gutterBottom>
          Pontuação do jogador {playerName}:
        </Typography>
        <Typography variant="display1" align="center" className={classes.displayTypography} gutterBottom>
          {points}
        </Typography>
      </Paper>
    )
  }


  render() {
    const {classes} = this.props
    const {mode} = this.state

    return (
      <Grid className={classes.root}>
        {/* {this.renderWelcome()} */}
        {mode !== "" ? (
          <div>
            <div align="center" className={classes.turnContainer}>
              <Typography variant="display2" align="center" className={classes.displayTypography}>
                Vez do jogador: {this.renderPlayer()}
              </Typography>
            </div>
            <Grid container alignItems="center" justify="space-around" direction="row">
              <Grid item md={3}>
                {this.renderPaper("P")}
              </Grid>
              <Grid item md={6}>
                <div style={styles.tableContainer} align="center">
                  <Tabuleiro changePlayer={this.changePlayer}/>
                </div>
              </Grid>
              <Grid item md={3}>
                {this.renderPaper("B")}
              </Grid>
            </Grid>
          </div>
        ): null}
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
