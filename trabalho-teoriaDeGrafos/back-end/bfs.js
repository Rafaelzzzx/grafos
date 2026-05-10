function buscarTodosOsCaminhos(grafo, origem, destino, limiteArestas = 8) {
    if (!grafo.adjacencia.has(origem) || !grafo.adjacencia.has(destino)) return null;

    let todosOsCaminhos = [];
    
    // Algoritmo DFS (Busca em Profundidade) com Backtracking
    // Gasta pouquíssima memória em comparação ao BFS para encontrar TODAS as rotas
    function dfs(verticeAtual, caminhoAtual) {
        if (verticeAtual === destino) {
            // Se chegou no Tom Holland, salva esta rota específica
            todosOsCaminhos.push([...caminhoAtual]);
            return;
        }

        // Limite da "Busca Máx 8": Se bater em 8 arestas, para de procurar por aqui
        if (caminhoAtual.length - 1 >= limiteArestas) {
            return;
        }

        // Explora os vizinhos do ator/filme atual
        for (let vizinho of grafo.adjacencia.get(verticeAtual)) {
            // Apenas adiciona se o vizinho ainda não faz parte DESTA rota (evita andar em círculos)
            if (!caminhoAtual.includes(vizinho)) {
                caminhoAtual.push(vizinho);
                dfs(vizinho, caminhoAtual);
                caminhoAtual.pop(); // Backtrack: desfaz o último passo para tentar um novo caminho
            }
        }
    }

    // Inicia a busca a partir da Zendaya
    dfs(origem, [origem]);

    return todosOsCaminhos.length > 0 ? todosOsCaminhos : null;
}

module.exports = buscarTodosOsCaminhos;