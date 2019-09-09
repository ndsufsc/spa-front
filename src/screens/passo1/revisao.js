import React from 'react';

//MATERIAL UI COMPONENTES
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//ESTILO
import './revisao.css';

//COMPONENTES
import Header from '../../components/header';

const headerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      fontSize: 15,
    },
  }),
);

function Revisao() {
  const header = headerStyles();
  return (
    <div>
      <Header />
      <div className={header.root}>
        <AppBar position="static" color="inherit">
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
      </div>
      <div className='introducao'>
        <h4>Olá, Coordenador(a)!</h4>
        <p>Seja bem vindo ao Sistema de Planejamento Acadêmico.<br/>
           Aqui você pode planejar, controlar e decidir sobre a distribuição de turmas e disciplinas do seu curso.<br/>
           A ferramenta constitui de quatro etapas que facilitam a organização semestral utilizando os planos.<br/><br/>
           Lembre-se sempre de <b>SALVAR</b> as alterações feitas para não perder seu progresso.
        </p>
      </div>
    </div>
  );
}

export default Revisao;
