import { NextResponse } from "next/server";
import axios from "axios";

const CHANNEL_ID = "1415031479829794946";

export async function GET() {
  try {
    const res = await axios.get(
      `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=20`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Erro ao buscar mensagens do Discord:", error);
    return NextResponse.json(
      { error: "Erro ao buscar mensagens do Discord" },
      { status: 500 }
    );
  }
}
