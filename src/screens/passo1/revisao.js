import React from 'react';

//ESTILO
import './revisao.css';

//COMPONENTES MATERIAL UI
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

//COMPONENTES
import Header from '../../components/header';
import Tabela from '../../components/tabela';

//ROTEAMENTO
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: 20,
    }
  }),
);

function Revisao() {
  const styles = useStyles();
  return (
    <div>
      <Header />
      <div className='introducao'>
        <h4>Revisar e alterar informações das disciplinas ofertadas</h4>
        <p>Nesta etapa você pode revisar as informações das disciplinas em cada semestre e alterar alguns campos como 
        <b> capacidade máxima de alunos</b>, <b>número de turmas</b> e caso possua horas-aula práticas, a <b>sala</b> ou <b>laboratório </b> 
        mais indicado para a realização da disciplina.
        <br/><br/>Lembre-se sempre de <b>SALVAR</b> as alterações feitas para não perder seu progresso.</p>
      </div>
      <div className='tabelas'>
        <Tabela />
      </div>
      <div className='buttonsDiv'>
        <Button className={styles.button} variant="contained" size="large" color="primary">Salvar</Button>
        <Link to="/index" >
          <Button className={styles.button} variant="contained" size="large" color="primary">Salvar e Concluir</Button>
        </Link>
      </div>
    </div>
  );
}

export default Revisao;
