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
  Chip, Accordion,
  AccordionItem,
  ScrollShadow
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import { Char } from "../api/userData/route";
import { CharData } from "../api/charData/route";
import { data } from "autoprefixer";
import { features } from "process";


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

  async function getCharData(char_id: string | number) {

    try {
      const response = await fetch("/api/charData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ char_id: String(char_id) })
      });

      const data = await response.json();
      setSelectedChardata(data);

    } catch (error) {
      console.error("Failed to fetch charData:", error);
    }
  }

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

  async function deleteCharacter(char_id: number) {
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
      className={`${profileStyle.box} container flex flex-col justify-center mx-auto `}

    >

      <div className={`${profileStyle.box2} container flex flex-col items-stretch justify-center mx-auto my-10 `}>
        <br />

        <br />
        <br />
        <div className="font " >
          <p className="text-6xl text-center" style={{ fontStyle: "italic" }}>Characters</p>
          <div className={profileStyle.line}></div>

          <div className=" ml-10 mt-5 text-center pr-32" style={{ fontStyle: "italic" }}>
            <h5>YOUR CHARACTER LIST</h5>
          </div>
          <br />
          <br />
          <br />
          <div className=" text-center" style={{ fontSize: "30px" }}>
            {characters.map((char) => (
              <div key={char.char_id}>
                <div className={profileStyle.underline} >
                  <h1 onClick={() => {
                    setSelectedCharacter(char);
                    getCharData(char.char_id);
                    onOpen();
                  }}>{char.name} </h1>
                </div>
                <br />
                {selectedCharacter && selectedCharacter.char_id === char.char_id && (
                  <Modal
                    size="5xl"
                    backdrop="blur"
                    scrollBehavior='inside'
                    isOpen={isOpen}
                    onClose={() => {
                      onClose();
                      setSelectedCharacter(null);
                      getCharData(char.char_id);
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
                            <div className=" p-5">
                              <p>
                                <strong>Class: {selectedChardata?.class.name}</strong>
                              </p>
                              <p>
                                <strong>Race: {selectedChardata?.race.name}</strong>
                              </p>

                              <Accordion isCompact variant="shadow">
                                <AccordionItem key="1" aria-label="Status" title="STATUS">
                                  <div className="pl-10">
                                    cha: {selectedChardata?.status.cha}
                                    <br />
                                    con: {selectedChardata?.status.con}
                                    <br />
                                    dex: {selectedChardata?.status.dex}
                                    <br />
                                    wis: {selectedChardata?.status.wis}
                                    <br />
                                    int: {selectedChardata?.status.int}
                                    <br />
                                    str: {selectedChardata?.status.str}
                                    <br />
                                    cha: {selectedChardata?.status.cha}
                                    <br />
                                    hp: {selectedChardata?.status.hp}
                                    <br />
                                    gold: {selectedChardata?.status.gold}

                                  </div>
                                </AccordionItem>
                              </Accordion>
                              <div className="pt-5">
                                <Accordion isCompact variant="shadow">
                                  <AccordionItem key="2" aria-label="skills" title="SKILLS">
                                    <div className="pl-10">
                                      {selectedChardata?.skills.map((skill, index) => (
                                        <div key={index}>
                                          <strong>{skill.name}:</strong> {skill.details}
                                          <br />
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                              <div className="pt-5">
                                <Accordion isCompact variant="shadow">
                                  <AccordionItem key="3" aria-label="features" title="FEATURES">
                                    {selectedChardata?.class.features.map((feature, index) => (
                                      <div className="pt-5" key={index}>
                                        <Accordion isCompact variant="shadow">
                                          <AccordionItem key="4" aria-label="features" title={feature.name}>
                                            <p className="pl-10">{feature.details}</p>
                                          </AccordionItem>
                                        </Accordion>
                                        <br />
                                      </div>
                                    ))}

                                  </AccordionItem>
                                </Accordion>
                              </div>
                              <div className="pt-5">
                                <Accordion isCompact variant="shadow">
                                  <AccordionItem key="5" aria-label="spells" title="SPELLS">
                                    {selectedChardata?.class.spell.map((spell, index) => (
                                      <div className="pt-5" key={index}>
                                        <Accordion isCompact variant="shadow">
                                          <AccordionItem key="5" aria-label="spells" title={spell.name}>
                                            <p className="pl-10">
                                              Interval: {spell.interval_time}
                                              <br />
                                              Duration: {spell.duration}
                                              <br />
                                              Range: {spell.range}
                                              <br />
                                              Details: {spell.details}
                                              <br />
                                              <br />
                                            </p>
                                          </AccordionItem>
                                        </Accordion>
                                      </div>
                                    ))}

                                  </AccordionItem>
                                </Accordion>
                              </div>
                              <p>

                              </p>
                              <div className="pt-5">
                                <strong>Backstory: <br />
                                  <p className="pt-2 pl-24">
                                    {selectedChardata?.background}
                                  </p>
                                </strong>
                              </div>
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
                                <ModalBody>
                                  {selectedChardata?.items.map((item, index) => (
                                    <div key={index}>
                                      <strong>{item.name}:</strong> {item.details}
                                     
                                    </div>
                                  ))}
                                </ModalBody>
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
                                  <Button color="success" variant="light"
                                    onPress={() => {
                                      deleteCharacter(selectedCharacter.char_id);
                                      setdeleteOpen(false); // ปิด modal หลังจากลบตัวละครแล้ว
                                    }}
                                  >
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

          <div className=" text-center my-10">
            <Link href="createcharacter">
              <Button size="lg" radius="md" color="success" variant="solid">
                Create Character
              </Button>
            </Link>
          </div>

        </div>

      </div>

    </div>

  );

}
