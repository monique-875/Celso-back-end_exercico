//Exercício 1 - Usuários
function ValidarUsuario(id) {
  if (!id || isNaN(id)) {
    return "id valido";
  }
}
function mensagem(res,tipo){
    res.status(404).json({
        sucesso: false,
        messagem:`${tipo} nao encontrado`


    })
    }


function validarExistencia(resultado, res, tipo) {
  if (usuario.length === 0) {
    mesagem(res, tipo);
    return false
  }
  return true
}


function validarDadosAtualizado(dados, res, tipo) {
  if (Object.keys(dados).length === 0) {
    mesagem(res, tipo);
    return false
  }
  return true
}


app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await queryAsync("SELECT * FROM usuario");
    res.status(200).json({
      sucesso: true,
      dados: usuarios,
      total: usuarios.length,
    });
  } catch (erro) {
    //executado apenas se um erro ocorrerno  no try
    console.log("Erro ao listar usuarios:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: " Erro ao listar usuarios",
      erro: erro,
    });
  }
  {
  }
});

app.get("/usuarios/:id", async (req, res) => {
  try {
    const{id} = req.params
    const usuario = await queryAsync("SELECT * FROM usuario WHERE id = ?" , [id])
   
    if (!validarExistencia(usuario , res , "Usuario")) {
        return
    }
    res.status(200).json({
        sucesso: true,
        dados: usuario [0]
    })

  } catch (erro) {
    console.log("Erro ao encontrar usuario:", erro);
    res.status(500).json({
      sucesso: false,
     mensagem: erro
    });
  }
});



//Exercício 2 - Pedidos
const validarDadosPedido = ({cliente , valor}) =>{
    if (!cliente || valor === undefined) {
      return "O cliente e valor são obrigatórios."

    }

    if(typeof valor !== 'number' || valor <= 0){
        return "Valor invalido"
    }
     
    return null
   
}


app.post("/pedidos", async (req, res) => {
  try {
   
    const erro = validarDadosPedido(req.body)

    if(erro){
        return res.status(400).json({
            sucesso: false,
            mensagem: erro
        })
    }

await queryAsync("INSERT INTO pedido SET?", [req.body])

res.status(201).json({
    sucesso:true,
    mensagem:"pedido cadastrado"
})

  } catch (erro){

    res.status(500).json({
        sucesso: false,
        mensagem: erro
    })

  }

})


//Exercício 3 - Salas

app.put("/salas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dados  = req.body;

    if (!validarExistencia(sala, res, "Sala")) {
      return 
    }

    // if(Object.keys(validarDadosAtualizado).length === 0){
    //     return res.status(400).json({
    //         sucesso: false,
    //         mensagem: "Nenhum dado enviado"
    //     })
    // }

    if (!validarDadosAtualizado(dados , res , "sala")) {
        return
    }
await querryAsync("UPDATE sala SET ? WHERE id = ? ", [id])

res.status(200).json({
    sucesso: true,
    mensagem:"Sala atualizada"

})


  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar sala.",
      erro: erro,
    });
  }
});

app.delete("/salas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!validarExistencia(sala, res, "Sala")) {
      return 
    }



    await queryAsync("DELETE FROM sala WHERE id = ?", [id]);

    res.status(200).json({
      sucesso: true,
      mensagem: "sala removida",
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao apagar sala.",
      erro: erro,
    });
  }
});
