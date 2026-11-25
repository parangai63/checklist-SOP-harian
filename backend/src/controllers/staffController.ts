import { Request, Response } from "express";
import { listStaff } from "../services/staffService";

export async function getStaff(_req: Request, res: Response) {
  res.json(await listStaff());
}
