async function carregarGraficoEnergia() {
    try {

        const resposta = await fetch("/api/energia");
        const dados = await resposta.json();

        const horas = dados.map(item => item.hora);
        const consumo = dados.map(item => item.consumo);

        const ctx = document
            .getElementById("energiaChart")
            .getContext("2d");

        new Chart(ctx, {
            type: "bar",

            data: {
                labels: horas,

                datasets: [{
                    label: "Consumo de Energia (kWh)",
                    data: consumo,
                    borderWidth: 1
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
            "Erro ao carregar gráfico de energia:",
            erro
        );

    }
}

carregarGraficoEnergia();