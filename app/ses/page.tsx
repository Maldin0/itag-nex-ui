"use client";

import React, { useState } from "react";
import SesStyle from "./SesStyle.module.css";
import { ScrollShadow, Checkbox } from "@nextui-org/react";
import profileStyle from "@/app/profile/ProfileStyle.module.css";

type Props = {};



export default function Ses({ }: Props) {
    const sessions = [
        {
            masterCheckbox: true, // หรือ false ตามความต้องการ
            playerName: 'Player1'
        },
        {
            masterCheckbox: false,
            playerName: 'Player2'
        },
        //... คุณสามารถเพิ่มเซสชันเพิ่มเติมตามต้องการ
    ];

    return (
        <ScrollShadow hideScrollBar className="">
            <div className={`${SesStyle.box} container flex flex-col items-center justify-center mx-auto font`}>
                <br />
                <div style={{ fontSize: '2em' }}>
                    Session ID [ ]
                </div>
                <br />

                <div className={SesStyle.box2}>
                    <div className="container flex flex-row mx-auto ">
                        <div className="flex-1 text-left ">
                            <h1>DG Master</h1>
                            {sessions.map((session, index) => (
                                <React.Fragment key={index}>
                                    <h1>
                                        <Checkbox defaultSelected={session.masterCheckbox} size="lg" color="warning"></Checkbox>
                                    </h1>
                                   
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="flex-1 text-center">
                            <h1>Players</h1>
                            {sessions.map((session, index) => (
                                <React.Fragment key={index}>
                                    <div className={SesStyle.underline}>
                                        <h1>{session.playerName}</h1>
                                    </div>                  
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <br /><br />
            </div>
        </ScrollShadow>
    )
}
