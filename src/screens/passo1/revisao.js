import React from 'react';

//ESTILO
import './revisao.css';

//COMPONENTES
import Header from '../../components/header';
import Tabela from '../../components/tabela';

function Revisao() {
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
    </div>
  );
}

export default Revisao;
