import Database from "@/utils/database";

export const POST = async (req : Request) => {
    const { room_id } = await req.json();

    try {
        const db = Database.getInstance();
        const query = `
        SELECT characters.name, actions.action, actions.time  FROM actions 
        join characters 
        on actions.char_id = characters.char_id
        WHERE room_id = 1 AND characters.is_active = true ORDER BY time ASC`;

        const actions = await db.manyOrNone(query, [room_id]);
        
        console.log('Get actions successfully.');
        return new Response(JSON.stringify(actions), { status: 200 });
    } catch(error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return new Response('An unexpected error occurred.', { status: 500 });
    }
}