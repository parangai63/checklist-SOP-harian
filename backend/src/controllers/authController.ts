import { Request, Response } from "express";
import { clearSession, issueSession } from "../middleware/auth";
import { loginWithPin } from "../services/authService";
import { businessToday } from "../utils/dates";

export async function postPinLogin(req: Request, res: Response) {
  const user = await loginWithPin(req.body?.pin, req.ip ?? "unknown");
  issueSession(res, user);
  res.json({ user, businessDate: businessToday() });
}

export async function postLogout(_req: Request, res: Response) {
  clearSession(res);
  res.json({ ok: true });
}

export async function getMe(req: Request, res: Response) {
  res.json({ user: req.user, businessDate: businessToday() });
}
