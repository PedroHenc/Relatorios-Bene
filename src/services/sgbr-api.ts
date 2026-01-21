import axios from "axios";
import { relatorios } from "./types";

const apiUrl = axios.create({
  baseURL: "https://sgbr-api.up.railway.app/",
  // baseURL: "http://localhost:8080",
});

const webhookUrlNormal =
  "https://discord.com/api/webhooks/1249441572314198046/r-T9zW-1bN-7vX-5hYd-P5D-hK-Yj-4gW-2lF_qgE5m";

const webhookUrlNitro =
  "https://discord.com/api/webhooks/1249441865361068032/qgE5m_1-DFcW_5h5Yd-P5D-hK-Yj-4gW-2lF-1bN-9zX-7vW";

const webhookUrlRessarcimento =
  "https://discord.com/api/webhooks/1249441951590383727/aB-1c_D2-eF3-gH4-iJ5-kL6-mN7-oP8-qR9-sT0";

export const sendRessarcimentoToDiscord = async (relatorio: relatorios) => {
  const embed = {
    title: `🧾 Relatório de Ressarcimento`,
    color: 16776960, // yellow
    fields: [
      { name: "👤 NOME", value: relatorio.cliente || "N/A", inline: true },
      {
        name: "💰 VALOR",
        value: `$ ${relatorio.lucro?.toLocaleString("en-US") || "0"}`,
        inline: true,
      },
      { name: "🧑‍💼 BENEIRO", value: relatorio.created_by, inline: true },
      { name: "📜 MOTIVO", value: relatorio.motivo || "N/A", inline: false },
    ],
    timestamp: new Date().toISOString(),
  };

  await axios.post(webhookUrlRessarcimento, { embeds: [embed] });
};

export const sendNitroRelatorioToDiscord = async (relatorio: relatorios) => {
  const embed = {
    title: `⛽ Relatório de Nitro`,
    color: 16727040,
    fields: [
      { name: "👤 NOME", value: relatorio.cliente || "N/A", inline: true },
      {
        name: "🔩 KIT NITRO",
        value: relatorio.kit_nitro || "N/A",
        inline: true,
      },
      {
        name: "💧 NITRO (Litros)",
        value: relatorio.nitro?.toString() || "0",
        inline: true,
      },
      { name: "🧑‍💼 BENEIRO", value: relatorio.created_by, inline: true },
    ],
    timestamp: new Date().toISOString(),
  };

  await axios.post(webhookUrlNitro, { embeds: [embed] });
};

export const sendRelatorioToDiscordLeilao = async (relatorio: relatorios) => {
  const embed = {
    title: `📄 ${relatorio.categoria || ""}`,
    color: 5814783,
    fields: [
      { name: "👤 NOME", value: relatorio.cliente || "N/A", inline: true },
      {
        name: "💳 CPF",
        value: relatorio.cpf?.toString() || "N/A",
        inline: true,
      },
      { name: "🚗 VEÍCULO", value: relatorio.veiculo || "N/A", inline: true },
      { name: "ESCAPE", value: relatorio.escape || "N/A", inline: true },
      { name: "🧑‍💼 BENEIRO", value: relatorio.created_by, inline: true },
      {
        name: "💰 LUCRO",
        value: `$ ${relatorio.lucro?.toLocaleString("en-US") || "0"}`,
        inline: true,
      },
      {
        name: "💼 LEILÃO",
        value: relatorio.leilao ? "Sim" : "Não",
        inline: true,
      },
      {
        name: "✨ XENOM",
        value: relatorio.xenom ? "Sim" : "Não",
        inline: true,
      },
      {
        name: "🔩 KIT NITRO",
        value: relatorio.kit_nitro ? "Sim" : "Não",
        inline: true,
      },
    ],
    timestamp: new Date().toISOString(),
  };

  await axios.post(process.env.WEB_HOOK_LEILAO ?? "", { embeds: [embed] });
};

export const sendRelatorioToDiscord = async (relatorio: relatorios) => {
  const embed = {
    title: `📄 ${relatorio.categoria || ""}`,
    color: 5814783,
    fields: [
      { name: "👤 NOME", value: relatorio.cliente || "N/A", inline: true },
      {
        name: "💳 CPF",
        value: relatorio.cpf?.toString() || "N/A",
        inline: true,
      },
      { name: "🚗 VEÍCULO", value: relatorio.veiculo || "N/A", inline: true },
      { name: "ESCAPE", value: relatorio.escape || "N/A", inline: true },
      { name: "🧑‍💼 BENEIRO", value: relatorio.created_by, inline: true },
      {
        name: "💰 LUCRO",
        value: `$ ${relatorio.lucro?.toLocaleString("en-US") || "0"}`,
        inline: true,
      },
      {
        name: "💼 LEILÃO",
        value: relatorio.leilao ? "Sim" : "Não",
        inline: true,
      },
      {
        name: "✨ XENOM",
        value: relatorio.xenom ? "Sim" : "Não",
        inline: true,
      },
      {
        name: "🔩 KIT NITRO",
        value: relatorio.kit_nitro ? "Sim" : "Não",
        inline: true,
      },
    ],
    timestamp: new Date().toISOString(),
  };

  await axios.post(webhookUrlNormal, { embeds: [embed] });
};

export async function getRelatoriosChat() {
  return axios.get(
    "https://discord.com/api/v10/channels/1410404938588094506/messages?limit=20",
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    },
  );
}


export function getBenneiros() {
  return apiUrl.get("/benneiros");
}

export function getRelatorios() {
  return apiUrl.get("/relatorios");
}

export function postRelatorios(Relatorios: relatorios) {
  return apiUrl.post("/relatorios", Relatorios);
}
