"use client";

import React, { useState } from "react";
import SesStyle from "./SesStyle.module.css";
import { ScrollShadow,Checkbox } from "@nextui-org/react";
import ProfileStyle from "@/app/profile/ProfileStyle.module.css";

type Props = {};

export default function Ses({ }: Props) {

    return (
        <ScrollShadow hideScrollBar className="">
            <div className={`${SesStyle.box} container flex flex-col items-center justify-center mx-auto font`}>
                <br />
                <div style={{ fontSize: '30px' }}>
                    Session ID [ ]
                </div>
                <br />
                <div className={`${SesStyle.box2} container flex flex-row mx-auto `}>
                    <div className="flex-1 text-left ">
                        <h1>DG Master</h1>
                        <h1><Checkbox defaultSelected size="lg" color="warning"></Checkbox></h1>
                    </div>

                    <div className="flex-1 text-center">
                        <h1>Player</h1>
                        <h1>player1</h1>
                    </div>
                    


                    <br /><br /><br /><br />
                </div>
                <br /><br />
            </div>
        </ScrollShadow>
    )
}
