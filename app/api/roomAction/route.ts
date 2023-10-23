import Database from "@/utils/database"

export const POST = async (req : Request) => {
    const { room_id, email, role, status} = await req.json();
    console.log(email)
    try {
        const db = Database.getInstance();
        const joinQuery = 
        `INSERT INTO rooms (room_id, role, user_id, status, time) 
        VALUES ($1, $2, (SELECT id FROM users where email = $3), $4, NOW())`;
        await db.none(joinQuery, [room_id, role, email, status]);

        console.log(`${status} room successfully.`);
        return new Response(`${status} room successfully.`, { status: 200 });
    } catch(error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return new Response('An unexpected error occurred.', { status: 500 });
    }
}