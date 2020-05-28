<h4 align="center">
  💳 API Rest de sistema de cadastro e venda de produtos 💳
</h4>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Desenvolvimento</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<br>

## 💻 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)


## 📂 Projeto

Esta API tem como objetivo cadastrar produtos e pedidos para posterior venda dos itens. O back-end foi desenvolvido com Node.JS utilizando express para seu desenvolvimento. O sistema ainda possui uma verificação e autenticação dos usuários utilizando JWT. 

## 📚 Desenvolvimento

O projeto foi divido em 10 partes: 

- Criação da base da API 
- Configuração das rotas de produtos e pedidos
- Criação e confifguração do banco de dados (MySQL) utilizando Docker 
- Configuração na rota produtos e pedidos com o banco de dados
- Adcionando a funcionalidade de upload de imagem 
- Criação do cadastro de usuário
- Login e autenticação do usuário através do JWT 
- Protejendo as rotas com JWT
- Separando as rotas e controllers
- Refatoração do código