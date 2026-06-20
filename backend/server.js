const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

const FRONTEND_PATH = path.join(__dirname, "../frontend");

app.use(cors());
app.use(express.static(FRONTEND_PATH));

// ===================================
// DADOS DAS MÁQUINAS
// ===================================

const maquinas = [
  { id: "M01", maquina: "CNC-01", setor: "Usinagem", status: "Operando", temperatura: 72, producaoHora: 180, energia: 450, oee: 92, eficiencia: 95, manutencao: "OK" },
  { id: "M02", maquina: "CNC-02", setor: "Usinagem", status: "Operando", temperatura: 68, producaoHora: 165, energia: 430, oee: 88, eficiencia: 91, manutencao: "OK" },
  { id: "M03", maquina: "Prensa-01", setor: "Estamparia", status: "Parada", temperatura: 35, producaoHora: 0, energia: 120, oee: 40, eficiencia: 45, manutencao: "Urgente" },
  { id: "M04", maquina: "Solda-01", setor: "Soldagem", status: "Operando", temperatura: 80, producaoHora: 210, energia: 510, oee: 90, eficiencia: 94, manutencao: "OK" },
  { id: "M05", maquina: "Torno-01", setor: "Usinagem", status: "Manutenção", temperatura: 40, producaoHora: 0, energia: 90, oee: 35, eficiencia: 40, manutencao: "Em andamento" },
  { id: "M06", maquina: "Montagem-01", setor: "Montagem", status: "Operando", temperatura: 55, producaoHora: 240, energia: 380, oee: 95, eficiencia: 97, manutencao: "OK" },
  { id: "M07", maquina: "Pintura-01", setor: "Pintura", status: "Operando", temperatura: 60, producaoHora: 190, energia: 320, oee: 89, eficiencia: 92, manutencao: "OK" },
  { id: "M08", maquina: "Laser-01", setor: "Corte", status: "Alerta", temperatura: 92, producaoHora: 140, energia: 600, oee: 72, eficiencia: 78, manutencao: "Preventiva" },
  { id: "M09", maquina: "Empacotadora-01", setor: "Expedição", status: "Operando", temperatura: 45, producaoHora: 280, energia: 250, oee: 97, eficiencia: 98, manutencao: "OK" },
  { id: "M10", maquina: "Robo-01", setor: "Automação", status: "Operando", temperatura: 70, producaoHora: 300, energia: 700, oee: 96, eficiencia: 99, manutencao: "OK" },
  { id: "M11", maquina: "Robo-02", setor: "Automação", status: "Operando", temperatura: 74, producaoHora: 290, energia: 690, oee: 94, eficiencia: 96, manutencao: "OK" },
  { id: "M12", maquina: "Fresa-01", setor: "Usinagem", status: "Alerta", temperatura: 89, producaoHora: 130, energia: 540, oee: 75, eficiencia: 80, manutencao: "Preventiva" },
  { id: "M13", maquina: "Prensa-02", setor: "Estamparia", status: "Operando", temperatura: 67, producaoHora: 175, energia: 410, oee: 87, eficiencia: 90, manutencao: "OK" },
  { id: "M14", maquina: "Solda-02", setor: "Soldagem", status: "Operando", temperatura: 77, producaoHora: 205, energia: 495, oee: 91, eficiencia: 93, manutencao: "OK" },
  { id: "M15", maquina: "Montagem-02", setor: "Montagem", status: "Operando", temperatura: 58, producaoHora: 250, energia: 390, oee: 93, eficiencia: 95, manutencao: "OK" }
];

// ===================================
// HISTÓRICO DE PRODUÇÃO
// ===================================

const historicoProducao = [
  { hora: "08h", producao: 1800 },
  { hora: "09h", producao: 1950 },
  { hora: "10h", producao: 2100 },
  { hora: "11h", producao: 2250 },
  { hora: "12h", producao: 1900 },
  { hora: "13h", producao: 2400 },
  { hora: "14h", producao: 2550 },
  { hora: "15h", producao: 2700 },
  { hora: "16h", producao: 2600 },
  { hora: "17h", producao: 2800 }
];

// ===================================
// HISTÓRICO DE ENERGIA
// ===================================

const historicoEnergia = [
  { hora: "08h", consumo: 4200 },
  { hora: "09h", consumo: 4350 },
  { hora: "10h", consumo: 4500 },
  { hora: "11h", consumo: 4700 },
  { hora: "12h", consumo: 4100 },
  { hora: "13h", consumo: 4900 },
  { hora: "14h", consumo: 5100 },
  { hora: "15h", consumo: 5200 },
  { hora: "16h", consumo: 5000 },
  { hora: "17h", consumo: 5400 }
];

// ===================================
// ALERTAS
// ===================================

const alertas = [
  {
    maquina: "Laser-01",
    tipo: "Temperatura Elevada",
    prioridade: "Alta"
  },
  {
    maquina: "Prensa-01",
    tipo: "Parada Não Planejada",
    prioridade: "Crítica"
  },
  {
    maquina: "Fresa-01",
    tipo: "Troca de Ferramenta",
    prioridade: "Média"
  },
  {
    maquina: "Torno-01",
    tipo: "Manutenção Corretiva",
    prioridade: "Alta"
  }
];

// ===================================
// KPIs
// ===================================

app.get("/api/kpis", (req, res) => {
  const ativas = maquinas.filter(m => m.status === "Operando").length;
  const alerta = maquinas.filter(m => m.status === "Alerta").length;
  const manutencao = maquinas.filter(m => m.status === "Manutenção").length;
  const paradas = maquinas.filter(m => m.status === "Parada").length;

  const producaoTotal = maquinas.reduce(
    (acc, m) => acc + m.producaoHora,
    0
  );

  const energiaTotal = maquinas.reduce(
    (acc, m) => acc + m.energia,
    0
  );

  const oeeMedio = (
    maquinas.reduce((acc, m) => acc + m.oee, 0) /
    maquinas.length
  ).toFixed(1);

  const eficienciaMedia = (
    maquinas.reduce((acc, m) => acc + m.eficiencia, 0) /
    maquinas.length
  ).toFixed(1);

  res.json({
    ativas,
    alerta,
    manutencao,
    paradas,
    producaoTotal,
    energiaTotal,
    oeeMedio,
    eficienciaMedia
  });
});

// ===================================
// ROTAS DA API
// ===================================

app.get("/api/maquinas", (req, res) => {
  res.json(maquinas);
});

app.get("/api/producao", (req, res) => {
  res.json(historicoProducao);
});

app.get("/api/energia", (req, res) => {
  res.json(historicoEnergia);
});

app.get("/api/alertas", (req, res) => {
  res.json(alertas);
});

// ===================================
// DASHBOARD
// ===================================

app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

// ===================================
// SERVIDOR
// ===================================

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 InduDash iniciado com sucesso");
  console.log(`🌐 Dashboard: http://localhost:${PORT}`);
  console.log("=================================");
});