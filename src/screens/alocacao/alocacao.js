class Alocacao extends React.Component {

    constructor() {
      super()
      this.state = {
        arrayTurmas: { id_turma: [], codigo: [], dia_semana: [], inicio: [], qtde_aulas: [], qtde_alunos: [], id_tipo_sala: [], tipo_aula: [] },
        arraySalas: { id_salas: [], id_tipo_sala: [], sigla: [], capacidade: [] },
      }
    }
}

componentDidMount = async () => {
    if (localStorage.getItem('login') == 'on') {
      const response = await api.post("/disciplina/obterTurmasAlocacao")

      this.setState({ id_curso: response.data[0].id_curso })

      const response2 = await api.post("/disciplina/buscarSalas")

      await this.setState({ qtdeSemestre: response2.data[0].semestres, })
      var rows = [];
      for (var i = 1; i <= this.state.qtdeSemestre; i++) {
        this.setState({ array: [...this.state.array, { value: i, label: i + "º Semestre" }] })
        this.setState({ carregou: true })
      }

    }
};


for ($l=0; $l<$j; $l++) // For para passar por todas as salas
        {
        
            if ( ($turma["$k"]["alunos"] == $sala["$l"]["capacidade"]) && ($turma["$k"]["tipo"] == $sala["$l"]["tipo"]) && ( ( !isset($turma["$k"]["sala"]) ) || ($turma["$k"]["sobra"] > ($turma["$k"]["alunos"] - $sala["$l"]["capacidade"]) ) ) ) // Caso a quantidade de alunos for menor que a capacidade da sala, e a sala for do mesmo tipo que a turma, e ou a turma não tem sala ou a sobra da antiga sala for maior que a sobra da nova sala
            {
                
                $control=0; // Define variável de controle para saber se a sala já foi alocada
                
                for ($m=0; $m<$i; $m++) // Verifica todas as turmas para verificar se a sala já foi alocada no mesmo horário
                {
                    
                    if ( ( ($turma["$m"]["dia"] == $turma["$k"]["dia"]) && ( ( ($turma["$m"]["inicio"] < $turma["$k"]["fim"] && $turma["$m"]["fim"] > $turma["$k"]["inicio"]) || ($turma["$m"]["inicio"] < $turma["$k"]["inicio"] && $turma["$m"]["fim"] > $turma["$k"]["inicio"]) ) ) ) && ($turma["$m"]["sala"]==$sala["$l"]["cod_sala"]) ) // Verifica se as turmas são no mesmo horário, no mesmo dia e na mesma sala
                    {
                        
                        if( ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]) < ($sala["$l"]["capacidade"] - $turma["$m"]["alunos"]) ) // Caso a subtração da capacidade da sala pela turma nova for menor que a capacidade da sala pela turma antiga, significa que a sala é mais adequada para a turma nova, então é trocado de sala
                        {
                            
                            $turma["$k"]["sala"] = $sala["$l"]["cod_sala"];
                            $turma["$k"]["sobra"] = ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]);
                            $turma["$m"]["sala"] = NULL;
                            $turma["$m"]["sobra"] = NULL;
                            $k=$m; //
                            break;
                            
                        } else // Caso a sala seja melhor para a turma antiga, a variável de controle é colocada em 1, para verificar que a turma ainda não tem uma sala
                        {
                        
                            $control=1;
                            break;
                        
                        }
                            
                    }
                    
                }
                
                if ($control==0) // Caso a variável de controle não for alterada, a turma pode alocar a sala
                {
                    
                    $turma["$k"]["sala"] = $sala["$l"]["cod_sala"];
                    $turma["$k"]["sobra"] = ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]);
                    
                }
                
                
            }
            
        }
        
        if (!isset($turma["$k"]["sala"])) // Caso não for alocada nenhuma sala, deve-se procurar salas com capacidades maiores do que a quantidade de alunos na turma
        {
            
            for ($l=0; $l<$j; $l++)  // For para passar por todas as salas
            {
        
                if ( ($turma["$k"]["alunos"] < $sala["$l"]["capacidade"]) && ($turma["$k"]["tipo"] == $sala["$l"]["tipo"]) && ( ( !isset($turma["$k"]["sala"]) ) || ($turma["$k"]["sobra"] > ($turma["$k"]["alunos"] - $sala["$l"]["capacidade"]) ) ) ) // Caso a quantidade de alunos for menor que a capacidade da sala, e a sala for do mesmo tipo que a turma, e ou a turma não tem sala ou a sobra da antiga sala for maior que a sobra da nova sala
                {
                    
                    $control=0; // Define variável de controle para saber se a sala já foi alocada
                
                    for ($m=0; $m<$k; $m++) // Verifica todas as turmas para verificar se a sala já foi alocada no mesmo horário
                    {

                        if ( ( ($turma["$m"]["dia"] == $turma["$k"]["dia"]) && ( ( ($turma["$m"]["inicio"] < $turma["$k"]["fim"] && $turma["$m"]["fim"] > $turma["$k"]["inicio"]) || ($turma["$m"]["inicio"] < $turma["$k"]["inicio"] && $turma["$m"]["fim"] > $turma["$k"]["inicio"]) ) ) ) && ($turma["$m"]["sala"] == $sala["$l"]["cod_sala"]) ) // Verifica se as turmas são no mesmo horário, no mesmo dia e na mesma sala
                        {
                            
                            if( ( $sala["$l"]["capacidade"] - $turma["$k"]["alunos"]) < ($sala["$l"]["capacidade"] - $turma["$m"]["alunos"]) ) // Caso a subtração da capacidade da sala pela turma nova for menor que a capacidade da sala pela turma antiga, significa que a sala é mais adequada para a turma nova, então é trocado de sala
                            {

                                $turma["$k"]["sala"] = $sala["$l"]["cod_sala"];
                                $turma["$k"]["sobra"] = ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]);
                                $turma["$m"]["sala"] = NULL;
                                $turma["$m"]["sobra"] = NULL;
                                $k=$m; //
                                break;

                            } else // Caso a sala seja melhor para a turma antiga, a variável de controle é colocada em 1, para verificar que a turma ainda não tem uma sala
                            {

                                $control=1;
                                break;

                            }

                        }

                    }
                
                    if ($control==0)
                    {

                        $turma["$k"]["sala"] = $sala["$l"]["cod_sala"];
                        $turma["$k"]["sobra"] = ($sala["$l"]["capacidade"] - $turma["$k"]["alunos"]);

                    }
        
                }
                
            }
           
        }
        
    }

    ///////////////////////////////////

    // TABELAS DAS TURMAS E DAS SALAS

    ///////////////////////////////////

    echo ("<table style='float:left' border='1'><th>COD</th><th>DIA</th><th>INICIO</th><th>FIM</th><th>ALUNOS</th><th>SALA</th><th>TIPO</th><th>SOBRA</th>");

    for ($k=0; $k<$i; $k++) {
        
        echo("<tr><td><center>");
        echo($turma["$k"]["cod_turma"]);
        echo("</center></td><td><center>");
        echo($turma["$k"]["dia"]);
        echo("</center</td><td><center>");
        echo($turma["$k"]["inicio"]);
        echo("</center></td><td><center>");
        echo($turma["$k"]["fim"]);
        echo("</center></td><td><center>");
        echo($turma["$k"]["alunos"]);
        echo("</center></td><td><center>");
        echo($turma["$k"]["sala"]);
        echo("</center></td><td><center>");
        echo($turma["$k"]["tipo"]);
        echo("</center></td><td><center>");
        echo($turma["$k"]["sobra"]);
        echo("</center></td></tr>");
        
    }

    echo ("<table style='margin-left:81%; position: fixed' border='1'><th>COD</th><th>CAPACIDADE</th><th>TIPO</th>");

    for ($l=0; $l<$j; $l++) {
        
        echo("<tr><td><center>");
        echo($sala["$l"]["cod_sala"]);
        echo("</center></td><td><center>");
        echo($sala["$l"]["capacidade"]);
        echo("</center></td><td><center>");
        echo($sala["$l"]["tipo"]);
        echo("</center></td></tr>");
        
    }