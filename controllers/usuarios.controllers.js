const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Cadastro de usuário
exports.cadastrarUsuario = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error })}
        //Verificação se já existe um usuário cadastrado no Banco
        conn.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], (error, results) => {
            if(error) { return res.status(500).send({ error: error })}
            if (results.length > 0) {
                res.status(409).send({mensagem: '✍ Usuario já cadastrado ✍'})
            } else {
                //Criação de um usuário
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if(errBcrypt){ return res.status(500).send({error:errBcrypt})}
                    conn.query(`INSERT INTO usuarios (email, senha) VALUES (?,?)`, 
                    [req.body.email,hash],
                    (error, results) => {
                        conn.release();
                        if(error) { return res.status(500).send({ error: error })}
                        return res.status(201).send({
                            mensagem: '👍 Usuario cadastrado com sucesso 👍!!!',
                            usuarioCriado: {
                                id_usuario: results.insertId,
                                email: req.body.email
                            }
                        })
                      } 
                    );
                });
            }
        })        
    });
}

//Login do usuário
exports.Login = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error:error})}
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error}) }
            //Verificando o e-mail
            if (results.length < 1) {
                return res.status(401).send({mensagem: '✋ Falha na autenticação ✋'})
            }
            //Verificando a senha 
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if(err) {
                    return res.status(401).send({mensagem: '✋ Falha na autenticação ✋'})
                }
                if (result) {
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email 
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "2h" //Tempo extimado para expiração do token
                    });
                    return res.status(200).send({ 
                        mensagem: '🔑 Autenticado com sucesso 🔑',
                        token: token,
                    });
                }
                return res.status(401).send({mensagem: '✋ Falha na autenticação ✋'})
            });
        });
    });
}