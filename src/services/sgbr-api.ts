import axios from "axios";
import { relatorios } from "./types";

const apiUrl = axios.create({
  baseURL: "https://sgbr-api.up.railway.app/",
  // baseURL: "http://localhost:8080",
});

const webhookUrlLeilao = 
  "https://discord.com/api/webhooks/1249441751090073631/UIcfj6GqPyyBcaKsW121Oy4S8nvpaQcbzL1_TNLgAjZW1ERd6MAKsCwtV0PhclaFxwHY"

const webhookUrlNormal =
  "https://discord.com/api/webhooks/1415031572314198046/-7ld3zlqLQkFNJMHmU7rdN-AfkgDsj1VcUljZ301hvJuENw37mD6I9jhj2Co9GAqMPwT";

  export const sendRelatorioToDiscordLeilao = async (relatorio: relatorios) => {
    const embed = {
      title: `📄 ${relatorio.categoria || ""}`,
      color: 5814783,
      fields: [
        { name: "👤 NOME", value: relatorio.cliente || "N/A", inline: true },
        { name: "💳 CPF", value: relatorio.cpf?.toString() || "N/A", inline: true },
        { name: "🚗 VEÍCULO", value: relatorio.veiculo || "N/A", inline: true },
        { name: "ESCAPE", value: relatorio.escape || "N/A", inline: true },
        { name: "🧑‍💼 BENEIRO", value: relatorio.created_by, inline: true },
        { name: "💰 LUCRO", value: `$ ${relatorio.lucro?.toLocaleString('en-US') || "0"}`, inline: true },
        { name: "💼 LEILÃO", value: relatorio.leilao ? "Sim" : "Não", inline: true },
        { name: "✨ XENOM", value: relatorio.xenom ? "Sim" : "Não", inline: true },
      ],
      timestamp: new Date().toISOString(),
    };
  
    await axios.post(webhookUrlLeilao, { embeds: [embed] });
  };

export const sendRelatorioToDiscord = async (relatorio: relatorios) => {
  const embed = {
    title: `📄 ${relatorio.categoria || ""}`,
    color: 5814783,
    fields: [
      { name: "👤 NOME", value: relatorio.cliente || "N/A", inline: true },
      { name: "💳 CPF", value: relatorio.cpf?.toString() || "N/A", inline: true },
      { name: "🚗 VEÍCULO", value: relatorio.veiculo || "N/A", inline: true },
      { name: "ESCAPE", value: relatorio.escape || "N/A", inline: true },
      { name: "🧑‍💼 BENEIRO", value: relatorio.created_by, inline: true },
      { name: "💰 LUCRO", value: `$ ${relatorio.lucro?.toLocaleString('en-US') || "0"}`, inline: true },
      { name: "💼 LEILÃO", value: relatorio.leilao ? "Sim" : "Não", inline: true },
      { name: "✨ XENOM", value: relatorio.xenom ? "Sim" : "Não", inline: true },
    ],
    timestamp: new Date().toISOString(),
  };

  await axios.post(webhookUrlNormal, { embeds: [embed] });
};

export function getBenneiros() {
  return apiUrl.get("/benneiros");
}

export function postRelatorios(Relatorios: relatorios) {
  return apiUrl.post("/relatorios", Relatorios);
}
