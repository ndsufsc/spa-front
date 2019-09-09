import React from 'react';

//MATERIAL UI COMPONENTES
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//ROTEAMENTO
import { Link } from 'react-router-dom'

//ESTILO
import './index.css';

//COMPONENTES
import Header from '../../components/header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

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
      return 'Descrição.';
    case 2:
      return `Descrição.`;
    case 3:
      return 'Descrição.';
    default:
      return 'Erro interno';
  }
}

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div>
      <Header />
      <div className='introducao'>
        <h4>Olá, Coordenador(a)!</h4>
        <p>Seja bem vindo ao Sistema de Planejamento Acadêmico.<br/>
           Aqui você pode planejar, controlar e decidir sobre a distribuição de turmas e disciplinas do seu curso.
            A ferramenta constitui de quatro etapas que facilitam a organização semestral utilizando os planos.<br/><br/>
           Lembre-se sempre de <b>SALVAR</b> as alterações feitas para não perder seu progresso.
        </p>
      </div>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Voltar
                    </Button>
                    <Link to="/revisao" >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                      {activeStep === steps.length - 1 ? 'Fim' : 'Editar'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Planejamento Acadêmico finalizado.</Typography>
          </Paper>
        )}
      </div>
    </div>
  );
}

export default App;
