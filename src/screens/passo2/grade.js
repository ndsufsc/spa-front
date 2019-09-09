import React from 'react';

//ESTILO
import './grade.css';

//COMPONENTES MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

//COMPONENTES
import Header from '../../components/header';

//ROTEAMENTO
import { Link } from 'react-router-dom'

const drawerWidth = "25%";

const styles = theme => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
})

class Grade extends React.Component {
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header position="fixed" className={classes.appBar} />
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="right"
        >
        </Drawer>
      </div>
    );
  }
}

Grade.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grade);
