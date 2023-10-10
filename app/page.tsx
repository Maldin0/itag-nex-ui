"use client";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import { Image } from "@nextui-org/react";
import "@/styles/globals.css";

export default function Home() {
  return (
    <div className="contents">
      <div style={{ marginTop: "600px" }}></div>
      <div
        style={{
          background: "black",
          width: "100%",
          height: "300px",
        }}
      >
        <br />
        <h1 className="text-center h-12 text-4xl">Featured Website</h1>
      </div>
    </div>
  );
}
