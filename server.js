
import 'dotenv/config';
import express, { request, response } from "express"
import prisma from "./PrismaClient.js";


const app = express();
app.use(express.json());



// Rotas CRUD para ofertas 
// Rota cadastrar nova oferta 
app.post("/ofertas", async (req, res) => {
    const { titulo, descricao, nivel } = req.body;
    const ofertas = await prisma.ofertas.create({
        data: {
            titulo,
            descricao,
            nivel
        }
    });
    res.status(201).json(ofertas);
});

// Rota listar todas as ofertas ASSOCIAÇÃO (JOIN) com pessoas

app.get("/ofertas", async (req, res) => {
    try {
        const ofertas = await prisma.ofertas.findMany({
            include: {
                Pessoas: true,    // Nome exato que está no schema
                Categorias: true  // Se quiser incluir a categoria também
            }
        });
        res.status(200).json(ofertas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar ofertas", details: error.message });
    }
});


// Rota atualizar oferta
app.put("/ofertas/:id", async (req, res) => {
    const{ titulo, descricao, categoria } = req.body;
    const { id } = req.params;
    try {
        const ofertas = await prisma.ofertas.update({
            where: { oferta_ID: parseInt(id) },
            data: {
                titulo,
                descricao,
                categoria
            }
        });
        res.status(200).json(ofertas);
    } catch (error) {
         return response.status(500).send();
    }
});

// Rota deletar oferta
app.delete("/ofertas/:id", async (req, res) => {
    const { id } = req.params;
    try {        
        await prisma.ofertas.delete({
            where: { oferta_ID: parseInt(id) }
        });
        return response.status(204).send();
    } catch (error) {
        return response.status(500).send();
    }
});

//associacao cada oferta pertence a uma pessoa - ainda em teste 
app.post("/ofertas/:ofertaId/pessoas/:pessoaId", async (req, res) => {
    const { ofertaId, pessoaId } = req.params;
    try {
        const ofertaAtualizada = await prisma.ofertas.update({
            where: { oferta_ID: parseInt(ofertaId) },
            data: {
                id: parseInt(ofertaId),
                pessoa_ID: parseInt(pessoaId)

            }
        });
        res.status(200).json(ofertaAtualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao associar oferta à pessoa", details: error.message });
    }
});

app.patch("/ofertas/:ofertaId/vincular-pessoa", async (req, res) => {
    const { ofertaId } = req.params;
    const { pessoa_ID } = req.body; // ID da pessoa enviado no corpo da requisição

    try {
        const ofertaVinculada = await prisma.ofertas.update({
            where: { oferta_ID: Number(ofertaId) },
            data: {
                pessoa_ID: Number(pessoa_ID)
            },
            // Opcional: já retorna os dados da pessoa associada
            include: { Pessoas: true } 
        });

        res.status(200).json(ofertaVinculada);
    } catch (error) {
        res.status(500).json({ error: "Não foi possível realizar a associação." });
    }
});




//Rotas CRUD para pessoas
// Rota Cdastrar nova pessoa
app.post("/pessoas", async (req, res) => {
    try {
        const { nome_completo, email, telefone, descricao } = req.body;
        
        const pessoa = await prisma.pessoas.create({
            data: {
                nome_completo,
                email,
                telefone,
                descricao
            }
        });

        return res.status(201).json(pessoa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar registro no banco de dados." });
    }
});

// Rota listar todas as pessoas ASSOCIAÇÃO (JOIN) com ofertas
app.get("/pessoas", async (req, res) => {
    try {
        const pessoas = await prisma.pessoas.findMany({
            data: {
                nome_completo,
                email,
                telefone,
                descricao    
            }
        });
        res.status(200).json(pessoas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar pessoas", details: error.message });
    }
});


// Rota atualizar pessoa
app.put("/pessoas/:id", async (req, res) => {
    const { id } = req.params;
    const { nome_completo, email, telefone, descricao } = req.body;
    try {
        const pessoaAtualizada = await prisma.pessoas.update({
            where: { pessoa_ID: parseInt(id) },
            data: {
                nome_completo,
                email,
                telefone,
                descricao
            }
        });
        res.status(200).json(pessoaAtualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar pessoa", details: error.message });
    }
});

// Rota deletar pessoa
app.delete("/pessoas/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.pessoas.delete({
            where: { pessoa_ID: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar pessoa", details: error.message });
    }
});

//Rotas CRUD para Categorias
// Rota cadastrar nova categoria
// Rota de POST para Categorias --> nao esta rodando na requisacao no thunder client
app.post("/categorias", async (req, res) => {
    // Se enviar um único objeto: { "CatNome": "..." }
    const { CatNome } = req.body; 
    if (!CatNome) {
        return res.status(400).json({ error: "O campo CatNome é obrigatório" });
    }

    try {
        const novaCategoria = await prisma.categorias.create({
            data: {
                CatNome: CatNome
            }
        });
        res.status(201).json(novaCategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar categoria", details: error.message });
    }
});
//nao esta rodando na requisacao no thunder client
app.get("/categorias", async (req, res) => {
    console.log("Recebida requisição GET para /categorias");
    try {
        const categorias = await prisma.categorias.findMany();
        res.status(200).json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar categorias", details: error.message });
    }
});


// nao esta rodando na requisacao no thunder client
app.put("/categorias/:id", async (req, res) => {
    const { id } = req.params;
    const { CatNome } = req.body;

    try {
        const categoriaAtualizada = await prisma.categorias.update({
            where: { categoria_ID: parseInt(id) },
            data: {
                CatNome
            }
        });
        res.status(200).json(categoriaAtualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar categoria", details: error.message });
    }
});
//nao esta rodando na requisacao no thunder client
app.delete("/categorias/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.categorias.delete({
            where: { categoria_ID: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar categoria", details: error.message });
    }
});

//nao esta rodando na requisacao no thunder client
// filtrar ofertas por categoria -- nao ridando no get requisicao
app.get("/ofertas/categoria/:categoriaId", async (req, res) => {
    const { categoriaId } = req.params;
    try {
        const ofertas = await prisma.ofertas.findMany({
            where: { categoria_ID: parseInt(categoriaId) },
            include: {
                categorias: true
            }
        });
        res.status(200).json(ofertas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar ofertas por categoria", details: error.message });
    }
});



app.listen(8080, () => {
    console.log(`🚀 Servidor rodando em http://localhost:8080`);
});







