import Database from "@/utils/database"

export type Char = {
    char_id: number,
    name: string,
    is_active: boolean
}

export const POST = async (req : Request) => {
    const {email} = await req.json()
    console.log(email)
    if (!email) {
        return new Response('Email is required.', { status: 400 });
    }

    try {
        const db = Database.getInstance();
        const user = await db.oneOrNone('SELECT id FROM "users" WHERE email = $1', [email]);

        if (!user) {
            return new Response('User not found.', { status: 404 });
        }

        const query = `SELECT char_id, name, is_active FROM characters WHERE user_id = $1`;
        const characters:Char[] = await db.any(query, [user.id]);

        return new Response(JSON.stringify(characters), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
            return new Response('An expected error occurred.', { status: 500 });
        } else {
            console.error('An unexpected error occurred:', error);
            return new Response('An unexpected error occurred.', { status: 500 });
        }
    }
}