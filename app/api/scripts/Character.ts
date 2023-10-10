import Race from "./Race";
import Class from "./Class";
import Skill from "./Skill";
import Item from "./Item";

import DBConnection from "./DBConnection";
import {IDatabase} from "pg-promise";
import { error } from "console";




export default class Character {
    private _char_id! : number;
    set char_id(value: number) {
        this._char_id = value;
    }
    private db: IDatabase<unknown>;

    user_id : number | undefined;
    race : Race | undefined;
    class : Class | undefined;
    name : string | undefined;
    gold : number | undefined;
    skills : Skill[] = [];
    bag : Item[] = [];
    status : {
        dex: number;
        wis: number;
        int: number;
        str: number;
        cha: number;
        con: number;
        hp: number;
    } = {
        dex: 0,
        wis: 0,
        int: 0,
        str: 0,
        cha: 0,
        con: 0,
        hp: 0
    };
    background : string | undefined;
    active : boolean | undefined;
    
    constructor(user_id: number){
        this.db = DBConnection.getInstance().getDB();
        this.user_id = user_id;
    }



    async getChar(){
        if(!this.user_id){
            console.error('User not found.')
            throw error
        }
        try{
            await this.db.tx(async (t)=>{
                const query = 'select name,gold,background,is_active from characters where cha_id = $1' 
                const Chadata = await t.one(query,[this.char_id])
                this.name = Chadata.name
                this.gold = Chadata.gold
                this.background = Chadata.background
                this.active = Chadata.is_active

                const query2 = 'select race_name from characters natural join races where cha_id = $1'
                const Racedata = await t.one(query2,[this.char_id])
                this.race = new Race(Racedata.race_name)
                await this.race.getTrait()

                const query3 = 'select class_name from characters natural join classes where cha_id = $1'
                const Classdata = await t.one(query3,[this.char_id])
                this.class = new Class(Classdata.class_name)
                await this.class.getfeature()
                await this.class.getspell()

                const query4 = 'select skill_name,skill_detail from characters natural join  skills_in_cha natural join skills where cha_id = $1'
                const Skilldata = await t.manyOrNone(query4,[this.char_id])
                for(const skill of Skilldata){
                    this.skills.push(new Skill(skill.skill_name,skill.skill_detail))
                }

                const query5 = 'select item_name,item_detail from characters natural join  inventories natural join items where cha_id = $1'
                const Itemdata = await t.manyOrNone(query5,[this.char_id])
                for(const item of Itemdata){
                    this.bag.push(new Item(item.item_name,item.item_detail))
                }

                const query6 = 'select dex,wis,int,str,cha,con,hp from characters where cha_id = $1'
                const Statdata = await t.one(query6,[this.char_id])
                this.status.dex = Statdata.dex
                this.status.wis = Statdata.wis
                this.status.int = Statdata.int
                this.status.str = Statdata.str
                this.status.cha = Statdata.cha
                this.status.con = Statdata.con
                this.status.hp = Statdata.hp
                console.log('Get character successfully.')
            })
            
        }
        catch(error){
            console.error(error)
            throw error;
        }
    }
    

    async add_item(item_id: number) {
        console.log(this._char_id)
        if (!this.char_id) { 
            console.error('Character not found.');
            throw new Error('Character not found.');
        }

        try {
            await this.db.tx(async (t) => {
                const itemCheckQuery = 'SELECT 1 FROM inventories WHERE cha_id = $1 AND item_id = $2';
                const itemExists = await t.oneOrNone(itemCheckQuery, [this.char_id, item_id]);

                if (itemExists){
                    console.error('Character already has the specified item.');
                    throw new Error('Character already has the specified item.');
                }

                const itemQuery = 'SELECT * FROM items WHERE item_id = $1';
                const exists = await t.oneOrNone(itemQuery, [item_id]);
                
                if (!exists) {
                    console.error('Item does not exist.');
                    throw new Error('Item does not exist.');
                }

                const query = 'INSERT INTO inventories (cha_id, item_id) VALUES ($1, $2)';
                const values = [this.char_id, item_id];

                await t.none(query, values);

                console.log('Item added successfully!');
            });
        } catch (error) {
            console.error('Error adding item:', error);
            throw error;
        }
    }

    async remove_item(item_id: number) {
        console.log(this.char_id)
        if (!this.char_id) { 
            console.error('Character not found.');
            throw new Error('Character not found.');
        }
        try {
            await this.db.tx(async (t) => {
                // Check if character has the item
                const checkQuery = 'SELECT 1 FROM inventories WHERE cha_id = $1 AND item_id = $2';
                const checkResult = await t.oneOrNone(checkQuery, [this.char_id, item_id]);

                if (!checkResult) {
                    console.error('Character does not have the specified item.');
                    throw new Error('Character does not have the specified item.');
                }

                // If the item exists for the character, proceed to delete
                const deleteQuery = 'DELETE FROM inventories WHERE cha_id = $1 AND item_id = $2';
                await t.none(deleteQuery, [this.char_id, item_id]);

                console.log('Item removed successfully!');
            });
        } catch (error) {
            console.error('Error removing item:', error);
            throw error;
        }
    }


    get char_id() {
        return this._char_id
    }

    async set_active(char_id: number) {
        if (!this.user_id) {
            console.error('User not found.')
            throw new Error('User not found.')
        }
        try {
            this.db.tx(async (t) => {
                const query = 'update characters set is_active = false where user_id = $1'
                const value = [this.user_id]
                await t.none(query, value)

                const query2 = 'update characters set is_active = true where cha_id = $1'
                const value2 = [char_id]
                await t.none(query2, value2)
            })
            console.log('Set active character successfully.')
        }
        catch (error) {
            console.error(error)
            throw error;
        }
    }

    

    async toString() {
        await this.getChar()

        const characterInfo = `Character ID: ${this.char_id}
        User ID: ${this.user_id}
        Name: ${this.name}
        Race: ${this.race?.name || 'N/A'}
        Class: ${this.class?.name || 'N/A'}
        Background: ${this.background || 'N/A'}
        Gold: ${this.gold || 0}
        Skills: ${this.skills.map(skill => `${skill.name}: ${skill.details}`).join(', ') || 'N/A'}
        Items in Bag: ${this.bag.map(item => `${item.name}: ${item.detail}`).join(', ') || 'N/A'}
        Dexterity: ${this.status.dex || 0}
        Wisdom: ${this.status.wis || 0}
        Intelligence: ${this.status.int || 0}
        Strength: ${this.status.str || 0}
        Charisma: ${this.status.cha || 0}
        Constitution: ${this.status.con || 0}
        HP: ${this.status.hp || 0}`;

        return characterInfo
        //return this.user_id, this.race, this.class, this.name, this.gold, this.skills, this.bag, this.status.cha, this.status.con, this.status.wis, this.status.str, this.status.int, this.status.dex, this.status.hp
    }
}   