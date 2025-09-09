import axios from "axios";
import { Benneiro, relatorios } from "./types";

const apiUrl = axios.create({
  baseURL: "https://sgbr-api.up.railway.app/",
});

export function getBenneiros() {
  return apiUrl.get("/benneiros");
}

export function postRelatorios(Relatorios: relatorios) {
  return apiUrl.post("/relatorios", Relatorios);
}
