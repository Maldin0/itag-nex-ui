"use client"
import React, { useState } from 'react';
import CreateChaStyle from './CreateChaStyle.module.css';
import LoginStyle from '../login/LoginStyle.module.css';

import { useRouter } from 'next/navigation';

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Input,
    Button,
    Select,
    SelectItem
} from "@nextui-org/react";
import Link from 'next/link';
import { divider } from '@nextui-org/theme';


type Props = {}






export default function Createcharacter({ }: Props) {
    const router = useRouter();
    const [characterName, setCharacterName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedRace, setSelectedRace] = useState<string>("");
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [characterBG, setCharacterBG] = useState<string>("");
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

    React.useEffect(() => {
        generateRandomNumbers();
    }, []);

    return (
        <div className={`${CreateChaStyle.box} container flex flex-col items-center justify-center mx-auto `}  >
            <br /><br /><br /><br />
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
                    <Input size='lg' placeholder="Name" type="text"></Input>
                </div>

                <p>&nbsp;</p>
                <div className="row" style={{ width: '40%' }}>
                    <Select size='lg' label="Choose a Race" className="max-xs">
                        {
                            Object.entries(allRace).map(([label, value]) => (
                                <SelectItem key={value} value={value}>
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
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>

                <p>&nbsp;</p>
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
            <br /><br />
            
            <div >
                <Button size='lg' color="success" variant="solid">
                    CREATE CHARACTER
                </Button>
            </div>
            <br /><br /><br />
        </div>
    );

}


{/*  */ }