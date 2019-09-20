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
    },
    botaoSalvar: {
      marginRight: 10,
    },
    botaoSair: {
      marginLeft: 30,
    }
  }),
);

const headerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      fontSize: 15,
    },
    appBar: {
        zIndex: 100,
    }
  }),
);



export default function ButtonAppBar() {
  function redirecionar () {
    // localStorage.removeItem('login');
    // localStorage.removeItem('usuario');
    this.props.history.push('/')
  }
  
  const classes = useStyles();
  const header = headerStyles();
  return (
    <div className= {classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img src={logoUFSC} alt="UFSC" className={classes.logoUFSC} />	
          <Typography variant="h6" className={classes.title}>
            Sistema de Planegamento Acadêmico
          </Typography>
          <Button size="medium" color="inherit" className={classes.botaoSalvar}>Salvar</Button>
          <Button size="medium" color="inherit" className={classes.botaoSalvar}>Salvar e Ir</Button>
          <Button color="inherit" onClick={() => redirecionar()} className={classes.botaoSair}>Sair</Button>
        </Toolbar>
      </AppBar>
      {/*<div className={header.root}>
        <AppBar position="static" color="inherit" className={classes.appBar2}>
          <Toolbar>	
            <Typography variant="h6" className={header.title}>
              Coordenador: <b>Fabrício Ourique</b>
            </Typography>
            <Typography variant="h6" className={header.title}>
              Curso: <b>Engenharia de Computação</b>
            </Typography>
            <Typography variant="h6" className={header.title}>
              Semestre: <b>2019/2</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>*/}
    </div>
  );
}