import axios from "axios";
import { relatorios } from "./types";

const apiUrl = axios.create({
  baseURL: "https://sgbr-api.up.railway.app/",
  // baseURL: "http://localhost:8080",
});

const webhookUrl =
  "https://discord.com/api/webhooks/1415031572314198046/-7ld3zlqLQkFNJMHmU7rdN-AfkgDsj1VcUljZ301hvJuENw37mD6I9jhj2Co9GAqMPwT";

export const sendRelatorioToDiscord = async (relatorio: relatorios) => {
  const embed = {
    title: `📄 ${relatorio.categoria || ""}`,
    color: 5814783,
    fields: [
      { name: "👤 CLIENTE", value: relatorio.cliente || "N/A", inline: true },
      {
        name: "💳 CPF",
        value: relatorio.cpf?.toString() || "N/A",
        inline: true,
      },
      { name: "🚗 VEÍCULO", value: relatorio.veiculo || "N/A", inline: true },
      { name: "🧑‍💼 BENEIRO", value: relatorio.created_by, inline: true },
      {
        name: "💰 LUCRO",
        value: relatorio.lucro?.toString() || "0",
        inline: true,
      },
      {
        name: "💼 LEILÃO",
        value: relatorio.leilao ? "Sim" : "Não",
        inline: true,
      },
    ],
    timestamp: new Date().toISOString(),
  };

  await axios.post(webhookUrl, { embeds: [embed] });
};

export function getBenneiros() {
  return apiUrl.get("/benneiros");
}

export function postRelatorios(Relatorios: relatorios) {
  return apiUrl.post("/relatorios", Relatorios);
}
