async function carregarKPIs() {
    try {

        const resposta = await fetch("/api/kpis");
        const dados = await resposta.json();

        document.getElementById("ativas").textContent =
            dados.ativas;

        document.getElementById("alerta").textContent =
            dados.alerta;

        document.getElementById("manutencao").textContent =
            dados.manutencao;

        document.getElementById("paradas").textContent =
            dados.paradas;

        document.getElementById("producaoTotal").textContent =
            `${dados.producaoTotal} pç/h`;

        document.getElementById("energiaTotal").textContent =
            `${dados.energiaTotal} kWh`;

        document.getElementById("oeeMedio").textContent =
            `${dados.oeeMedio}%`;

        document.getElementById("eficienciaMedia").textContent =
            `${dados.eficienciaMedia}%`;

    } catch (erro) {

        console.error("Erro ao carregar KPIs:", erro);

    }
}

carregarKPIs();

// Atualiza automaticamente a cada 30 segundos
setInterval(carregarKPIs, 30000);