"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { options } from "./api/auth/[...nextauth]/options"
import "@/styles/globals.css";

interface User {
  username?: string;
  message: string;
}

export default function Home() {
  const [user, setUser] = React.useState<User | null>(null);
  const { data: session } = useSession();

  return (
    <div className="contents">
      {(session && session.user) ? (
        <>
          <br /><br /><br />
          <div className="text-center pl-36" style={{ height: "500px", display: 'flex', alignItems: 'left', justifyContent: 'left'}}>
            <h1 className="font text-9xl" style={{ fontStyle: "italic", color: 'white', textShadow: '7px 7px 4px rgba(0, 0, 0, 1)' }}>Welcome <br />{session.user.name}</h1>
            <div className=" px-48 py-24 gap-14" style={{display: 'flex',flexDirection: 'column',alignItems: 'right',justifyContent: 'right'}}>
              <Button radius="lg" size="lg" color="warning" variant="solid">
                create session
              </Button>
              <Button radius="md" size="lg" color="warning" variant="solid">
                join session
              </Button>
            </div>
          </div>

          
          <br /><br /><br />
        </>
      ) : (
        <div className="text-center" style={{ height: "600px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button size="md" radius="md" color="success" variant="shadow">Roll The Dice</Button>
        </div>
      )}
      <br />
      <div className="select-none"
        style={{
          background: "#080808",
          width: "100%",
          minHeight: "600px",
        }}
      >
        <br />
        <h1 className="text-center h-12 text-4xl font-bold antialiased">Featured Website</h1>
        <div className="font-medium antialiased" style={{ justifyContent: 'space-around', display: 'flex' }}>
          <p></p>
          <div className="text-center"><Image src="../images/featured01.png" /><p>Design Character</p></div>
          <div className="text-center"><Image src="../images/featured02.png" /><p>Start Journey</p></div>
          <div className="text-center"><Image src="../images/featured03.png" /><p>Fullied Quest</p></div>
          <p></p>
        </div>
        <div className="font-medium antialiased" style={{ justifyContent: 'space-around', display: 'flex' }}>
          <p></p>
          <div className="text-center"><Image src="../images/featured04.png" /><p>Role Play</p></div>
          <div className="text-center"><Image src="../images/featured05.png" /><p>Rolling Dice!!</p></div>
          <p></p>
        </div>
      </div>
    </div>
  );
}
