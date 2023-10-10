"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginStyle from "./LoginStyle.module.css";
import {Input} from "@nextui-org/react";

type Props = {};

export default function Login({ }: Props) {
  return (
    <div className={LoginStyle.myImages}>
      <div className={LoginStyle.scroll}>
        <div className="container px-5 box p-5" style={{width:'50%'}} >

          <div className="row justify-center mb-5">
            <h1 className="font">
              IT<p>&nbsp;</p> ADVENTURERS
              <p>&nbsp;</p>
              GUILD
            </h1>
          </div>

          <p>&nbsp;</p>
          <div className="row" style={{width:'70%',paddingLeft:'30%'}}> 
              <Input
              placeholder="E-mail/Username"
              type="text"
              style={{}}></Input>
          </div>

          <p>&nbsp;</p>
          <div  style={{width:'30%'}}>
          <Input
            placeholder="Password"
            type="password"
            className={LoginStyle.inputBox}
          ></Input>
          </div>

          <p>&nbsp;</p>
          <div className={LoginStyle.submit} >
            
            <button type={"submit"} >
              Login
            </button>
          </div>

          <div className={LoginStyle.line} style={{ marginTop: "3%" }}></div>

          <div className={LoginStyle.supButton} style={{ marginTop: "10%" }}>
            <button
              type={"submit"} >
              Are you new adventurer?&nbsp;&nbsp;
            </button>
            <button type={"submit"}>
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
