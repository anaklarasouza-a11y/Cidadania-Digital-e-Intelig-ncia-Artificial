/**
 * PROTOCOLO CIDADANIA DIGITAL & IA - ENGINE DE INTERATIVIDADE
 * Código adaptado para funcionar nativamente com o index.html anterior
 */

// Instância global do gráfico
let radarChart;

// Inicialização automatizada assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    inicializarGrafico();
    configurarAnimacoesCards();
});

/**
 * Configura e renderiza o Gráfico de Radar usando Chart.js
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
                data: [20, 20, 20],
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
 * Função global chamada pelas checkboxes no HTML (onchange="atualizarGrafico()")
 */
window.atualizarGrafico = function() {
    if (!radarChart) return;

    const checkboxes = document.querySelectorAll('#metricas-checklist input[type="checkbox"]');
    let novosValores = [20, 20, 20];

    checkboxes.forEach((box) => {
        if (box.checked) {
            const index = parseInt(box.getAttribute('data-index'));
            if (!isNaN(index)) {
                novosValores[index] = 100;
            }
        }
    });

    radarChart.data.datasets[0].data = novosValores;
    radarChart.update();
};

/**
 * Função global chamada pelos botões no HTML (onclick="filtrarCards('categoria')")
 */
window.filtrarCards = function(categoria) {
    const cards = document.querySelectorAll('.card-item');
    const botoes = document.querySelectorAll('.filter-btn');

    // Identifica e atualiza o botão ativo capturando o evento global do clique
    if (window.event && window.event.currentTarget) {
        const botaoAtivo = window.event.currentTarget;
        botoes.forEach(btn => {
            btn.classList.remove('bg-cyan-500', 'text-slate-950');
            btn.classList.add('text-slate-400', 'hover:text-white');
        });
        botaoAtivo.classList.add('bg-cyan-500', 'text-slate-950');
        botaoAtivo.classList.remove('text-slate-400', 'hover:text-white');
    }

    // Gerencia a exibição e efeito visual dos cards
    cards.forEach(card => {
        const cardCategoria = card.getAttribute('data-category');
        
        if (categoria === 'todos' || cardCategoria === categoria) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            // Aguarda o fim da transição para ocultar o elemento completamente do layout
            setTimeout(() => {
                if (card.style.opacity === '0') card.style.display = 'none';
            }, 300);
        }
    });
};

/**
 * Injeta propriedades de transição CSS nos cards via JS
 */
function configurarAnimacoesCards() {
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}
