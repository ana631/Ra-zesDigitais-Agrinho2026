// ==========================================================================
// 1. BANCO DE DADOS DOS PRODUTOS (Cenoura e Melancia Invertidas)
// ==========================================================================
const bancoDeDados = {
    "morango-organico": {
        produto: "Morango Orgânico Especial 🍓",
        produtor: "Seu João",
        localidade: "Sítio Esperança - Candói/PR",
        plantio: "10/05/2026",
        colheita: "22/06/2026",
        validade: "Natural: em até 7 dias. Congelado: em até 12 meses a partir da colheita.",
        sustentabilidade: "Cultivado sem agrotóxicos ou fertilizantes químicos. Estufas suspensas e polinização natural.",
        foto: "morango.png" 
    },
    "cenoura-organica": { 
        produto: "Cenoura Orgânica Saudável 🥕",
        produtor: "Dona Sofia",
        localidade: "Comunidade Rio Novo - Candói/PR",
        plantio: "05/01/2026",
        colheita: "30/05/2026",
        validade: "Na geladeira: 1 a 2 semanas num pote fechado.",
        sustentabilidade: "Solo nutrido exclusivamente com adubação verde e composto orgânico local.",
        foto: "cenoura.jpg" 
    },
    "tomate-cereja": {
        produto: "Tomate Cereja Orgânico 🍅",
        produtor: "Dona Joana",
        localidade: "Chácara Bom Viver - Candói/PR",
        plantio: "12/03/2026",
        colheita: "12/06/2026",
        validade: "Temperatura ambiente: 3 a 7 dias. Na geladeira: 10 a 14 dias.",
        sustentabilidade: "Manejo biológico e sem agrotóxicos, preservando os polinizadores locais.",
        foto: "tomate.png" 
    },
    "uva-organica": {
        produto: "Uva Orgânica Fresca 🍇",
        produtor: "Seu Márcio",
        localidade: "Comunidade Matas Do Cavernoso - Candói/PR",
        plantio: "02/02/2026",
        colheita: "09/06/2026",
        validade: "Na geladeira: 1 a 2 semanas. Temperatura ambiente: 1 a 3 dias.",
        sustentabilidade: "Produzida de forma artesanal com foco na agricultura familiar e biofertilizantes.",
        foto: "uva.png" 
    },
    "alface-hidroponica": {
        produto: "Alface Hidropônica Crocante 🥬",
        produtor: "Seu Luciano",
        localidade: "Sítio Boa Vista (Comunidade da Paz) - Candói/PR",
        plantio: "15/04/2026",
        colheita: "03/06/2026",
        validade: "Na geladeira com as raízes úmidas: até 7 a 10 dias.",
        sustentabilidade: "Cultivada na água via hidroponia, reduzindo o consumo de recursos hídricos em até 90%.",
        foto: "alface.png" 
    },
    "beterraba-organica": {
        produto: "Beterraba Orgânica de Quintal 🍠",
        produtor: "Dona Vanda",
        localidade: "Bairro Jardim Farah II - Candói/PR",
        plantio: "04/03/2026",
        colheita: "08/06/2026",
        validade: "Crua e inteira: até 7 dias em local fresco ou 15 dias na geladeira.",
        sustentabilidade: "Agricultura urbana de quintal aproveitando adubação orgânica doméstica.",
        foto: "beterraba.jpg" 
    },
    "melancia-organica": { 
        produto: "Melancia Orgânica Doce 🍉",
        produtor: "Seu Dirceu",
        localidade: "Sítio Rio Bonito - Candói/PR",
        plantio: "15/03/2026",
        colheita: "06/06/2026",
        validade: "Inteira: 7 a 10 dias em temp. ambiente. Cortada: 3 a 5 dias na geladeira.",
        sustentabilidade: "Cultivada de forma 100% orgânica com rotação de culturas para manter o solo rico e saudável.",
        foto: "melancia.png" 
    }
};

let html5QrcodeScanner;

// ==========================================================================
// 2. LÓGICA DO ESCANEADOR (ON SCAN SUCCESS)
// ==========================================================================
function onScanSuccess(decodedText) {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.clear();
    }

    const codigoLimpo = decodedText.trim().toLowerCase();
    const produtoEncontrado = bancoDeDados[codigoLimpo];

    if (produtoEncontrado) {
        document.getElementById("welcome-section").classList.add("hidden");
        document.getElementById("produtores").classList.add("hidden");
        document.getElementById("scanner-section").classList.add("hidden");
        document.getElementById("jogo-section").classList.add("hidden");
        
        const resultSection = document.getElementById("result-section");
        resultSection.classList.remove("hidden");

        document.getElementById("prod-nome-produto").innerText = produtoEncontrado.produto;
        document.getElementById("prod-autor").innerText = produtoEncontrado.produtor;
        document.getElementById("prod-local").innerText = produtoEncontrado.localidade;
        document.getElementById("prod-colheita").innerText = produtoEncontrado.colheita;
        document.getElementById("prod-sustentavel").innerText = produtoEncontrado.sustentabilidade;

        const antigoPlantio = document.getElementById("prod-plantio-row");
        const antigaValidade = document.getElementById("prod-validade-row");
        if (antigoPlantio) antigoPlantio.remove();
        if (antigaValidade) antigaValidade.remove();

        const infoGroup = document.querySelector(".info-group");
        if (infoGroup) {
            infoGroup.innerHTML += `<p id="prod-plantio-row" class="info-item"><strong>🌱 Plantio:</strong> <span id="prod-plantio">${produtoEncontrado.plantio}</span></p>`;
            infoGroup.innerHTML += `<p id="prod-validade-row" class="info-item"><strong>⏳ Validade:</strong> <span id="prod-validade">${produtoEncontrado.validade}</span></p>`;
        }

        setTimeout(() => {
            const imagemElemento = document.getElementById("prod-foto");
            if (imagemElemento) {
                imagemElemento.src = produtoEncontrado.foto;

                // SEUS SELETORES ATUALIZADOS DO PINTEREST AQUI:
                imagemElemento.onerror = function() {
                    if (codigoLimpo === "cenoura-organica") {
                        imagemElemento.src = "https://i.pinimg.com/1200x/19/b0/bd/19b0bd6c4b9ada997b194bcaba342d54.jpg";
                    } else if (codigoLimpo === "morango-organico") {
                        imagemElemento.src = "https://i.pinimg.com/736x/fe/e6/49/fee649065464397631b92aec30713881.jpg";
                    } else if (codigoLimpo === "tomate-cereja") {
                        imagemElemento.src = "https://i.pinimg.com/736x/eb/5d/b3/eb5db30114241395f00ea3958f0b2824.jpg";
                    } else if (codigoLimpo === "uva-organica") {
                        imagemElemento.src = "https://i.pinimg.com/736x/99/df/6c/99df6cd730d9995099e4eb52ada5bdf7.jpg";
                    } else if (codigoLimpo === "alface-hidroponica") {
                        imagemElemento.src = "https://i.pinimg.com/736x/67/63/dc/6763dc6dd05123b56e6e426e845b115a.jpg";
                    } else if (codigoLimpo === "beterraba-organica") {
                        imagemElemento.src = "https://i.pinimg.com/1200x/de/42/19/de4219a92aa971be7d16758b1257da02.jpg";
                    } else if (codigoLimpo === "melancia-organica") {
                        imagemElemento.src = "https://i.pinimg.com/1200x/24/ef/1b/24ef1bfb680fa76867f669adf8de003a.jpg";
                    }
                };
            }
        }, 50);

    } else {
        alert("Erro! Código não cadastrado.");
        location.reload();
    }
}

// ==========================================================================
// 3. MOTOR DO JOGUINHO DA COLHEITA
// ==========================================================================
function inicializarJogo() {
    const canvas = document.getElementById("game-canvas");
    const basket = document.getElementById("game-basket");
    const scoreVal = document.getElementById("score-val");
    
    let score = 0;
    let basketX = 180;
    const basketWidth = 40;
    let jogoAtivo = true;

    const frutas = ["🍓", "🍉", "🍅", "🍇", "🥬", "🥕"];
    const agrotoxico = "☣️";

    scoreVal.innerText = score;

    function encerrarJogo(mensagem) {
        jogoAtivo = false;
        
        const itensRestantes = canvas.querySelectorAll(".falling-item");
        itensRestantes.forEach(item => item.remove());

        const avisoOverlay = document.createElement("div");
        avisoOverlay.style.position = "absolute";
        avisoOverlay.style.top = "0";
        avisoOverlay.style.left = "0";
        avisoOverlay.style.width = "100%";
        avisoOverlay.style.height = "100%";
        avisoOverlay.style.backgroundColor = "rgba(26, 62, 33, 0.95)";
        avisoOverlay.style.color = "#FFFFFF";
        avisoOverlay.style.display = "flex";
        avisoOverlay.style.flexDirection = "column";
        avisoOverlay.style.justifyContent = "center";
        avisoOverlay.style.alignItems = "center";
        avisoOverlay.style.padding = "20px";
        avisoOverlay.style.boxSizing = "border-box";
        avisoOverlay.style.zIndex = "100";
        avisoOverlay.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
        avisoOverlay.style.textAlign = "center";

        avisoOverlay.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px; line-height: 1.4;">${mensagem}</div>
            <button id="btn-restart-game" style="background: #B2E183; color: #1A301F; border: none; padding: 10px 24px; font-size: 14px; font-weight: bold; border-radius: 20px; cursor: pointer; text-transform: uppercase;">Jogar Novamente</button>
        `;

        canvas.appendChild(avisoOverlay);

        document.getElementById("btn-restart-game").addEventListener("click", () => {
            avisoOverlay.remove();
            score = 0;
            scoreVal.innerText = score;
            jogoAtivo = true;
        });
    }

    canvas.addEventListener("mousemove", (e) => {
        if (!jogoAtivo) return;
        const rect = canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        
        basketX = mouseX - (basketWidth / 2);
        if (basketX < 0) basketX = 0;
        if (basketX > (rect.width - basketWidth)) basketX = rect.width - basketWidth;
        
        basket.style.left = basketX + "px";
    });

    canvas.addEventListener("touchmove", (e) => {
        if (!jogoAtivo) return;
        const rect = canvas.getBoundingClientRect();
        let touchX = e.touches[0].clientX - rect.left;
        
        basketX = touchX - (basketWidth / 2);
        if (basketX < 0) basketX = 0;
        if (basketX > (rect.width - basketWidth)) basketX = rect.width - basketWidth;
        
        basket.style.left = basketX + "px";
        e.preventDefault();
    }, { passive: false });

    // Loop de criação dos itens (CORRIGIDO: Removido erro do 'jogoAtActive')
    setInterval(() => {
        if (!jogoAtivo || document.getElementById("jogo-section").classList.contains("hidden")) return;

        const rect = canvas.getBoundingClientRect();
        const item = document.createElement("div");
        item.className = "falling-item";
        
        const tipoSorteio = Math.random();
        let ehAgrotoxico = false;

        if (tipoSorteio < 0.25) {
            item.innerText = agrotoxico;
            ehAgrotoxico = true;
        } else {
            item.innerText = frutas[Math.floor(Math.random() * frutas.length)];
        }

        item.style.left = Math.floor(Math.random() * (rect.width - 30)) + "px";
        item.style.top = "0px";
        canvas.appendChild(item);

        let itemY = 0;
        const fallInterval = setInterval(() => {
            if (!jogoAtivo) {
                item.remove();
                clearInterval(fallInterval);
                return;
            }

            itemY += 5;
            item.style.top = itemY + "px";

            if (itemY >= 310 && itemY <= 340) {
                let itemX = parseInt(item.style.left);
                if (itemX >= (basketX - 25) && itemX <= (basketX + basketWidth)) {
                    
                    item.remove();
                    clearInterval(fallInterval);

                    if (ehAgrotoxico) {
                        encerrarJogo("⚠️ Você foi intoxicado!<br>Evite alimentos com agrotóxicos.");
                    } else {
                        score += 10;
                        scoreVal.innerText = score;

                        if (score >= 300) {
                            encerrarJogo("🎉 Você ganhou!<br>Parabéns por colher alimentos saudáveis!");
                        }
                    }
                }
            }

            if (itemY > 350) {
                item.remove();
                clearInterval(fallInterval);

                if (!ehAgrotoxico && jogoAtivo) {
                    encerrarJogo("😢 Você perdeu!<br>Não podemos deixar alimentos orgânicos caírem.");
                }
            }
        }, 30);

    }, 1200);
}

// ==========================================================================
// 4. INICIALIZAÇÃO GERAL (DOM CONTENT LOADED)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("btn-enter-app").addEventListener("click", () => {
        document.getElementById("welcome-section").classList.add("hidden");
        document.getElementById("produtores").classList.add("hidden");
        document.getElementById("jogo-section").classList.add("hidden");
        document.getElementById("scanner-section").classList.remove("hidden");
        
        html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 15, qrbox: 180, aspectRatio: 1.0 });
        html5QrcodeScanner.render(onScanSuccess);
    });

    const footer = document.querySelector(".main-footer p");
    if (footer) {
        footer.innerHTML = `Projeto Agrinho 2026 • <span id="secret-trigger" style="cursor: default; user-select: none;">Candói - Paraná</span>`;
        document.getElementById("secret-trigger").addEventListener("click", () => {
            onScanSuccess("melancia-organica");
        });
    }

    document.getElementById("btn-scan-again").addEventListener("click", () => {
        location.reload();
    });

    document.getElementById("btn-contrast").addEventListener("click", () => { 
        document.body.classList.toggle("high-contrast"); 
    });
    
    let fontScale = 16;
    const htmlEl = document.documentElement;
    document.getElementById("btn-font-increase").addEventListener("click", () => {
        if (fontScale < 24) { fontScale += 2; htmlEl.style.fontSize = fontScale + "px"; }
    });
    document.getElementById("btn-font-decrease").addEventListener("click", () => {
        if (fontScale > 12) { fontScale -= 2; htmlEl.style.fontSize = fontScale + "px"; }
    });

    inicializarJogo();
});
