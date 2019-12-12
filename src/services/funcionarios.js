import { http } from './config'

export default{

    listar:() => {
        return http.get('funcionarios')
    },

    salvar:(funcionario) => {
        return http.post('funcionarios', funcionario)
    },

    atualizar:(funcionario) => {
        return http.put('funcionarios', funcionario)
    },

    apagar:(funcionario) => {
        //return http.delete('funcionarios', funcionario.FuncionarioId)
        //var id = funcionario.FuncionarioId;
        return http.delete('funcionarios/?id=' + funcionario.FuncionarioId);
    }
}