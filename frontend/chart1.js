async function carregarGraficoProducao() {
    try {

        const resposta = await fetch("/api/producao");
        const dados = await resposta.json();

        const horas = dados.map(item => item.hora);
        const producao = dados.map(item => item.producao);

        const ctx = document
            .getElementById("producaoChart")
            .getContext("2d");

        new Chart(ctx, {
            type: "line",

            data: {
                labels: horas,

                datasets: [{
                    label: "Peças Produzidas",
                    data: producao,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },

            options: {
                responsive: true,

                plugins: {
                    legend: {
                        labels: {
                            color: "#ffffff"
                        }
                    }
                },

                scales: {
                    x: {
                        ticks: {
                            color: "#ffffff"
                        },
                        grid: {
                            color: "#334155"
                        }
                    },

                    y: {
                        beginAtZero: true,

                        ticks: {
                            color: "#ffffff"
                        },

                        grid: {
                            color: "#334155"
                        }
                    }
                }
            }
        });

    } catch (erro) {

        console.error(
            "Erro ao carregar gráfico de produção:",
            erro
        );

    }
}

carregarGraficoProducao();