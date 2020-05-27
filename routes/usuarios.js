const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsuariosController = require('../controllers/usuarios.controllers');

//Cadastro de usuário
router.post('/cadastro', UsuariosController.cadastrarUsuario);

//Login do usuário
router.post('/login', UsuariosController.Login);

module.exports = router;