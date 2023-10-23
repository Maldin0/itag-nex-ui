"use client"
import React, { useState, useEffect } from 'react';
import { RoomData } from '../../api/getRoom/route'
import {
  Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Textarea, Input, Button, Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter, useDisclosure, Accordion, AccordionItem
} from "@nextui-org/react";
import roomStyle from "./roomStyle.module.css";
import Dice from "../../../components/dice";
import Sent from "../../../components/Sent";

import { CharData } from "../../api/charData/route";
import { Char } from "../../api/userData/route";

type Props = {
  params: any;
}

export default function session({ params }: Props) {

  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [selectedChardata, setSelectedChardata] = useState<CharData | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  useEffect(() => {
    // Fetch RoomData from the API
    fetch('/api/getRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room_id: params.id })
    })
      .then(res => res.json())
      .then(data => {
        setRoomData(data);
      })
      .catch(err => {
        console.error("Failed to fetch room data:", err);
      });
  }, [params.id]);

  return (
    <>
      <div className=" flex flex-row gap-10 justify-center ">
        {roomData?.users.map((user, index) => (
          <>
            <Card className='w-[300px] h-auto justify-between' shadow="sm" key={index} isPressable onPress={() => {
              onOpen;
              console.log("char pressed");
              setSelectedUser(user);
              getCharData(user.char_id);
            }} >
              <CardBody onClick={onOpen} className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={user.name}
                  className="w-full object-cover h-full"
                  src={user.image}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{user.name}</b>
                <p className="text-default-500">{user.role === 'd' ? 'DM' : user.role === 'p' ? 'Player' : user.role}</p> {/* Displaying the role here, change as needed */}
              </CardFooter>
            </Card>
            <Modal
              size="5xl"
              backdrop="blur"
              scrollBehavior='inside'
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              onClose={() => {

                setSelectedChardata(null);
                getCharData(user.char_id);
              }}
              className="font"
              style={{ color: "white", fontSize: "20px" }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <h1 style={{ fontSize: "30px" }}>{selectedUser?.name}</h1>
                    </ModalHeader>
                    <ModalBody>
                      <div className=" p-5">
                        <p>
                          <strong>Class: {selectedChardata?.class.name}</strong>
                        </p>
                        <br />
                        <p>
                          <strong>Race: {selectedChardata?.race.name}</strong>
                        </p>
                        <br />

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
          </>
        ))}
      </div>
      <br /><br /><br /><br />

      <div className={roomStyle.box} style={{
        width: "100%",
        minHeight: "470px",
        textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column',
      }}>
        <br />
        <div style={{ alignSelf: 'flex-end' }}>
          <Button color='danger' variant='faded'>Clear chat</Button>
        </div>
        <br />
        <Textarea
          label={`Room ${params.id}`}
          placeholder="Chat World"
          size='lg'
          maxRows={7}
          readOnly
        />
        <div className='flex flex-row gap-5 items-center'>
          <Input
            label="Type somthing..."
            placeholder="Chat"
            size='lg'
            className='w-96'
          />
          <div>
            <Button size="md" color='warning' variant='shadow'><Sent /></Button>
          </div>
          <div>
            <Button size="md" color='default'><Dice /></Button>
          </div>
        </div>

      </div>
      <div className=' text-center'>ดีคับ</div>
    </>
  );
}