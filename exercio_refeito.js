//Exercício 1 - Usuários

app.get('/usuario', async (req, res) => {
    const listaUsuarios = await queryAsync("SELECT * FROM usuario")
    res.status(200).json({
        sucesso:true,
        mensagem:" sucesso ao listar usuarios"
    })
})

app.get('/usuario/:id', async (req, res) => {
try {
        const { id } = req.params
        const usuario = await queryAsync("SELECT * FROM usuario WHERE id = ?", [id])

        if (!validarExistencia(usuario, res, "Usuário")) {
            return
        }

        res.status(200).json({
            sucesso: true,
            dados: usuario[0]
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})





function validarExistencia(resultado,req,tipo){
    if(resultado.length === 0){
        mensagem(res,tipo)
        return false
    }
    return true 

}

//Exercício 2 - Pedidos

function validarDadosPedido = ({ cliente, valor}) => {
    if (!cliente || valor === undefined){
        return "Cliente e valor sao obrigatorios"
    }
    if(valor !== 'number' || valor <=0 ){
        return  "Valor invalido"
    }

}

app.post('/pedidos', async (req, res) => {
    try{
    const erro = validarDadosPedido(req.body)

    if (erro){
        res.status(400).json({
            sucesso: false,
            mensagem: erro
        })
    }

    await queryAsync("INSERT INTO pedido SET ?", [req.body])

    if(erro){
        res.status(201).json({
            sucesso:true,
            mensagem:"Seu pedido foi cadastrado"
        })
   } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})
   


//Exercício 3 - Salas

app.put('/salas/:id', async (req, res) => {
    const id = req.params
    const dados = req.body

    const s = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

    if (s.length === 0) {
        return res.send("nao tem")
    }

    await queryAsync("UPDATE sala SET ? WHERE id = ?", [dados, id])

    res.send("foi")
})

app.delete('/salas/:id', async (req, res) => {
    const id = req.params

    const s = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

    if (s.length === 0) {
        return res.send("nao tem")
    }

    await queryAsync("DELETE FROM sala WHERE id = ?", [id])

    res.send("apagou")
})