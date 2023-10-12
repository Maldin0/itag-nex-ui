"use client";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import "@/styles/globals.css";

export default function Home() {
  return (
    <div className="contents">
      <div className="text-center" style={{ height: "600px", display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Button size="lg" radius="md" color="success" variant="shadow">Roll The Dice</Button>
      </div>
      <div className="select-none"
        style={{
          background: "#080808",
          width: "100%",
          minHeight: "600px",
        }}
      >
        <br />
        <h1 className="text-center h-12 text-4xl font-bold antialiased">Featured Website</h1>
        <div className="font-medium antialiased" style={{justifyContent:'space-around', display:'flex'}}>
          <p></p>
          <div className="text-center"><Image src="../images/featured01.png"/><p>Design Character</p></div>
          <div className="text-center"><Image src="../images/featured02.png"/><p>Start Journey</p></div>
          <div className="text-center"><Image src="../images/featured03.png"/><p>Fullied Quest</p></div>
          <p></p>
        </div>
        <div className="font-medium antialiased" style={{justifyContent:'space-around', display:'flex'}}>
          <p></p>
          <div className="text-center"><Image src="../images/featured04.png"/><p>Role Play</p></div>
          <div className="text-center"><Image src="../images/featured05.png"/><p>Rolling Dice!!</p></div>
          <p></p>
        </div>
      </div>
    </div>
  );
}
