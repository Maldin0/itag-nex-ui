"use client";
import React, { useState } from "react";
import { signIn, useSession} from "next-auth/react";
import "@/styles/globals.css";
import {
 Image, Input, Button, Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import {useRouter} from "next/navigation"


export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [roomId, setRoomId] = useState<number>(0);

  const [isOpen, setIsOpen] = useState(false);
  const [modalRole, setModalRole] = useState('player');

  async function joinRoom(role: string) {

    try {
      await fetch("/api/roomAction", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room_id: roomId, email: session?.user?.email, role: role, status: 'join' })
      });

    } catch (error) {
      console.error("Failed to fetch charData:", error);
    }
  }

  const handleOpen = (role: string) => {
    setModalRole(role);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };


  return (
    <div className="contents">
      {(session && session.user) ? (
        <>
          <br /><br /><br />
          <div className="text-center pl-36" style={{ height: "500px", display: 'flex', justifyContent: 'space-between' }}>
            <h1 className="font text-9xl" style={{ fontStyle: "italic", color: 'white', textShadow: '7px 7px 4px rgba(0, 0, 0, 1)' }}>
              Welcome <br />{session.user.name}
            </h1>
            <div className="py-24 gap-14 w-52" style={{ display: 'flex', flexDirection: 'column', marginRight: '25rem' }}>
              <div className="text-4xl font" style={{ color: 'white', textShadow: '4px 4px 2px rgba(0, 0, 0, 1)' }}>
                PLAY AS
              </div>
              <Button radius="md" size="lg" color="success" variant="solid" onPress={() => {
                handleOpen('dungeonMaster') 
                
              }}>
                DUNGEON MASTER 
              </Button>

              <Button radius="md" size="lg" color="success" variant="solid" onPress={() => {
                handleOpen('p')
              }}>Player</Button>
              <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalContent>

                  <ModalHeader className="flex flex-col gap-1">Join Room</ModalHeader>
                  <ModalBody>
                    <p>
                      <Input type="number" onChange={(e) => setRoomId(Number(e.target.value))}></Input>
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={handleClose}>
                      Close
                    </Button>
                    <Button color="success" onClick={() => {
                      joinRoom(modalRole === 'dungeonMaster' ? 'd' : 'p');
                      router.push(`/room/${roomId}`)
                    }}>
                      Join
                    </Button>
                  </ModalFooter>

                </ModalContent>
              </Modal>
            </div>
          </div>


          <br /><br /><br />
        </>
      ) : (
        <>
          <div className="text-between font mb-10" style={{ height: "600px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={`container flex flex-row mx-auto `}>
              <div className="flex-1 text-center text-8xl" style={{ color: 'white', textShadow: '7px 7px 4px rgba(0, 0, 0, 1)' }}>
                <h1>IT
                  <br />
                  ADVENTURER
                  <br />
                  GUILD</h1>
                <h1></h1>
              </div>

              <div className="flex-1 text-center pt-24">
                <Button size="lg" radius="md" color="success" variant="shadow" onPress={async ()=>{await signIn("google", {callbackUrl: '/'});}}>ROLL THE DICE</Button>
              </div>
            </div>

          </div>

        </>
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
