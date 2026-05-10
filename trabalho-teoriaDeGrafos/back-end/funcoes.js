class Grafo {
    constructor() {
        this.adjacencia = new Map();
    }

    adicionarVertice(v) {
        if (!this.adjacencia.has(v)) {
            this.adjacencia.set(v, new Set());
        }
    }

    adicionarAresta(v1, v2) {
        this.adicionarVertice(v1);
        this.adicionarVertice(v2);
        this.adjacencia.get(v1).add(v2);
        this.adjacencia.get(v2).add(v1);
    }

    obterEstatisticas() {
        let totalArestas = 0;
        for (let vizinhos of this.adjacencia.values()) {
            totalArestas += vizinhos.size;
        }
        return {
            totalVertices: this.adjacencia.size,
            totalArestas: totalArestas / 2
        };
    }

    seed(dados) {
        dados.forEach(filme => {
            // AQUI ESTÁ A MÁGICA: Usamos o ID do filme junto com o título para garantir que filmes com o mesmo nome não se misturem!
            const idFilme = `FILME|${filme.id}|${filme.title}`;
            
            filme.cast.forEach(ator => {
                this.adicionarAresta(idFilme, ator);
            });
        });
    }
}

module.exports = Grafo;