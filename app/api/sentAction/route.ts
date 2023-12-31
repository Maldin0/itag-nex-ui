import Database from "@/utils/database";

export const POST = async (req : Request) => {
    const {room_id, email, action } = await req.json();

    try {
        const db = Database.getInstance();
        const query = `
        INSERT INTO actions (room_id, char_id, action, time) 
        VALUES ($1, (
            SELECT char_id FROM characters 
            JOIN users 
            ON characters.user_id = users.id
            WHERE email = $2
            AND is_active = true
            ), $3, NOW());`;

        await db.none(query, [room_id, email, action]);
        console.log('Action sent successfully.');
        return new Response('Action sent successfully.', { status: 200 });
    } catch(error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return new Response('An unexpected error occurred.', { status: 500 });
    }
}