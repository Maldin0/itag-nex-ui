import Feature from './Feature';
import {IDatabase} from "pg-promise";
import Spell from "./Spell";
import DBConnection from "./DBConnection";



export default class Class {
    private db : IDatabase<unknown>;
    name: string;
    features: Feature[] = [];
    spell: Spell[] = [];

    constructor(name: string) {
        this.db = DBConnection.getInstance().getDB();
        this.name = name;
    }

    async getfeature() {
        try {
            await this.db.tx(async (t)=> {
                const query = 'select * from classes c join features f on (c.class_id = f.class_id) where class_name = $1'
                const value = [this.name, this.features]
                const featuredata = await t.many(query, value)
                for(const fea of featuredata)
                {
                    const temp = new Feature(fea.feature_name, fea.feature_detail)
                    this.features.push(temp)
                }
                console.log('getfeature load successfully.')
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    async getspell(){
        try {
            await this.db.tx(async (t)=>{
                const  query = 'select * from classes c join spells s on (c.class_id = s.class_id) where class_name = $1'
                const value = [this.name, this.spell]
                const spelldata = await t.many(query, value)
                for(const spel of spelldata)
                {
                    const temp = new Spell(spel.spell_name, spel.interval_time, spel.duration, spel.range, spel.spell_detail)
                    this.spell.push(temp)
                }
                console.log('getspell load successfully.')
            })
        }
        catch (error) {
            console.error(error)
        }
    }
}