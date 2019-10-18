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

            const response = await api.post("/disciplina/obterTurmasAlocacao")

            for (var i = 0; i < response.data.length; i++) {

              this.setState({ arrayTurmas: [...this.state.arrayTurmas, response.data[i]] })

            }

            const response2 = await api.post("/disciplina/buscarSalas")

            for (var i = 0; i < response2.data.length; i++) {

              this.setState({ arraySalas: [...this.state.arraySalas, response2.data[i]] })

            }

        }

    };

    render() {
        return(

          <div>

          <table style={{ float: 'right' }} border={'1'}><th>COD</th><th>DIA</th><th>INICIO</th><th>QUANTIDADE AULA</th><th>ALUNOS</th><th>SALA</th><th>TIPO</th><th>TIPO SALA</th>

          {  this.state.arrayTurmas.map(function (item, index) {

            return (
              
              <tr><td><center>
              {item.codigo}
              </center></td><td><center>
              {item.dia_semana}
              </center></td><td><center>
              {item.descricao}
              </center></td><td><center>
              {item.qtde_aulas}
              </center></td><td><center>
              {item.qtde_alunos}
              </center></td><td><center>
              {item.id_sala}
              </center></td><td><center>
              {item.teorico}
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


// for ($l=0; $l<$j; $l++) // For para passar por todas as salas
//         {
        
//             if ( ($turma["$k"]["alunos"] == $sala["$l"]["capacidade"]) && ($turma["$k"]["tipo"] == $sala["$l"]["tipo"]) && ( ( !isset($turma["$k"]["sala"]) ) || ($turma["$k"]["sobra"] > ($turma["$k"]["alunos"] - $sala["$l"]["capacidade"]) ) ) ) // Caso a quantidade de alunos for menor que a capacidade da sala, e a sala for do mesmo tipo que a turma, e ou a turma não tem sala ou a sobra da antiga sala for maior que a sobra da nova sala
//             {
                
//                 $control=0; // Define variável de controle para saber se a sala já foi alocada
                
//                 for ($m=0; $m<$i; $m++) // Verifica todas as turmas para verificar se a sala já foi alocada no mesmo horário
//                 {
                    
//                     if ( ( ($turma["$m"]["dia"] == $turma["$k"]["dia"]) && ( ( ($turma["$m"]["inicio"] < $turma["$k"]["fim"] && $turma["$m"]["fim"] > $turma["$k"]["inicio"]) || ($turma["$m"]["inicio"] < $turma["$k"]["inicio"] && $turma["$m"]["fim"] > $turma["$k"]["inicio"]) ) ) ) && ($turma["$m"]["sala"]==$sala["$l"]["cod_sala"]) ) // Verifica se as turmas são no mesmo horário, no mesmo dia e na mesma sala
//                     {
                        
//                         if( ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]) < ($sala["$l"]["capacidade"] - $turma["$m"]["alunos"]) ) // Caso a subtração da capacidade da sala pela turma nova for menor que a capacidade da sala pela turma antiga, significa que a sala é mais adequada para a turma nova, então é trocado de sala
//                         {
                            
//                             $turma["$k"]["sala"] = $sala["$l"]["cod_sala"];
//                             $turma["$k"]["sobra"] = ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]);
//                             $turma["$m"]["sala"] = NULL;
//                             $turma["$m"]["sobra"] = NULL;
//                             $k=$m; //
//                             break;
                            
//                         } else // Caso a sala seja melhor para a turma antiga, a variável de controle é colocada em 1, para verificar que a turma ainda não tem uma sala
//                         {
                        
//                             $control=1;
//                             break;
                        
//                         }
                            
//                     }
                    
//                 }
                
//                 if ($control==0) // Caso a variável de controle não for alterada, a turma pode alocar a sala
//                 {
                    
//                     $turma["$k"]["sala"] = $sala["$l"]["cod_sala"];
//                     $turma["$k"]["sobra"] = ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]);
                    
//                 }
                
                
//             }
            
//         }
        
//         if (!isset($turma["$k"]["sala"])) // Caso não for alocada nenhuma sala, deve-se procurar salas com capacidades maiores do que a quantidade de alunos na turma
//         {
            
//             for ($l=0; $l<$j; $l++)  // For para passar por todas as salas
//             {
        
//                 if ( ($turma["$k"]["alunos"] < $sala["$l"]["capacidade"]) && ($turma["$k"]["tipo"] == $sala["$l"]["tipo"]) && ( ( !isset($turma["$k"]["sala"]) ) || ($turma["$k"]["sobra"] > ($turma["$k"]["alunos"] - $sala["$l"]["capacidade"]) ) ) ) // Caso a quantidade de alunos for menor que a capacidade da sala, e a sala for do mesmo tipo que a turma, e ou a turma não tem sala ou a sobra da antiga sala for maior que a sobra da nova sala
//                 {
                    
//                     $control=0; // Define variável de controle para saber se a sala já foi alocada
                
//                     for ($m=0; $m<$k; $m++) // Verifica todas as turmas para verificar se a sala já foi alocada no mesmo horário
//                     {

//                         if ( ( ($turma["$m"]["dia"] == $turma["$k"]["dia"]) && ( ( ($turma["$m"]["inicio"] < $turma["$k"]["fim"] && $turma["$m"]["fim"] > $turma["$k"]["inicio"]) || ($turma["$m"]["inicio"] < $turma["$k"]["inicio"] && $turma["$m"]["fim"] > $turma["$k"]["inicio"]) ) ) ) && ($turma["$m"]["sala"] == $sala["$l"]["cod_sala"]) ) // Verifica se as turmas são no mesmo horário, no mesmo dia e na mesma sala
//                         {
                            
//                             if( ( $sala["$l"]["capacidade"] - $turma["$k"]["alunos"]) < ($sala["$l"]["capacidade"] - $turma["$m"]["alunos"]) ) // Caso a subtração da capacidade da sala pela turma nova for menor que a capacidade da sala pela turma antiga, significa que a sala é mais adequada para a turma nova, então é trocado de sala
//                             {

//                                 $turma["$k"]["sala"] = $sala["$l"]["cod_sala"];
//                                 $turma["$k"]["sobra"] = ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]);
//                                 $turma["$m"]["sala"] = NULL;
//                                 $turma["$m"]["sobra"] = NULL;
//                                 $k=$m; //
//                                 break;

//                             } else // Caso a sala seja melhor para a turma antiga, a variável de controle é colocada em 1, para verificar que a turma ainda não tem uma sala
//                             {

//                                 $control=1;
//                                 break;

//                             }

//                         }

//                     }
                
//                     if ($control==0)
//                     {

//                         $turma["$k"]["sala"] = $sala["$l"]["cod_sala"];
//                         $turma["$k"]["sobra"] = ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]);

//                     }
        
//                 }
                
//             }
           
//         }
        
//     }