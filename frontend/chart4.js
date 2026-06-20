async function carregarOEE() {
    try {

        const response = await fetch("/api/maquinas");
        const dados = await response.json();

        const labels = dados.map(item => item.maquina);
        const valores = dados.map(item => item.oee);

        const ctx = document
            .getElementById("oeeChart")
            .getContext("2d");

        new Chart(ctx, {
            type: "bar",

            data: {
                labels,
                datasets: [{
                    label: "OEE (%)",
                    data: valores,

                    backgroundColor: [
                        "#0D6EFD",
                        "#0DCF97",
                        "#FFB700",
                        "#FF6B6B",
                        "#9C5FFF",
                        "#0D6EFD",
                        "#0DCF97",
                        "#FFB700",
                        "#FF6B6B",
                        "#9C5FFF",
                        "#0D6EFD",
                        "#0DCF97",
                        "#FFB700",
                        "#FF6B6B",
                        "#9C5FFF"
                    ],

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
                        max: 100,

                        ticks: {
                            color: "#ffffff",
                            callback: value => value + "%"
                        },

                        grid: {
                            color: "#334155"
                        }
                    }
                }
            }
        });

    } catch (err) {

        console.error(
            "Erro ao carregar gráfico de OEE:",
            err
        );

    }
}

carregarOEE();