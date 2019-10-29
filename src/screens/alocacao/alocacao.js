import React from 'react';

//COMPONENTES MATERIAL UI
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

//COMPONENTES
import Header from '../../components/header';
import Tabela from '../../components/tabela';
import api from '../../service/api';

//ROTEAMENTO
import { Link, Redirect } from 'react-router-dom'

const styles = theme => ({
    button: {
      marginRight: 20,
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: '#000',
      marginTop: 20,
    },
    botaoSalvar: {
      marginRight: 10,
    },
  })

class Alocacao extends React.Component {

    constructor() {
      super()
      this.state = {
        arrayTurmas: [],
        arraySalas: [],
      }
    }

    componentDidMount = async () => {

        if (localStorage.getItem('login') == 'on') {

            const response = await api.post("/disciplina/buscarTurmasAlocacao")

            var txtTurmas='';

            for (var i = 0; i < response.data.length; i++) {

              this.setState({ arrayTurmas: [...this.state.arrayTurmas, response.data[i]] })

              txtTurmas += this.state.arrayTurmas[i].codigo_disciplina + ' ' + this.state.arrayTurmas[i].codigo_turma + ' ' + this.state.arrayTurmas[i].qtde_alunos + ' ' + this.state.arrayTurmas[i].qtde_alunos + ' {' + this.state.arrayTurmas[i].dia_semana + ' ' + this.state.arrayTurmas[i].descricao + ' ' + this.state.arrayTurmas[i].qtde_aulas + ' : ' + this.state.arrayTurmas[i].id_tipo_sala + '} \n';

            }

            var txtSalas='';

            const response2 = await api.post("/disciplina/buscarSalas")

            for (var i = 0; i < response2.data.length; i++) {

              this.setState({ arraySalas: [...this.state.arraySalas, response2.data[i]] })

              txtSalas += this.state.arraySalas[i].sigla + ' ' + this.state.arraySalas[i].capacidade + ' ' + this.state.arraySalas[i].id_tipo_sala + ' 1 1 1 \n';

            }

            await api.post("/disciplina/gerarArquivo", {
              txtturmas: txtTurmas,
              txtsalas:  txtSalas,

            });
            
        }

    };

    render() {
        return(

          <div>

          <table style={{ float: 'right' }} border={'1'}><th>COD_DISCIPLINA</th><th>COD_TURMA</th><th>QTDE_ALUNOS</th><th>DIA</th><th>INICIO</th><th>CREDITOS</th><th>TIPO SALA</th>

          {  this.state.arrayTurmas.map(function (item, index) {

            return (
              
              <tr><td><center>
              {item.codigo_disciplina}
              </center></td><td><center>
              {item.codigo_turma}
              </center></td><td><center>
              {item.qtde_alunos}
              </center></td><td><center>
              {item.dia_semana}
              </center></td><td><center>
              {item.descricao}
              </center></td><td><center>
              {item.qtde_aulas}
              </center></td><td><center>
              {item.id_tipo_sala}
              </center></td></tr>

            )

          })
              
          }

          </table>
             
          <table border={'1'}><th>COD</th><th>CAPACIDADE</th><th>TIPO</th>
        
          {  this.state.arraySalas.map(function (item, index) {

            return (
              
              <tr><td><center>
              {item.sigla}
              </center></td><td><center>
              {item.capacidade}
              </center></td><td><center>
              {item.id_tipo_sala}
              </center></td></tr>

            )

          })
            
          }

          </table>

          </div>

        );

    };

}

Alocacao.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Alocacao);