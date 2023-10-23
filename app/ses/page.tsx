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
        {
            masterCheckbox: false,
            playerName: 'Player3'
        },
        {
            masterCheckbox: false,
            playerName: 'Player4'
        },
        {
            masterCheckbox: false,
            playerName: 'Player5'
        },
        {
            masterCheckbox: false,
            playerName: 'Player6'
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
                        <div className="flex-1 pl-56">
                            <h1>DG_Master</h1>
                            <div className={SesStyle.line}></div>
                            {sessions.map((session, index) => (
                                <React.Fragment key={index}>
                                    <h1 className="">
                                        <Checkbox defaultSelected={session.masterCheckbox} isDisabled={!session.masterCheckbox} size="lg" color="warning" onClick={(e) => {
                                            if (session.masterCheckbox) {
                                                e.preventDefault();
                                            }
                                        }}
                                        />
                                    </h1>
                                    <div className={SesStyle.line2} ></div>
                                </React.Fragment>
                            ))}

                        </div>
                        <div className="flex-1 text-center pr-56">
                            <h1>Players</h1>
                            <div className={SesStyle.line}></div>
                            {sessions.map((session, index) => (
                                <React.Fragment key={index}>

                                    <h1 className={SesStyle.underline}>{session.playerName}</h1>

                                    <div className={SesStyle.line2} ></div>
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
