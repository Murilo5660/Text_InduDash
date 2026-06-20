async function carregarTabelaAlertas() {
    try {

        const response = await fetch("/api/alertas");
        const alertas = await response.json();

        const tbody = document.getElementById("tabela-alertas");

        tbody.innerHTML = "";

        alertas.forEach(alerta => {

            let classePrioridade = "";

            switch (alerta.prioridade.toLowerCase()) {
                case "alta":
                    classePrioridade = "alta";
                    break;

                case "crítica":
                case "critica":
                    classePrioridade = "critica";
                    break;

                case "média":
                case "media":
                    classePrioridade = "media";
                    break;

                default:
                    classePrioridade = "";
            }

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${alerta.maquina}</td>
                <td>${alerta.tipo}</td>
                <td class="${classePrioridade}">
                    ${alerta.prioridade}
                </td>
            `;

            tbody.appendChild(linha);

        });

    } catch (error) {

        console.error(
            "Erro ao carregar alertas:",
            error
        );

    }
}

carregarTabelaAlertas();

// Atualiza a cada 30 segundos
setInterval(carregarTabelaAlertas, 30000);