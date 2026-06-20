fetch("http://localhost:3000/api/maquinas")
.then(res => res.json())
.then(dados => {

    const operando =
        dados.filter(item =>
            item.status === "Operando"
        ).length;

    const alerta =
        dados.filter(item =>
            item.status === "Alerta"
        ).length;

    const manutencao =
        dados.filter(item =>
            item.status === "Manutenção"
        ).length;

    const parada =
        dados.filter(item =>
            item.status === "Parada"
        ).length;

    const ctx =
        document.getElementById("statusChart")
        .getContext("2d");

    new Chart(ctx, {
        type: "doughnut",

        data: {
            labels: [
                "Operando",
                "Alerta",
                "Manutenção",
                "Parada"
            ],

            datasets: [{
                data: [
                    operando,
                    alerta,
                    manutencao,
                    parada
                ],

                backgroundColor: [
                    "#198754", // Verde
                    "#FFC107", // Amarelo
                    "#0D6EFD", // Azul
                    "#DC3545"  // Vermelho
                ]
            }]
        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });

})
.catch(err => {
    console.error("Erro ao carregar chart3:", err);
});