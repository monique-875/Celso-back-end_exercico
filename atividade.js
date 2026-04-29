//Exercício 1 - Usuários
function ValidarUsuario(id) {
  if (!id || isNaN(id)) {
    return "id valido";
  }
}

function procurarUsuario(usuario) {
  if (usuario.length === 0) {
    return "produto não encontrado";
  }
}

function verificarPositivo(valor) {
  if (valor !== "number" || valor <= 0) {
    return "Valor deve ser um número positivo";
  }
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
      erro: erro.message,
    });
  }
  {
  }
});

app.get("/usuarios/:id", async (req, res) => {
  try {
    const erro = validarIdProduto(id);
    if (erro) {
      // isNan é not a number
      return res.status(400).json({
        sucesso: false,
      });
    }
    const usuario = procurarUsuario(usuario);

    if (usuario) {
      return res.status(404).json({
        sucesso: false,
      });
    }
    res.json({
      sucesso: true,
      dados: usuario[0],
    });
  } catch (erro) {
    console.log("Erro ao encontrar usuario:", erro);
    res.status(500).json({
      sucesso: false,
      erro: erro.message,
    });
  }
});



//Exercício 2 - Pedidos

function ValidarSeExisteSala(sala) {
  if (sala.length === 0) {
    return "Sala não encontrada.";
  }
}

app.post("/pedidos", async (req, res) => {
  try {
    const { cliente, valor } = req.body;

    if (!cliente || !valor) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "O cliente e valor são obrigatórios",
      });
    }

    if (verificarPositivo) {
      return res.status(400).json({
        sucesso: false,
      });
    }
  } catch (erro) {
    console.error("Erro ao salvar pedido:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao salvar pedido.",
      erro: erro.message,
    });
  }
});


//Exercício 3 - Salas

app.put("/salas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { dados } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID da sala  inválido.",
      });
    }

    const salaExistente = await queryAsync("SELECT * FROM sala WHERE id = ?", [
      id,
    ]);

    const length = ValidarSeExisteSala(sala);
    if (length) {
      return res.status(404).json({
        sucesso: false,
        mensagem: length,
      });
    }

    const salaAtualizada = {};

    if (dados !== undefined) salaAtualizada.dados = dados.trim();

    if (Object.keys(salaAtualizada).length === 0) {
      // analiza todos os objetos presentes no java
      return res.status(400).json({
        sucesso: false,
        mensagem: "Nenhum campo para atualizar",
      });
    }

    await queryAsync("UPDATE sala SET ? WHERE id = ?", [salaAtualizada, id]);
    res.json({
      sucesso: true,
      mensagem: "sala atualizado.",
    });
  } catch (erro) {
    console.error("Erro ao atualizar sala:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualizar sala.",
      erro: erro.message,
    });
  }
});

app.delete("/salas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const erro = validarUsuario(id);

    if (erro) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "ID sala inválido.",
      });
    }

    const salaExistente = await queryAsync("SELECT * FROM sala WHERE id = ?", [
      id,
    ]);

    if (length) {
      return res.status(404).json({
        sucesso: false,
        mensagem: length,
      });
    }

    await queryAsync("DELETE FROM sala WHERE id = ?", [id]);

    res.status(200).json({
      sucesso: true,
      mensagem: "sala apagado",
    });
  } catch (erro) {
    console.error("Erro ao apagar sala:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao apagar sala.",
      erro: erro.message,
    });
  }
});


// correção 

//Exercício 1
function mensagem(res, tipo) {
    res.status(404).json({
        sucesso: false,
        mensagem: `${tipo} não encontrado(a).`
    })
}

function validarExistencia(resultado, res, tipo) {
    if (resultado.length === 0) {
        mensagem(res, tipo)
        return false
    }
    return true
}

app.get('/usuario', async (req, res) => {
    try {
        const listaUsuarios = await queryAsync("SELECT * FROM usuario")
        res.status(200).json({
            sucesso: true,
            dados: listaUsuarios
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })

    }
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

//Exercício 2

const validarDadosPedido = ({ cliente, valor }) => {
    if (!cliente || valor === undefined) {
        return "Cliente e valor são obrigatórios."
    }

    if (typeof valor !== 'number' || valor <= 0) {
        return "Valor inválido"
    }

    return null
}

app.post('/pedidos', async (req, res) => {
    try {
        const erro = validarDadosPedido(req.body)

        if (erro) {
            return res.status(400).json({
                sucesso: false,
                mensagem: erro
            })
        }

        await queryAsync("INSERT INTO pedido SET ?", [req.body])

        res.status(201).json({
            sucesso: true,
            mensagem: "Pedido cadastrado."
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})

//Exercício 3

const validarDadosAtualizados = (dados, res) => {
    if (Object.keys(dados).length === 0) {
            res.status(400).json({
            sucesso: false,
            mensagem: "Nenhum dado enviado"
        })
        return false
    }
    return true
}

app.put('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dados = req.body

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        if (!validarExistencia(sala, res, "Sala")) {
            return
        }

        if(!validarDadosAtualizados(dados, res)){
            return
        }

        await queryAsync("UPDATE sala SET ? WHERE id = ?", [dados, id])

        res.status(200).json({
            sucesso: true,
            mensagem: "Sala atualizada"
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})

app.delete('/salas/:id', async (req, res) => {
    try {
        const {id} = req.params

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        if (!validarExistencia(sala, res, "Sala")) {
            return
        }

        await queryAsync("DELETE FROM sala WHERE id = ?", [id])

        res.status(200).json({
            sucesso: true,
            mensagem: "Sala removida."
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})