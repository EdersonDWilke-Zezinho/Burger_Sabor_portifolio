document.addEventListener("DOMContentLoaded", function () {
    const produtos = [
        { id: 1, nome: "Hambúrguer Clássico", preco: 25, imagem: "https://img.freepik.com/fotos-premium/humburger_157766-32.jpg", categoria: "hamburguer" },
        { id: 2, nome: "Cheddar Bacon", preco: 30, imagem: "https://img.freepik.com/fotos-premium/humburger_157766-32.jpg", categoria: "hamburguer" },
        { id: 3, nome: "Coca-Cola", preco: 8, imagem: "https://cdn.oantagonista.com/uploads/2024/10/Coca-Cola_1729950505807-1024x576.jpg", categoria: "bebida" },
        { id: 4, nome: "Milkshake", preco: 15, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUje4r83bWqfHuxngcVLLS563rJWoc7nBclg&s", categoria: "sobremesa" },
        { id: 5, nome: "Combo Duplo", preco: 40, imagem: "https://www.cidadeoferta.com.br/storage/offers/7659-taura-combo-classico-2.jpg", categoria: "combo" },
        { id: 6, nome: "Oferta X-Tudo", preco: 20, imagem: "https://media-cdn.tripadvisor.com/media/photo-m/1280/16/85/f2/db/xtudo-duplo.jpg", categoria: "oferta" }
    ];

    let carrinho = {};

    function filtrar(categoria) {
        const conteiner = document.getElementById("lista-produtos");
        conteiner.innerHTML = "";

        const produtosFiltrados = categoria === 'todos' ? produtos : produtos.filter(p => p.categoria === categoria);

        produtosFiltrados.forEach(produto => {
            const card = document.createElement("div");
            card.classList.add("produto");
            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" width="150">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco},00</p>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
            `;
            conteiner.appendChild(card);
        });
    }

    function adicionarAoCarrinho(id) {
        const produto = produtos.find(p => p.id === id);
        if (!carrinho[id]) {
            carrinho[id] = { ...produto, quantidade: 1 };
        } else {
            carrinho[id].quantidade += 1;
        }
        alert(`"${produto.nome}" adicionado ao pedido!`);
        exibirCarrinho();
    }
    function exibirCarrinho() {
        const containerCarrinho = document.getElementById('carrinho');
        containerCarrinho.innerHTML = ""; // Limpa antes de mostrar atualizado
    
        const itens = Object.values(carrinho);
    
        if (itens.length === 0) {
            containerCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
            return;
        }
    
        itens.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            const linha = document.createElement('div');
            linha.classList.add('item-carrinho');
    
            linha.innerHTML = `
                <p><strong>${item.nome}</strong> (x${item.quantidade}) - R$ ${subtotal},00</p>
                <button onclick="removerDoCarrinho(${item.id})">Remover</button>
            `;
    
            containerCarrinho.appendChild(linha);
        });
    }
    function enviarPedido() {
        const itens = Object.values(carrinho);
      
        if (itens.length === 0) {
          alert("Seu carrinho está vazio!");
          return;
        }
      
        let mensagem = "Olá! Quero fazer um pedido:%0A%0A";
        let total = 0;
      
        itens.forEach(item => {
          const subtotal = item.preco * item.quantidade;
          mensagem += `• ${item.nome} (ID: ${item.id}, x${item.quantidade}) - R$ ${subtotal},00%0A`;
          total += subtotal;
        });
      
        mensagem += `%0ATotal: R$ ${total},00`;
      
        const numeroZap = "5569992787538";
        const linkZap = `https://wa.me/${numeroZap}?text=${mensagem}`;
        window.open(linkZap, "_blank");
      }
      

    // Deixa as funções acessíveis no HTML
    window.filtrar = filtrar;
    window.adicionarAoCarrinho = adicionarAoCarrinho;
    window.enviarPedido = enviarPedido;

    // Carrega os produtos ao iniciar
    filtrar('todos');

    function removerDoCarrinho(id) {
        if (carrinho[id]) {
            carrinho[id].quantidade -= 1;
            if (carrinho[id].quantidade <= 0) {
                delete carrinho[id];
            }
            alert(`Item removido do carrinho.`);
        }
    }


});

function limparCarrinho() {
    carrinho = {};
    alert("Carrinho limpo!");
    filtrar('todos');
}
function enviarzap(event) {
    //event.preventDefaut()

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    const meutelefone = '5569992787538'

    const texto =  `Olá, me chamo ${nome}! O meu e-mail é: ${email} A Minha mensagem de contato é: ${mensagem}`;
    const msgformatada = encodeURIComponent(texto)

    const url = `https://api.whatsapp.com/send?phone=${meutelefone}&text=${msgformatada}`
    console.log(texto)
    console.log(msgformatada)
    window.open(url, '_blank')
}