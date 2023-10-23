import Database  from '@/utils/database';

export const POST = async (req : Request) => {
    const {char_id, email} = await req.json()
    
    if (!char_id) {
        return new Response('Character ID is required.', { status: 400 });
    }

    try {
        const db = Database.getInstance();
        await db.tx(async (t) => {
            await t.none('UPDATE characters SET is_active = false from users WHERE characters.user_id = users.id and users.email = $1', [email]);
            await t.none('UPDATE characters SET is_active = true WHERE char_id = $1', [char_id]);
        })
        console.log("Character set to active.")
        return new Response('Character set to active.', { status: 200 });
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