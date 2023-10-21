"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import profileStyle from "./profileStyle.module.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import { Char } from "../api/userData/route";
import { CharData } from "../api/charData/route";


type Props = {};

export default function Mycharacter({ }: Props) {

  const [selectedChardata, setSelectedChardata] = useState<CharData | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Char | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/mycharacter");
    }
  });
  const [characters, setCharacters] = useState<Char[]>([]);
  const [isinvenOpen, setinvenOpen] = useState(false);
  const [isdeleteOpen, setdeleteOpen] = useState(false);

  async function getCharacter() {
    try {
      const response = await fetch("/api/userData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session?.user?.email })
      });
      const data = await response.json()
      setCharacters(data)
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCharacter(char_id: string) {
    try {
        const response = await fetch("/api/deleteChar", { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ char_id: char_id })
        });

        if (response.ok) {
            console.log("Character deleted successfully");
            
            getCharacter();
        } else {
            console.error("Failed to delete character");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

  useEffect(() => {
    if (session?.user?.email) {
      getCharacter();
    }
  }, [session]);

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  return (
    <div
      className="container  flex-col items-center justify-center w-9/12 mx-auto "
      style={{ minHeight: "120vh", marginTop: "-150px" }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="font justify-items-center" >
        <p className="text-6xl" style={{ fontStyle: "italic" }}>Characters</p>
        <div className={profileStyle.line}></div>

        <div className=" ml-10 mt-5" style={{ fontStyle: "italic" }}>
          <h5>YOUR CHARACTER LIST</h5>
        </div>
        <br />
        <br />
        <br />
        <div className="text-left " style={{ fontSize: "30px" }}>
          {characters.map((char) => (
            <div key={char.char_id}>
              <div className="flex flex-row items-center gap-20">
                <h1 onClick={() => {
                  onOpen();
                  setSelectedCharacter(char);
                }}>{char.name} </h1>

                <Chip color="success" size="sm" variant="flat">
                  Active
                </Chip>
              </div>


              <br />

              {selectedCharacter && selectedCharacter.char_id === char.char_id && (
                <Modal
                  size="5xl"
                  backdrop="blur"
                  isOpen={isOpen}
                  onClose={() => {
                    onClose();
                    setSelectedCharacter(null);
                  }}
                  className="font"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          <h1 style={{ fontSize: "30px" }}>{selectedCharacter.name}</h1>
                        </ModalHeader>
                        <ModalBody>
                          <div className=" p-3">
                            <p>
                              <strong>Class: {selectedChardata?.class.name} </strong>
                            </p>
                            <p>
                              <strong>Race: {selectedChardata?.race.name}</strong>
                            </p>
                            <p>
                              <strong>Status: </strong>
                            </p>
                            <p>
                              <strong>Skills: </strong>
                            </p>
                            <p>
                              <strong>Features: </strong>
                            </p>
                            <p>
                              <strong>Spells: </strong>
                            </p>
                            <p>
                              <strong>Traits: </strong>
                            </p>
                            <p>
                              <strong>Backstory: </strong>
                            </p>
                          </div>
                          <br />
                          <p className=" text-center">
                            <Button
                              color="warning"
                              variant="flat"
                              onClick={() => setinvenOpen(true)}
                            >
                              OPEN INVENTORY
                            </Button>
                          </p>
                          <Modal
                            closeButton
                            isOpen={isinvenOpen}
                            onClose={() => setinvenOpen(false)}
                          >
                            <ModalContent>
                              <ModalHeader className="flex flex-col gap-1">
                                YOUR ITEMS
                              </ModalHeader>
                              <ModalBody>items</ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onPress={() => setinvenOpen(false)}
                                >
                                  Close
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>

                          <p className=" text-center">
                            <Button
                              color="danger"
                              variant="flat"
                              onClick={() => setdeleteOpen(true)}
                            >
                              DELETE CHARACTER
                            </Button>
                          </p>
                          <Modal
                            closeButton
                            isOpen={isdeleteOpen}
                            onClose={() => setdeleteOpen(false)}
                          >
                            <ModalContent>
                              <ModalHeader className="flex flex-col gap-1">
                                ARE YOU SURE TO DELETE YOUR CHARACTER ?
                              </ModalHeader>
                              <ModalBody>
                                <Button color="success" variant="light">
                                  YES
                                </Button>
                                <Button
                                  color="danger"
                                  variant="light"
                                  onPress={() => setdeleteOpen(false)}
                                >
                                  NO
                                </Button>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onPress={() => setdeleteOpen(false)}
                                >
                                  Close
                                </Button>
                              </ModalFooter>

                            </ModalContent>
                          </Modal>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" onPress={onClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              )}
            </div>
          ))}
        </div>

        <div className=" text-center mt-16">
          <Link href="createcharacter">
            <Button size="lg" radius="md" color="success" variant="solid">
              Create Character
            </Button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
