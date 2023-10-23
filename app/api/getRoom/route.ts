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
        const query = `SELECT characters.name, characters.char_id, image, rooms.role, classes.class_name as class
        from users join characters on users.id = characters.user_id 
        join rooms on users.id = rooms.user_id 
        join classes on characters.class_id = classes.class_id
        WHERE rooms.room_id = $1 AND characters.is_active = true ORDER BY rooms.id ASC`;
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