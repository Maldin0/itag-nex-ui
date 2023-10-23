import Database from "@/utils/database"

type User = {
    name: string,
    char_id: number,
    image: string,
    role: string,
    class: string
}

export type RoomData = {
    room_id: string,
    users: User[]
}

export const POST = async (req : Request) => {
    const { room_id } = await req.json()

    let roomData: RoomData = {
        room_id: room_id,
        users: []
    }

    try {
        const db = Database.getInstance();
        const query = `
        WITH RankedStatuses AS (
            SELECT r.user_id,
                r.status,
                r.room_id,
                r.role,
                r.time,
                ROW_NUMBER() OVER (PARTITION BY r.user_id ORDER BY r.time DESC, r.id DESC) as rn
            FROM rooms r
            WHERE r.room_id = $1
        )

        SELECT c.name, c.char_id, u.image, r.role
        FROM users u
        JOIN characters c ON u.id = c.user_id 
        JOIN RankedStatuses r ON u.id = r.user_id 
        WHERE r.rn = 1 AND r.status = 'join' AND c.is_active = true
        ORDER BY u.id ASC;`;
        const users = await db.any(query, [room_id]);
        roomData.users = users;

        console.log('Get room successfully.');
        return new Response(JSON.stringify(roomData), { status: 200 });
    } catch(error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return new Response('An unexpected error occurred.', { status: 500 });
    }
}