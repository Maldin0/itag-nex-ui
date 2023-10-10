import Trait from "./Trait";
import DBConnection from "./DBConnection";
import {IDatabase} from "pg-promise";
export default class Race {
    private db : IDatabase<unknown>;
    name: string;
    traits: Trait[] = [];
    
    constructor(name:string) {
        this.db = DBConnection.getInstance().getDB();
        this.name = name;
    }

    async getTrait() {
        try {
            await this.db.tx(async (t)=> {
                const query = 'select * from races r join traits t on (t.race_id = r.race_id) where race_name = $1';
                const value = [this.name];
                const traitdata = await t.many(query, value);
                for(const trait of traitdata)
                {
                    const temp = new Trait(trait.trait_name, trait.trait_detail);
                    this.traits.push(temp)
                }
                console.log('Traitdata load successfully.')
            })
        }
        catch (error) {
            console.error(error)
        }
    }
}