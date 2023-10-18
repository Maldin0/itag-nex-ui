import { NextApiRequest, NextApiResponse } from "next/types";
import DBConnection from "../scripts/DBConnection";

export type Character = {
    name: string,
    race_id: number,
    class_id: number,
    stats: {
        dex: number,
        wis: number,
        int: number,
        str: number,
        cha: number,
        con: number
    }
    background: string
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email
    const charData: Character = req.body.character
    if (!email) {
        res.status(400).json({ error: 'Missing email' })
        return
    }
    const db = DBConnection.getInstance().getDB();

    try {
        await db.tx(async (t) => {
            const user_id = await t.one('SELECT user_id FROM "users" WHERE email = $1', [email])
            
            const query = `insert into 
            characters(user_id,race_id,class_id,name,background,dex,wis,int,str,cha,con,is_active) 
            values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, false)
            returning char_id`
            const value = [
                user_id, charData.race_id, charData.class_id,
                charData.name, charData.background,
                charData.stats.dex, charData.stats.wis, charData.stats.int,
                charData.stats.str, charData.stats.cha, charData.stats.con]
            const Chadata = await t.one(query,value)

            const set_false = 'update characters set is_active = false where user_id = $1'
            await t.none(set_false, [user_id])

            const set_true = 'update characters set is_active = true where cha_id = $1'
            await t.none(set_true, [Chadata.char_id])
        }).then(() => {
            console.log('Create character successfully.');
            res.status(200)
        })
    } catch (error) {
        res.status(500).json({ error: error})
    }
}