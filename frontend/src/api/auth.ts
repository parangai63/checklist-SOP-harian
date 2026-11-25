import { api } from "./client";
import type { MeResponse, Staff } from "../types";

export const loginPin = (pin: string) => api<MeResponse>("/auth/pin", { method: "POST", body: { pin } });
export const logout = () => api<{ ok: true }>("/auth/logout", { method: "POST" });
export const fetchMe = () => api<MeResponse>("/auth/me");

export const fetchStaff = () => api<Staff[]>("/staff");
