"use client";

import React, { useState } from "react";
import ProfileStyle from "./ProfileStyle.module.css";
import CreateChaStyle from "@/app/createcharacter/CreateChaStyle.module.css";
import Character from "@/app/api/scripts/Character";

type Props = {};

export interface User {
    user: {
        _char: Character[];
        db: any;
        _username: string;
        _password: string;
        _email: string;
        _user_id: number;
    };
}

export default function Profile({ }: Props) {
    const [user, setUser] = React.useState<User | null>(null);

    return (

        <div className={`${ProfileStyle.box} container flex flex-col items-center justify-center mx-auto `} >
            <br /><br /><br /><br />
            <div className={`${ProfileStyle.box2} container flex flex-col items-center justify-center mx-auto `}>
                <div>
                    <h1 className="font">
                        PROFILE
                    </h1>
                </div>

                <div className={ProfileStyle.line}></div>

                <div className={ProfileStyle.circle}></div>

                <div
                  className={ProfileStyle.username}
                  style={{ display: "inline-block" }}
                >
                  Username : {user?.user._username}{" "}
                </div>

                <div
                  className={ProfileStyle.email}
                  style={{ display: "inline-block" }}
                >
                  Email : {user?.user._email}
                </div>
                <br /><br />
            </div>
            <br /><br /><br /><br />
        </div>
    )
}