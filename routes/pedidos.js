const express = require('express');
const router = express.Router();

const PedidosController = require('../controllers/pedidos.controller');

//Consulta de todos os pedidos cadastrados
router.get('/', PedidosController.getPedidos);

//Cadastro de um pedido
router.post('/', PedidosController.postPedidos);

//Retorno dos dados de um pedido
router.get('/:id_pedido', PedidosController.getUmPedido);

//Exclusão de um pedido
router.delete('/', PedidosController.deletePedido);

module.exports = router;