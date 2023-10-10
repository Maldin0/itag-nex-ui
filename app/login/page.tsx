"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginStyle from "./LoginStyle.module.css";
import { Input,Button } from "@nextui-org/react";


type Props = {};

export default function Login({ }: Props) {
  return (
    
      <div className="container box flex flex-col items-center justify-center w-9/12 mx-auto " >
        <div>
          <h1 className="font">
            IT<p></p> ADVENTURERS
            <p></p>
            GUILD
          </h1>
        </div>

        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <div className="row" style={{width:'32%'}}>
          <Input placeholder="E-mail/Username" type="text"></Input>
        </div>

        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <div className="row" style={{width:'32%'}}>
          <Input  placeholder="Password" type="text"></Input>
        </div>

        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <div >
          <Button color="default" variant="faded">
            Login
          </Button>
        </div>

        <p>&nbsp;</p>
        <div className={LoginStyle.line}></div>

        <p>&nbsp;</p>
        <div className={LoginStyle.supButton}>
          <button
            type={"submit"} >
            Are you new adventurer?&nbsp;&nbsp;
          </button>
          <button type={"submit"}>
            Forgot password?
          </button>
        </div>
      </div>
    

  );
}
