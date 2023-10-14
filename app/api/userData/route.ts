import { NextApiRequest, NextApiResponse } from "next/types";
import DBConnection from "../scripts/DBConnection";

const db = DBConnection.getInstance().getDB();
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body
    if (!email) {
        res.status(400).json({ error: "Missing email" })
        return
    }
}