const mysql = require('../mysql').pool;

//Retorno dos produtos cadastrados
exports.getProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM produtos;',
            (error, result, fields) => {
                if(error) { return res.status(500).send({ error: error })}
                /*const response = {
                    quantidade: resultado.length,
                    produtos: resultado.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: '',
                                url:'http://localhost:3000/produtos/' + prod.id_produto
                            }
                        }      
                    })
                }*/
                return res.status(200).send({mensagem: '📡 Todos produtos cadastrados até o momento: 📡',
                //response: resultado,
                quantidade: result.length,
                produtos: result.map(prod => {
                    return {
                        id_produto: prod.id_produto,
                        nome: prod.nome,
                        preco: prod.preco,
                        imagem_produto: prod.imagem_produto,
                        request: {
                            tipo: 'GET',
                            descricao: 'Todos os produtos cadastrados',
                            url:'http://localhost:3000/produtos/' + prod.id_produto
                        }
                    }      
                })
            });
            }
        )
    })
}
//Cadastrando um produto
exports.postProduto = (req, res, next) => {
    console.log(req.file);
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `INSERT INTO produtos (nome, preco,imagem_produto) VALUES (?,?,?)`,
            [
                req.body.nome,
                req.body.preco,
                req.file.path
            ],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'Cadastro de um produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    })
}

//Informações dos dados de um produto
exports.getUmProduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM produtos WHERE id_produto =?;',
            [req.params.id_produto],
            (error, result, fields) => {
                if(error) { return res.status(500).send({ error: error })}

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: '❌ Não foi encontrado nenhum produto com este ID em nosso banco de dados'
                    })
                }                
                return res.status(200).send({mensagem: '📄 Informações do Produto 📄',
                produto: result.map(prod => {
                    return {
                        id_produto: prod.id_produto,
                        nome: prod.nome,
                        preco: prod.preco,
                        imagem_produto: prod.imagem_produto,
                        request: {
                            tipo: 'GET',
                            descricao: '',
                            url:'http://localhost:3000/produtos'
                        }
                    }      
                })
            });
            }
        )
    });
};

//Alteração de um produto
exports.updateProduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?`,
            [
                req.body.nome, 
                req.body.preco, 
                req.body.id_produto
            ],

            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error })}
                
                res.status(201).send({
                    mensagem: '🎫 Produto atulizado com sucesso 🎫',
                    id_produto: req.body.id_produto,
                    produto: result.id_produto,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    request: {
                        tipo: 'POST',
                        descricao: 'Atualizando os dados de um produto',
                        url:'http://localhost:3000/produtos/' + req.body.id_produto
                    }
                }); 
            }
        )
    });
}

//Exclusão de um produto
exports.deleteProduto = (req, res, next) => {
    /*res.status(201).send({
        mensagem: '🚯 Seu produto foi excluido com sucesso !!! 🚯'
    });*/

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`, [req.body.id_produto],
            (error, resultado, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error })}
                
                res.status(201).send({ 
                    mensagem: '🚯 Seu produto foi excluido com sucesso !!! 🚯',
                    request: {
                        tipo: 'POST',
                        descricao: 'Exclusão de um produto',
                        url:'http://localhost:3000/produtos',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                });
            }
        )
    });
}