
import db from "@/utils/database"

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


export const POST = async (req : Request) => {
    const {email, Character:charData} = await req.json()
    if (!email) {
        return new Response('Email is required.', { status: 400 });
    }

    console.log(charData);

    try {
        await db.tx(async (t) => {
            const user = await t.oneOrNone('SELECT id FROM "users" WHERE email = $1', [email]);
            
            if (!user) {
                throw new Error("User not found.");
            }

            const query = `INSERT INTO characters(user_id, race_id, class_id, name, background, dex, wis, int, str, cha, con, is_active) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, false) RETURNING char_id`;

            const values = [
                user.id, charData.race_id, charData.class_id,
                charData.name, charData.background,
                charData.stats.dex, charData.stats.wis, charData.stats.int,
                charData.stats.str, charData.stats.cha, charData.stats.con
            ];

            const charDataResult = await t.one(query, values);
            console.log(charDataResult);

            await t.none('UPDATE characters SET is_active = false WHERE user_id = $1', [user.id]);
            await t.none('UPDATE characters SET is_active = true WHERE char_id = $1', [charDataResult.char_id]);
        });

        console.log('Create character successfully.');
        return new Response('Create character successfully.', { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return new Response('An unexpected error occurred.', { status: 500 });
    }
}
