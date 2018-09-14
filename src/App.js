import React, { Component } from 'react';
import Welcome from './Welcome'

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

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
  }
});

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: true,
      mode: ""
    }

    this.renderWelcome = this.renderWelcome.bind(this)
    this.handleChoice = this.handleChoice.bind(this)
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


  render() {
    const {classes} = this.props
    const {mode} = this.state
    return (
      <Grid className={classes.root}>
        {this.renderWelcome()}
        {mode !== "" ? (
          <div style={styles.tableContainer} align="center">
            <Tabuleiro/>
          </div>
        ): null}
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
