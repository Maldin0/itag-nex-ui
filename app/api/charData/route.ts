import Database from "@/utils/database";

type Feature = {
    name: string,
    details: string
}

type Spell = {
    name: string,
    interval_time: number;
    duration: number;
    range: number;
    details: string;
}

type Class = {
    name: string,
    features: Feature[]
    spell: Spell[]
}

type Item = {
    name: string,
    details: string
}

type Trait = {
    name: string,
    details: string
}

type Race = {
    name: string,
    traits: Trait[]
}
type Skill = {
    name: string,
    details: string
}

export type CharData = {
    race: Race,
    class: Class,
    skills: Skill[],
    items: Item[],
    status : {
        dex: number,
        wis: number,
        int: number,
        str: number,
        cha: number,
        con: number,
        hp: number,
        gold: number
    }
    background: string;
}



export const POST = async (req : Request) => {
    const { char_id } = await req.json()
    console.log(char_id)
    if (!char_id) {
        return new Response('Character id is required.', { status: 400 });
    }

    let charData: CharData = {
        race: { name: "", traits: [] },
        class: { name: "", features: [], spell: [] },
        skills: [],
        items: [],
        status: { dex: 0, wis: 0, int: 0, str: 0, cha: 0, con: 0, hp: 0, gold: 0 },
        background: ""
    }

    try {
        const db = Database.getInstance();
        await db.tx(async (t) => {
            const raceQuery = 'SELECT race_name FROM characters natural join races where char_id = $1';
            const raceData = await t.one(raceQuery, [char_id]);
            charData.race.name = raceData.race_name;
            console.log('Race name Loaded')

            const traitsQuery = 'SELECT * FROM races r JOIN traits t ON (t.race_id = r.race_id) WHERE race_name = $1';
            const traitData = await t.many(traitsQuery, [charData.race.name])
            for (const trait of traitData) {
                const temp: Trait = {
                    name: trait.trait_name,
                    details: trait.trait_details
                }
                charData.race.traits.push(temp)
            }
            console.log('traits Loaded')

            const classQuery = 'SELECT class_name FROM characters natural join classes where char_id = $1';
            const classData = await t.one(classQuery, [char_id]);
            charData.class.name = classData.class_name;
            console.log('class name Loaded')

            const featuresQuery = 'SELECT * FROM classes c JOIN features f ON (f.class_id = c.class_id) WHERE class_name = $1';
            const featureData = await t.many(featuresQuery, [charData.class.name])
            for (const feature of featureData) {
                const temp: Feature = {
                    name: feature.feature_name,
                    details: feature.feature_detail
                }
                charData.class.features.push(temp)
            }
            console.log('features Loaded')

            const spellQuery = 'SELECT * FROM classes c JOIN spells s ON (s.class_id = c.class_id) WHERE class_name = $1';
            const spellData = await t.many(spellQuery, [charData.class.name])
            for (const spell of spellData) {
                const temp: Spell = {
                    name: spell.spell_name,
                    interval_time: spell.interval_time,
                    duration: spell.duration,
                    range: spell.range,
                    details: spell.spell_detail
                }
                charData.class.spell.push(temp)
            }
            console.log('spell Loaded')

            const skillsQuery = 'select * from skills natural join skills_in_char natural join "characters" c  WHERE char_id = $1';
            const skillData = await t.manyOrNone(skillsQuery, [char_id])
            for (const skill of skillData) {
                const temp: Skill = {
                    name: skill.skill_name,
                    details: skill.skill_detail
                }
                charData.skills.push(temp)
            }
            console.log('skills Loaded')

            const itemsQuery = 'SELECT * FROM characters natural join inventories natural join items WHERE char_id = $1';
            const itemData = await t.manyOrNone(itemsQuery, [char_id])
            for (const item of itemData) {
                const temp: Item = {
                    name: item.item_name,
                    details: item.item_detail
                }
                charData.items.push(temp)
            }
            console.log('items Loaded')

            const statusQuery = 'SELECT * FROM characters WHERE char_id = $1';
            const statusData = await t.one(statusQuery, [char_id])
            charData.status.dex = statusData.dex;
            charData.status.wis = statusData.wis;
            charData.status.int = statusData.int;
            charData.status.str = statusData.str;
            charData.status.cha = statusData.cha;
            charData.status.con = statusData.con;
            charData.status.hp = statusData.hp;
            charData.status.gold = statusData.gold;
            console.log('status Loaded')

            const backgroundQuery = 'SELECT background FROM characters WHERE char_id = $1';
            const backgroundData = await t.one(backgroundQuery, [char_id])
            charData.background = backgroundData.background;
            console.log('background Loaded')

            
        })
        console.log(charData);
        return new Response(JSON.stringify(charData), { status: 200, headers: { 'Content-Type': 'application/json' } });
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