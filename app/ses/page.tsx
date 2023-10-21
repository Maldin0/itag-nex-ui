"use client";

import React, { useState } from "react";
import SesStyle from "./SesStyle.module.css";
import {ScrollShadow} from "@nextui-org/react";
import ProfileStyle from "@/app/profile/ProfileStyle.module.css";

type Props = {};

export default function Ses({ }: Props) {

    return (
        <ScrollShadow hideScrollBar className="">
            <div className={`${SesStyle.box} container flex flex-col items-center justify-center mx-auto `}>
                <br /><br />
                <div className={`${ProfileStyle.box2} container flex flex-col items-center justify-center mx-auto `}>
                    <br />
                    {/*<div className={SesStyle.GridCon}>*/}
                    {/*    <div className={SesStyle.sesId}>*/}
                    {/*        Session ID*/}
                    {/*    </div>*/}
                    {/*    <div className={SesStyle.master}>*/}
                    {/*        DG Master*/}
                    {/*    </div>*/}
                    {/*    <div className={SesStyle.playerNum}>*/}
                    {/*        Player*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={SesStyle.sesId}>
                        Session ID
                    </div>
                    <div className={SesStyle.master}>
                        DG Master
                    </div>
                    <div className={SesStyle.playerNum}>
                        Player
                    </div>
                    <br /><br /><br /><br />
                </div>
                <br /><br />
            </div>
        </ScrollShadow>
    )
}
