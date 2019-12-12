<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro de Funcionários</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{ erro.field }} - {{ erro.defaultMessage }}</b>
        </li>
      </ul>    
    
      <form @submit.prevent="obterAutenticacao">

          <label>Usuário</label>
          <input type="text" placeholder="Usuário" v-model="logusuario.Usuario">
          <label>Senha</label>
          <input type="text" placeholder="Senha" v-model="logusuario.Senha">

          <button class="waves-effect waves-light btn-small">Autenticar<i class="material-icons left">perm_identity</i></button>

      </form>

      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="funcionario.Nome">
          <label>Email</label>
          <input type="email" placeholder="Email" v-model="funcionario.Email">
          <label>Salário</label>
          <input type="number" placeholder="Salário" v-model="funcionario.Salario">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>SALÁRIO</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="funcionario of funcionarios" :key="funcionario.FuncionarioId">

            <td>{{funcionario.Nome}}</td>
            <td>{{funcionario.Email}}</td>
            <td>{{funcionario.Salario}}</td>
            <td>
              <button @click="editar(funcionario)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(funcionario)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Funcionario from './services/funcionarios';
import Autenticacao from './services/autenticacao';

export default{

  data(){

    return {
      
      logusuario:{
        Usuario: '',
        Senha: '',
      },

      funcionario:{
        FuncionarioId: 0,
        Nome: '',
        Email: '',
        Salario: ''
      },

      funcionarios: [],

      errors: []
    }
  },

  mounted(){

    this.listar()
  },

  methods:{

    listar(){

      Funcionario.listar().then(resposta => {
        this.funcionarios = resposta.data
      })
    },

    salvar(){

      if (!this.funcionario.FuncionarioId) {

            Funcionario.salvar(this.funcionario).then(resposta => {

              this.funcionario = {}
              alert('Salvo com sucesso! - ' + resposta.data)
              this.listar()
              this.errors = []
            }).catch(e => {
              this.errors = e.response.data.errors
            })
      }
      else{
          Funcionario.atualizar(this.funcionario).then(resposta => {

            this.funcionario = {}
            alert('Atualizado com sucesso! - ' + resposta.data)
            this.listar();
            this.errors = [];
          }).catch(e => {
            this.errors = e.response.data.errors
          })
      }
    },

    editar(funcionario){

      this.funcionario = funcionario
    },

    remover(funcionario){

      if (confirm('Deseja excluir o funcionário?')) {
        Funcionario.apagar(funcionario).then(resposta => {
            this.listar();
            this.errors = [];
            console.log('Registro apagado: ' + resposta.data)
        }).catch(e => {
            this.errors = e.response.data.errors
        })
      }
    },

        obterAutenticacao() {

            Autenticacao.autenticar(this.logusuario).then(resposta => {

              console.log("Autenticado com sucesso - Token:");
              console.log(resposta.data.access_token);
              
              // Salvar no Local Storage
              localStorage.setItem('autorizacaotoken', resposta.data.access_token);

            }).catch(e => {
              this.errors = e.response.data.errors
            })
        },

        obterTokenAutorizacaoStorage(){

          return localStorage.getItem('autorizacaotoken');
        }
  }
}
</script>

<style>

</style>
