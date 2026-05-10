const express = require('express');
const path = require('path');
const Grafo = require('./funcoes');
const buscarTodosOsCaminhos = require('./bfs'); 
const dadosFilmes = require('./latest_movies.json');

const app = express();
const meuGrafo = new Grafo();
meuGrafo.seed(dadosFilmes);

app.use(express.static(path.join(__dirname, '../front-end')));

app.get('/api/buscar', (req, res) => {
    try {
        const { origem, destino, max8 } = req.query;
        
        const limite = max8 === 'true' ? 8 : 4;
        
        // O algoritmo DFS permanece o mesmo (pode manter o seu bfs.js intocado)
        const caminhos = buscarTodosOsCaminhos(meuGrafo, origem, destino, limite);

        if (caminhos) {
            // Ordena para que o caminho mais curto seja sempre o índice [0]
            caminhos.sort((a, b) => a.length - b.length);

            // Função para remover as tags de "FILME|ID|" e deixar só o título bonito para o utilizador ver
            const formatarNome = (nome) => nome.startsWith('FILME|') ? nome.split('|')[2] : nome;

            // Formata apenas o menor caminho que vai ser renderizado na interface
            const menorCaminhoLimpo = caminhos[0].map(formatarNome);

            res.json({ 
                caminho: menorCaminhoLimpo, 
                comprimento: menorCaminhoLimpo.length - 1,
                totalConexoes: caminhos.length // Agora as pontes falsas sumiram e deve cravar em 3830!
            });
        } else {
            res.status(404).json({ 
                erro: `Nenhuma conexão encontrada em até ${limite} graus.`
            });
        }
    } catch (erro) {
        console.error("❌ ERRO NO BACKEND:", erro);
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
});

app.get('/api/atores', (req, res) => {
    try {
        const atoresSet = new Set();
        dadosFilmes.forEach(filme => {
            filme.cast.forEach(ator => atoresSet.add(ator));
        });
        res.json(Array.from(atoresSet).sort());
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao carregar lista de atores." });
    }
});

app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));