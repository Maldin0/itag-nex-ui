"use client"
import React, { useState } from 'react';
import CreateChaStyle from './CreateChaStyle.module.css';
import { useRouter, redirect } from 'next/navigation';
import {
    Input,
    Button,
    Select,
    SelectItem,
    Textarea
} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';


type Props = {}






export default function Createcharacter({ }: Props) {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
        redirect("/api/auth/signin?callbackUrl=/mycharacter");
        }
    });
    const [characterName, setCharacterName] = useState<string>("");
    const [characterRace, setCharacterRace] = useState<number>(0);
    const [characterClass, setCharacterClass] = useState<number>(0);
    const [characterBackstory, setCharacterBackstory] = useState<string>("");
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
    const allRace: { [key: string]: number } = {
        "Human": 1,
        "Elf": 2,
        "Dwarf": 3,
        "Orc": 4,
        "Gnome": 5
    }

    const allClass: { [key: string]: number } = {
        "Barbarian": 1,
        "Paladin": 2,
        "Bard": 3,
        "Mage": 4,
        "Rogue": 5
    }


    const generateRandomNumbers = () => {
        let nums: number[] = [];
        let sum = 0;

        while (true) {
            sum = 0;

            for (let i = 0; i < 5; i++) {
                nums[i] = Math.floor(Math.random() * 13) - 6; // สุ่มตัวเลขระหว่าง -6 ถึง 6
                sum += nums[i];
            }

            // คำนวณตัวเลขที่ 6
            nums[5] = 12 - sum;

            // ตรวจสอบว่าตัวเลขที่ 6 อยู่ระหว่าง -6 ถึง 6 หรือไม่
            if (nums[5] >= -6 && nums[5] <= 6) break;
        }

        setRandomNumbers(nums);
    };

    async function handleCreateChar() {
        if (!characterName || characterRace === 0 || characterClass === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            })
            return;
        }
        try {
            const response = await fetch('/api/createChar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: session?.user?.email,
                    Character:{
                        name: characterName,
                        race_id: characterRace,
                        class_id: characterClass,
                        stats: {
                            dex: randomNumbers[0],
                            wis: randomNumbers[1],
                            int: randomNumbers[2],
                            str: randomNumbers[3],
                            cha: randomNumbers[4],
                            con: randomNumbers[5]
                        },
                        background: characterBackstory
                    }
                }),
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your character has been created!',
                }).then(() => { router.push('/mycharacter') })
            }
        } catch (error) { 
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    React.useEffect(() => {
        generateRandomNumbers();
    }, []);

    return (
        <div className={`${CreateChaStyle.box} container flex flex-col items-center justify-center mx-auto `}  >
            <br /><br /><br />
            <div className={`${CreateChaStyle.box2} container flex flex-col items-center justify-center mx-auto `}>
                <div>
                    <h1 className="font">
                        CREATE YOUR CHARACTER
                    </h1>
                </div>

                <div className={CreateChaStyle.line}></div>

                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <div className="row" style={{ width: '40%' }}>
                    <Input 
                        size='lg' 
                        placeholder="Name" 
                        type="text" 
                        value={characterName} 
                        onChange={(e) => setCharacterName(e.target.value)}>
                    </Input>
                </div>

                <p>&nbsp;</p>
                <div className="row" style={{ width: '40%' }}>
                    <Select size='lg' label="Choose a Race" className="max-xs">
                        {
                            Object.entries(allRace).map(([label, value]) => (
                                <SelectItem key={value} value={value} onClick={() => setCharacterRace(value)}>
                                    {label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>

                <p>&nbsp;</p>
                <div className="row" style={{ width: '40%' }}>
                    <Select size='lg' label="Choose a Class" className="max-xs">
                        {
                            Object.entries(allClass).map(([label, value]) => (
                                <SelectItem key={value} value={value} onClick={() => setCharacterClass(value)}>
                                    {label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>



                <p>&nbsp;</p>
                <div className="row" style={{ width: '40%'}}>
                    <Textarea
                        label="BackStory"
                        labelPlacement="inside"
                        placeholder="write your backstory"
                        className="w-full"
                        onChange={(e) => setCharacterBackstory(e.target.value)}
                    />
                </div>
                <p>&nbsp;</p>
                <div>
                    <Button size='lg' color='warning' variant='faded' onClick={generateRandomNumbers} className={CreateChaStyle.inputBox} style={{}}><p>Random Stats: {randomNumbers.join(", ")}</p></Button>
                    <p style={{ paddingTop: '10px', color: 'black' }}>
                        dex: {randomNumbers[0]},
                        &nbsp;wis: {randomNumbers[1]},
                        &nbsp;int: {randomNumbers[2]},
                        &nbsp;str: {randomNumbers[3]},
                        &nbsp;cha: {randomNumbers[4]},
                        &nbsp;con: {randomNumbers[5]}
                    </p>
                </div>
                <p>&nbsp;</p>


                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
            <br />

            <div >
                <Button size='lg' color="success" variant="solid" onClick={async () => {handleCreateChar()}}>
                    CREATE CHARACTER
                </Button>
            </div>
            <br />
        </div>
        
    );

}
