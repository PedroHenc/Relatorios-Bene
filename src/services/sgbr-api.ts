import axios from "axios";
import { relatorios } from "./types";

const apiUrl = axios.create({
  baseURL: "https://sgbr-api.up.railway.app/",
  // baseURL: "http://localhost:8080",
});

export function getBenneiros() {
  return apiUrl.get("/benneiros");
}

export function postRelatorios(Relatorios: relatorios) {
  return apiUrl.post("/relatorios", Relatorios);
}
