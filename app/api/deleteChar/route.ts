import Database from "@/utils/database"

export const POST = async (req : Request) => {
    const { char_id } = await req.json()
    console.log(char_id)
    if (!char_id) {
        return new Response('Character id is required.', { status: 400 });
    }

    try {
        const db = Database.getInstance();
        await db.tx(async (t) => {
            await t.none('DELETE FROM inventories WHERE char_id = $1', [char_id]);
            await t.none('DELETE FROM skills_in_char WHERE char_id = $1', [char_id]);
            await t.none('DELETE FROM characters WHERE char_id = $1', [char_id]);
        });

        console.log('Delete character successfully.');
        return new Response('Delete character successfully.', { status: 200 });
    } catch(error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return new Response('An unexpected error occurred.', { status: 500 });
    }
    
}