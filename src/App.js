import React, { Component } from 'react';
import Welcome from './Welcome'
import Grid from '@material-ui/core/Grid';

import Background from './wood-pattern.png';
import Tabuleiro from './Tabuleiro'


const styles = {
  root: {
    // background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Background})`,
    // height: "100%",
    // width: "100%" ,
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover"
  },
  title: {
    justify: "center",
    color: "yellow"
  },
  tableContainer: {
    height:"100%"
  }
}

class App extends Component {
  render() {
    return (
      <Grid style={styles.root}>
        <Welcome/>
        <div style={styles.tableContainer} align="center">
          <Tabuleiro/>
        </div>
      </Grid>
    );
  }
}

export default App;
