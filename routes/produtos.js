const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require('../middleware/login');

const ProdutosController = require('../controllers/produtos.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); //cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }      
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//Retorno dos produtos cadastrados
router.get('/', ProdutosController.getProdutos);

//Cadastrando um produto
router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postProduto);

//Informações dos dados de um produto
router.get('/:id_produto', ProdutosController.getUmProduto);

//Alteração de um produto
router.patch('/', login.obrigatorio, ProdutosController.updateProduto);

//Exclusão de um produto
router.delete('/', login.obrigatorio, ProdutosController.deleteProduto); 

module.exports = router;