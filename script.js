/**
 * PROTOCOLO CIDADANIA DIGITAL & IA - ENGINE DE INTERATIVIDADE
 * Desenvolvido para index.html (Tailwind CSS + Chart.js)
 */

// Instância global do gráfico para controle de estados
let radarChart;

/**
 * Inicializa os componentes assim que o DOM estiver totalmente carregado
 */
document.addEventListener('DOMContentLoaded', () => {
    inicializarGrafico();
    configurarFiltrosIniciais();
});

/**
 * Configura e renderiza o Gráfico de Radar usando a biblioteca Chart.js
 */
function inicializarGrafico() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;

    radarChart = new Chart(ctx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['Dados/Privacidade', 'Combate a Vieses', 'Mídia/Fatos'],
            datasets: [{
                label: 'Índice de Consciência Atual',
                data: [20, 20, 20], // Valores base iniciais
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                borderColor: 'rgba(6, 182, 212, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(168, 85, 247, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(6, 182, 212, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
                    grid: { color: 'rgba(255, 255, 255, 0.08)' },
                    pointLabels: { 
                        color: '#94a3b8', 
                        font: { size: 11, family: 'JetBrains Mono' } 
                    },
                    ticks: { display: false, max: 100, min: 0, stepSize: 20 }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

/**
 * Atualiza dinamicamente o gráfico baseado nas checkboxes selecionadas
 */
function atualizarGrafico() {
    if (!radarChart) return;

    const checkboxes = document.querySelectorAll('#metricas-checklist input[type="checkbox"]');
    let novosValores = [20, 20, 20]; // Reset para valores padrão

    checkboxes.forEach((box) => {
        if (box.checked) {
            const index = parseInt(box.getAttribute('data-index'));
            novosValores[index] = 100; // Eleva a pontuação do eixo correspondente
        }
    });

    // Aplica os novos dados com animação nativa do Chart.js
    radarChart.data.datasets[0].data = novosValores;
    radarChart.update();
}

/**
 * Filtra os cards de diretrizes por categoria com efeito visual de transição
 * @param {string} categoria - A categoria selecionada (todos, privacidade, etica, seguranca)
 * @param {HTMLElement} botaoAtivo - O botão que disparou o evento de clique
 */
function filtrarCards(categoria, botaoAtivo) {
    const cards = document.querySelectorAll('.card-item');
    const botoes = document.querySelectorAll('.filter-btn');

    // 1. Atualiza os estados visuais dos botões de filtro
    botoes.forEach(btn => {
        btn.classList.remove('bg-cyan-500', 'text-slate-950');
        btn.classList.add('text-slate-400', 'hover:text-white');
    });

    // Se o botão foi passado diretamente pelo evento inline
    if (botaoAtivo) {
        botaoAtivo.classList.add('bg-cyan-500', 'text-slate-950');
        botaoAtivo.classList.remove('text-slate-400', 'hover:text-white');
    }

    // 2. Manipula a visibilidade dos cards com animação simples
    cards.forEach(card => {
        const cardCategoria = card.getAttribute('data-category');
        
        if (categoria === 'todos' || cardCategoria === categoria) {
            card.style.display = 'block';
            // Timeout garante que o display ocorra antes da transição de opacidade
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            card.style.display = 'none';
        }
    });
}

/**
 * Configurações adicionais para manter os seletores consistentes
 */
function configurarFiltrosIniciais() {
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}
