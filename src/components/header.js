import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logoUFSC from '../assets/img/logoufsc.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logoUFSC: {
      height: 50,
      paddingRight: 20,
    }
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={logoUFSC} alt="UFSC" className={classes.logoUFSC} />	
          <Typography variant="h6" className={classes.title}>
            Sistema de Planegamento Acadêmico
          </Typography>
          <Button color="inherit">Sair</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}