import Database from "@/utils/database";

export const POST = async (req : Request) => {
    const { room_id } = await req.json();

    try {
        const db = Database.getInstance();
        const query = `DELETE FROM actions WHERE room_id = $1`;
        await db.none(query, [room_id]);

        console.log(`Actions cleared successfully.`);
        return new Response(`Actions cleared successfully.`, { status: 200 });
    } catch(error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return new Response('An unexpected error occurred.', { status: 500 });
    }
}