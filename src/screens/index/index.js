import React from 'react';

//MATERIAL UI COMPONENTES
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import api from '../../service/api';
import LinearProgress from '@material-ui/core/LinearProgress';

//ROTEAMENTO
import { Link, Redirect } from 'react-router-dom'

//ESTILO
import './index.css';

//COMPONENTES
import Header from '../../components/header';

const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    cursor: 'pointer',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  h4: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    marginTop: 20,
  }
})

function getSteps() {
  return ['Revisar e alterar informações das disciplinas ofertadas',
    'Montar a grade de horários de cada turma para as disciplinas ofertadas no semestre',
    'Definir os professores responsáveis por cada disciplina no semestre',
    'Alocar salas de acordo com o planejamento das grades'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `Para cada disciplina ofertada no semestre recomendamos a revisão das informações para garantir que erros não serão cometidos durante o planejamento.
              \nCaso alguma disciplina possua horas-aula práticas você deve escolher o laboratório onde será ministrada.
              \nLembre-se sempre de SALVAR as alterações feitas para não perder seu progresso.`;
    case 1:
      return `Monte a grade de horários de cada semestre, selecionando o mesmo e então selecionando as turmas desejadas de cada disciplina. 
              \nApós a seleção, clique na posição da grade que representa a hora/aula desejada para cadastrar a disciplina, sempre prestando atenção no bloco da disciplina confirmando a disciplina, a turma e se a hora/aula é teórica ou prática.
              \nCaso queira retirar uma disciplina cadastrada, clique no 'X' no seu bloco de disciplina que estará na grade.
              \nSalve suas alterações antes de mudar o semestre, e lembre-se sempre de SALVAR as alterações feitas para não perder seu progresso.`;
    case 2:
      return `Selecione o semestre desejado para listar todas as disciplinas do mesmo. Então, selecione o professor desejado e clique no bloco de disciplina que representa a hora/aula desejada, sempre prestando atenção no bloco da disciplina confirmando a disciplina, a turma e se a hora/aula é teórica ou prática.
              \nSalve suas alterações antes de mudar o semestre, e lembre-se sempre de SALVAR as alterações feitas para não perder seu progresso.`;
    case 3:
      return 'Executar algoritmo para buscar a melhor solução para alocar as salas pelas turmas.';
    default:
      return 'Erro interno';
  }
}

function getRoute(step: number) {
  switch (step) {
    case 0:
      return '/revisao';
    case 1:
      return '/grade';
    case 2:
      return `/`;
    case 3:
      return '/';
    default:
      return '/';
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      steps: getSteps(),
      step: 0,
      alocando: false,
      alocado: true,
    }
  }

  componentDidMount = async () => {
    if (localStorage.getItem('login') == 'on') {
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      await this.setState({ step: usuario.etapa })

      const res = await api.post('/login/verificar', { siape: 123, senha_usuario: 123 })

      this.setState({ step: res.data[0].etapa })

      const response = await api.post('/login/obterSemestreAtual');
      console.log("response: ", response.data);
      
    }

  };

  render() {
    const { classes } = this.props;
    if (localStorage.getItem('login') == 'on') {
      return (
        <div>
          <Header  />
          <div className='introducao'>
            <h4 className={classes.h4}>Olá, Coordenador(a)!</h4>
            <p>Seja bem vindo ao Sistema de Planejamento Acadêmico.<br />
              Aqui você pode planejar, controlar e decidir sobre a distribuição de turmas e disciplinas do seu curso.
                A ferramenta constitui de quatro etapas que facilitam a organização semestral utilizando os planos.<br /><br />
              Lembre-se sempre de <b>SALVAR</b> as alterações feitas para não perder seu progresso.
            </p>
          </div>
          <div className={classes.root}>
            <Stepper activeStep={this.state.step} orientation="vertical">
              {this.state.steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(this.state.step)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        { this.state.alocando ? null :
                          <Button
                            disabled={this.state.step === 0 || this.state.step === 2 || this.state.step === 3}
                            onClick={() => this.setState({ step: this.state.step-1 })}
                            className={classes.button}
                          >
                            Voltar
                          </Button>
                        }
                        {
                          this.state.step === 3 ?
                              
                          this.state.alocando ?
                              <div>
                                <p><b>Aguarde, alocando salas.</b></p>
                                <LinearProgress />
                              </div>
                            :
                              <Link to={getRoute(this.state.step)} >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={null}
                                  className={classes.button}
                                >
                                  {this.state.alocado ? 'Visualizar' : 'Executar'}
                                </Button>
                              </Link>
                            
                          :
                            <Link to={getRoute(this.state.step)} >
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={null}
                                className={classes.button}
                              >
                                Editar
                              </Button>
                            </Link>
                        }
                        
                        {this.state.alocando ? null :
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.setState({ step: this.state.step+1 })}
                            className={classes.button}
                          >
                            Concluir
                          </Button>
                        }
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {this.state.step === this.state.steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>Planejamento Acadêmico finalizado.</Typography>
              </Paper>
            )}
          </div>
        </div>
      );
    }
    return (
      <Redirect to="/" from="" />
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
