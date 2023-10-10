"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginStyle from "./LoginStyle.module.css";


type Props = {};

export default function Login({ }: Props) {
  return (
    <div className={LoginStyle.myImages}>
      <div className={LoginStyle.scroll}>
        <div style={{ position: "relative", display: "flex" }}>
          <div className={LoginStyle.topline}></div>
          <h1
            className={LoginStyle.topfont}
            style={{
              position: "absolute",
              top: "20%",
              left: "3%",
              color: "white",
            }}
          >
            <Link
              href="/"
              style={{ textDecoration: "none", color: "white" }}
              className={LoginStyle.topfont}
            >
              ITAG
            </Link>
          </h1>
        </div>

        <div
          className={LoginStyle.box}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <h1 className={LoginStyle.font}>
              IT ADVENTURERS
              <br />
              GUILD
            </h1>
          </div>

          <input
            placeholder="E-mail/Username"
            type="text"
            className={LoginStyle.inputBox}></input>

          <p>&nbsp;</p>

          <input
            placeholder="Password"
            type="password"
            className={LoginStyle.inputBox}
          ></input>

          <div className={LoginStyle.submit} style={{ marginTop: "-5%" }}>
            <button type={"submit"} >
              dwadaw
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
