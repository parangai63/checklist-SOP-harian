// Tipe data API — samakan dengan response backend.

export type StaffLevel = "HEAD" | "SENIOR" | "JUNIOR";

export interface SessionUser {
  id: number;
  name: string;
  level: StaffLevel;
  isAdmin: boolean;
}

export interface MeResponse {
  user: SessionUser;
  /** Hari bisnis "YYYY-MM-DD" (berganti jam 03.00 WIB). */
  businessDate: string;
}

export interface Staff {
  id: number;
  name: string;
  level: StaffLevel;
  isAdmin: boolean;
  active: boolean;
  createdAt: string;
}

export const LEVEL_LABEL: Record<StaffLevel, string> = {
  HEAD: "Head bar",
  SENIOR: "Senior bar",
  JUNIOR: "Junior bar",
};
